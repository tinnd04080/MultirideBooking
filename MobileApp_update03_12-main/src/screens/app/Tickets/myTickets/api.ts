import axiosClient from "../../../../services/Api/axiosClient";

// Hàm lấy danh sách vé
export const getTickets = async (page = 1, limit = 10) => {
  try {
    const response = await axiosClient.get("tickets/me", {
      params: { page, limit },
    });
    return response.data; // Dữ liệu trả về từ API
  } catch (error: any) {
    console.error("Error fetching tickets:", error.message);
    throw error;
  }
};
