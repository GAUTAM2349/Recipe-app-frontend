// import { useEffect, useState } from "react";
// import RecipeReviewForm from "./RecipeReviewForm";
// import RecipeReviewsList from "./RecipeReviewsList";
// import api from "../../../config/axiosConfig";

// const RecipeReviewSection = ({ recipeId }) => {
//   const [reviews, setReviews] = useState([]);

//   const fetchReviews = async () => {
//     try {
//       const res = await api.get(`/review/recipe/${recipeId}`);
//       setReviews(res.data);
//       console.log("Fetched recipe reviews", res.data);
//     } catch (err) {
//       console.error("Failed to fetch reviews", err);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [recipeId]);

//   const handleReviewSubmit = async ({ rating, comment }) => {
//     try {
//       await api.post("/review", {
//         recipeId,
//         rating,
//         comment,
//       });
//       fetchReviews(); // refresh reviews after submitting
//     } catch (err) {
//       console.error("Failed to submit review", err);
//     }
//   };

//   return (
//     <div className="my-10">
//       <RecipeReviewForm onSubmit={handleReviewSubmit} />
//       <RecipeReviewsList reviews={reviews} />
//     </div>
//   );
// };

// export default RecipeReviewSection;

import { useContext, useEffect, useState } from "react";
import RecipeReviewForm from "./RecipeReviewForm";
import RecipeReviewsList from "./RecipeReviewsList";
import api from "../../../config/axiosConfig";
import { AuthContext } from "../../../utils/AuthProvider";
import { useNavigate } from "react-router-dom";

const RecipeReviewSection = ({ recipeId }) => {
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [error, setError] = useState("");
  const [toggleCreateAndEditReview, setToggleCreateAndEditReview] = useState(true); // default-create 
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  
  const fetchReviews = async () => {
    try {
      const res = await api.get(`/review/recipe/${recipeId}`);
      setReviews(res.data);

      // Find user's own review (assuming backend sends User.id)
      const myId = localStorage.getItem("userId"); // or wherever you're storing the logged-in user ID
      const ownReview = res.data.find((r) => r.User?.id == myId);
      setUserReview(ownReview || null);

      setError("");
    } catch (err) {
      console.error("Failed to fetch reviews", err);
      setError("Failed to fetch reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [recipeId]);

  useEffect(()=>{

    reviews.map((review)=>{
        if(review?.user?.id == user?.id) setToggleCreateAndEditReview(false);
    });
    
  }, [reviews]);

  const handleReviewSubmit = async ({ rating, comment }) => {
    try {
      setError("");
      if(!user) return navigate('/login');
      if (userReview) {
        // Edit review
        await api.put(`/review/${userReview.id}`, { rating, comment });
      } else {
        // Create new review
        await api.post("/review", {
          recipeId,
          rating,
          comment,
        });
      }
      setToggleCreateAndEditReview(false);
      fetchReviews(); // Refresh after update/create
    } catch (err) {
      console.error("Failed to submit review", err);
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
    }
  };

  return (
    <div className="my-10 bg-white">
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <RecipeReviewForm
        onSubmit={handleReviewSubmit}
        initialRating={userReview?.rating}
        initialComment={userReview?.comment}
        isEditing={!!userReview}
        toggleCreateAndEditReview={toggleCreateAndEditReview}
      />

      <RecipeReviewsList
        reviews={reviews}
        setToggleCreateAndEditReview={setToggleCreateAndEditReview}
        setUserReview = {setUserReview}
     />
    </div>
  );
};

export default RecipeReviewSection;
