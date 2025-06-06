import api from "../../config/axiosConfig";

const approvePost = async (postId, adminDivRef) => {
  
  try {
    const response = await api.put(`/admin/approve-recipe/${postId}`, { id: postId });
    adminDivRef.classList.add("hidden");

    return {
      success: true,
      data: response.data,
    };

  } catch (error) {
    console.error("Error approving post:", error);

    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong.",
      error,
    };
  }
};

export default approvePost;
