export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${hours}:${minutes} - ${day}/${month}/${year}`;
};
export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ hiện tại
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút hiện tại
  const day = date.getDate().toString().padStart(2, "0"); // Ngày hiện tại
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng hiện tại
  const year = date.getFullYear(); // Năm hiện tại
  return `${hours}:${minutes}`; // Trả về ngày giờ đầy đủ
};
export const formatLicensePlate = (licensePlate: string) => {
  // Biểu thức chính quy để chia biển số thành các phần
  const regex = /^(\d{2})([a-zA-Z])(\d{3})(\d{2})$/;
  const regexFourDigit = /^(\d{2})([a-zA-Z])(\d{4})$/; // Đối với biển số có 4 chữ số

  const match = licensePlate.match(regex);
  const matchFourDigit = licensePlate.match(regexFourDigit);

  if (match) {
    // Định dạng cho trường hợp biển số có 3 chữ số sau
    return `${match[1]}${match[2].toUpperCase()}-${match[3]}.${match[4]}`;
  } else if (matchFourDigit) {
    // Định dạng cho trường hợp biển số có 4 chữ số sau
    return `${matchFourDigit[1]}${matchFourDigit[2].toUpperCase()}-${
      matchFourDigit[3]
    }`;
  }

  // Nếu không khớp với bất kỳ định dạng nào, trả về biển số gốc
  return licensePlate;
};
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const formatTimeDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${hours}:${minutes} - ${day}/${month}/${year}`;
};

/* Định dạng giao diện cho màn CHI TIẾT VÉ */
export const getStatusColor = (status: string) => {
  switch (status) {
    case "PAID":
      return "#00796b"; // Màu xanh dương cho đã thanh toán
    case "PENDING":
      return "#FFB200"; // Màu cam cho chưa thanh toán
    case "PAYMENTPENDING":
      return "#EB5B00"; // Màu cam cho chưa thanh toán
    case "CANCELED":
      return "#d32f2f"; // Màu đỏ cho bị hủy
    case "PAYMENT_FAILED":
      return "#f44336"; // Màu đỏ cho thất bại thanh toán
    default:
      return "#000000"; // Màu đen mặc định
  }
};
export const getStatusText = (status: string) => {
  switch (status) {
    case "PENDING":
      return "CHƯA XÁC NHẬN THANH TOÁN";
    case "PAID":
      return "ĐÃ THANH TOÁN";
    case "PAYMENTPENDING":
      return "CHỜ THANH TOÁN";
    case "CANCELED":
      return "VÉ BỊ HỦY";
    case "PAYMENT_FAILED":
      return "THANH TOÁN THẤT BẠI";
    default:
      return "Tình trạng không xác định";
  }
};
export const getpaymentMethodText = (paymentMethod: string) => {
  switch (paymentMethod) {
    case "OFFLINEPAYMENT":
      return "TẠI BẾN - XE";
    case "ZALOPAY":
      return "ZALO PAY";
    default:
      return "Tình trạng không xác định";
  }
};

export const getStatusTextTicket = (status: string) => {
  switch (status) {
    case "PAID":
      return "Đã Thanh Toán";
    case "PAYMENTPENDING":
      return "Chờ Thanh Toán";
    case "CANCELED":
      return "Bị Hủy";
    case "PENDING":
      return "Chưa xác nhận";
    default:
      return "Vé Lỗi";
  }
};
