import axiosClient from "../../services/Api/axiosClient";

export const getTicket = async (id: string, token: string) => {
  try {
    const response = await axiosClient.get(`/tickets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token xác thực nếu cần
      },
    });
    return response.data; // Trả về thông tin vé
  } catch (error) {
    console.error("Error fetching ticket: ", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};
// Hàm cập nhật phương thức thanh toán cho vé
export const updatePaymentMethod = async (
  id: string,
  paymentMethod: string,
  token: string
) => {
  try {
    // Gửi yêu cầu POST để cập nhật phương thức thanh toán cho vé
    const response = await axiosClient.post(
      `tickets/payment/${id}`,
      { paymentMethod }, // Dữ liệu phương thức thanh toán
      {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token xác thực nếu cần
        },
      }
    );

    // Trả về dữ liệu phản hồi từ API (thông tin vé đã được cập nhật)
    return response.data;
  } catch (error) {
    // Log lỗi nếu có sự cố
    console.error("Error updating payment method: ", error);

    // Ném lỗi để có thể xử lý ở nơi gọi hàm
    throw error;
  }
};
