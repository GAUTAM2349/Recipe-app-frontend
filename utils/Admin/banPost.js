import api from "../../config/axiosConfig";

const banPost = async (postId, adminDivRef) => {
  try {
    const response = await api.put(`/admin/ban-recipe/${postId}`, { id: postId });
    adminDivRef.classList.add("hidden");
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error banning post:", error);

    return {
      success: false,
      message: error?.response?.data?.message || "Failed to ban post.",
      error,
    };
  }
};

export default banPost;
