import axiosClient from "../Api/axiosClient";

export const getNotifications = async (page = 1, limit = 10) => {
  try {
    const response = await axiosClient.get("notifications/me", {
      params: { page, limit },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching notifications:", error.message);
    throw error;
  }
};
