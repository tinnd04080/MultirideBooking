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
