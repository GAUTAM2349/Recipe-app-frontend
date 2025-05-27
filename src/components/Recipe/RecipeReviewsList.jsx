import  { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../../utils/AuthProvider";
import api from "../../../config/axiosConfig";



const RecipeReviewsList = ({ reviews , setToggleCreateAndEditReview, setUserReview}) => {
  if (!reviews?.length) return <p className="text-gray-500">No reviews yet.</p>;
  const [deleteReview, setDeleteReview] = useState(false);

  const {user} = useContext(AuthContext);

  return (
    <>
    { !deleteReview &&
        <div className="space-y-6 mt-6">
      {reviews.map((review) => (
        <div key={review.id} className="p-4 bg-white shadow rounded-lg">
          <div className="flex items-center mb-2">
            <img
              src={review.User?.profile_picture || "/default-avatar.png"}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <p className="font-semibold">{review.User?.name}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={16}
                    className={
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
            {review.user_id == user.id && <span className="ml-1.5 mr-2 cursor-pointer" onClick={()=>setToggleCreateAndEditReview(true)}>edit</span>}
            <span className="cursor-pointer" onClick={()=>{
                api?.delete(`/review/${review.id}`); 
                setDeleteReview(true); 
                setToggleCreateAndEditReview(true);
                setUserReview(false);
                }} >delete</span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
    }
    </>
  );
};

export default RecipeReviewsList;
