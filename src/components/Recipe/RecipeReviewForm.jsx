import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const RecipeReviewForm = ({toggleCreateAndEditReview, onSubmit, initialRating = 0, initialComment = "", isEditing = false }) => {
  const [rating, setRating] = useState(initialRating);
  const [hovered, setHovered] = useState(null);
  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    setRating(initialRating);
    setComment(initialComment);
  }, [initialRating, initialComment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;
    onSubmit({ rating, comment });
  };

  return (
  <>
    {toggleCreateAndEditReview && (
      <form
        onSubmit={handleSubmit}
        className="max-w-[100%] mx-auto bg-white shadow p-6 rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Your Review" : "Leave a Review"}
        </h2>

        <div className="flex items-center space-x-2 mb-4">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHovered(starValue)}
                onMouseLeave={() => setHovered(null)}
                className="focus:outline-none"
              >
                <FaStar
                  size={24}
                  className={
                    starValue <= (hovered || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              </button>
            );
          })}
        </div>

        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
          rows="4"
          placeholder="Write your feedback here..."
          value={comment}
          required
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition"
        >
          {isEditing ? "Update Review" : "Submit Review"}
        </button>
      </form>
    )}
  </>
);
};

export default RecipeReviewForm;
