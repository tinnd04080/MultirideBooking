import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFAEE", //f8f9fa
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#343a40",
  },
  ticketContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000", // Màu của bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng (theo chiều ngang và dọc)
    shadowOpacity: 0.25, // Độ mờ của bóng
    shadowRadius: 3.5, // Độ lan tỏa của bóng
    elevation: 4, // Độ cao của bóng trên Android
  },

  leftSection: {
    justifyContent: "center",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  time: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#005C78",
  },
  date: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  route: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
    marginTop: 10,
  },
  statusContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 4,
  },
  statusText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  pending: {
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  paid: {
    backgroundColor: "green",
    justifyContent: "center", // Căn giữa nội dung theo chiều dọc
    alignItems: "center", // Căn giữa nội dung theo chiều ngang
    padding: 5, // Thêm một chút padding để không bị dính vào viền
  },
  cancelled: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  default: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  code: {
    fontSize: 14,
    color: "#000",
    fontWeight: "700",
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#005C78",
  },
  noTicketsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  noTicketsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20, // Để tạo khoảng cách với button
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: "#005C78",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20, // Khoảng cách giữa mô tả và nút
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Chiều rộng của dropdown sẽ chiếm toàn bộ chiều rộng màn hình
    paddingHorizontal: 15, // Thêm khoảng cách lề trái phải
    marginVertical: 10, // Thêm khoảng cách giữa dropdown và các phần tử khác

    borderColor: "#ddd", // Màu viền nhẹ nhàng
  },
  picker: {
    height: 50, // Chiều cao của Picker
    color: "#333", // Màu chữ của các lựa chọn
    fontSize: 16, // Kích thước chữ
    borderRadius: 8, // Bo tròn các góc của picker
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: "500",
  },
  dropdown: {
    width: "40%", // Chiếm toàn bộ chiều rộng của màn hình
    height: 25, // Chiều cao của dropdown
    borderWidth: 1, // Đường viền của dropdown
    borderColor: "#ddd", // Màu viền
    borderRadius: 10, // Bo tròn các góc
    backgroundColor: "#f8f8f8", // Màu nền nhẹ nhàng
    paddingHorizontal: 15, // Khoảng cách thụt vào từ trái và phải
    marginVertical: 10, // Khoảng cách giữa dropdown và các phần tử khác
    justifyContent: "center", // Căn giữa nội dung
    /* shadowColor: "#000", // Màu bóng của shadow
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng */
    /*  shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 4, // Bán kính bóng
    elevation: 5, // Tạo bóng hiệu ứng cho Android */
    marginLeft: 15,
  },
  dropdownIcon: {
    width: 20,
    height: 20,
    tintColor: "#333", // Màu icon mũi tên
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: "#aaa", // Màu cho placeholder khi không có giá trị
  },
});
