
import { useContext, useEffect, useState } from "react";
import RecipeReviewForm from "./RecipeReviewForm";
import RecipeReviewsList from "./RecipeReviewsList";
import api from "../../../config/axiosConfig";
import { AuthContext } from "../../../utils/AuthProvider";
import { useNavigate } from "react-router-dom";

const RecipeReviewSection = ({ recipe,recipeId }) => {
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [error, setError] = useState("");
  const [toggleCreateAndEditReview, setToggleCreateAndEditReview] = useState(true); // default-create 
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const fetchReviews = async () => {
    try {
      const res = await api.get(`/review/recipe/${recipeId}`);
      setReviews(res?.data);

      const myId = localStorage?.getItem("userId");
      const ownReview = res?.data?.find((r) => r?.User?.id == myId);
      setUserReview(ownReview || null);

      setError("");
    } catch (err) {
      console?.error("Failed to fetch reviews", err);
      setError("Failed to fetch reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [recipeId]);

  useEffect(() => {
    reviews?.map((review) => {
      if (review?.user?.id == user?.id) setToggleCreateAndEditReview(false);
    });
  }, [reviews]);

  const handleReviewSubmit = async ({ rating, comment }) => {
    try {
      setError("");
      if (!user) return navigate('/login');
      if (userReview) {
        await api?.put(`/review/${userReview?.id}`, { rating, comment });
      } else {
        await api?.post("/review", {
          recipeId,
          rating,
          comment,
        });
      }
      setToggleCreateAndEditReview(false);
      fetchReviews();
    } catch (err) {
      console?.error("Failed to submit review", err);
      const msg = err?.response?.data?.message || "Something went wrong";
      setError(msg);
    }
  };

  return (
    <div className="my-10 bg-white h-[100%]">
      {error && <div className="text-red-500 mb-2">{error}</div>}

      { user?.id != recipe.user_id &&
        <RecipeReviewForm
        onSubmit={handleReviewSubmit}
        initialRating={userReview?.rating}
        initialComment={userReview?.comment}
        isEditing={!!userReview}
        toggleCreateAndEditReview={toggleCreateAndEditReview}
      />

      }
      <RecipeReviewsList
        reviews={reviews}
        setToggleCreateAndEditReview={setToggleCreateAndEditReview}
        setUserReview={setUserReview}
      />
    </div>
  );
};

export default RecipeReviewSection;
