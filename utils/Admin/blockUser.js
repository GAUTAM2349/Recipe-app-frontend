import api from "../../config/axiosConfig";

const blockUser = async (userId, adminDivRef, fetchRecipeAgain) => {
  try {
    const response = await api.put(`/admin/block-user/${userId}`, { id: userId });

    adminDivRef.classList.add("hidden");
    await fetchRecipeAgain();
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error blocking user:", error);

    return {
      success: false,
      message: error?.response?.data?.message || "Failed to block user.",
      error,
    };
  }
};

export default blockUser;
