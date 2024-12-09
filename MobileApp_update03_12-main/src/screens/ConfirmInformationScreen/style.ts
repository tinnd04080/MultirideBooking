import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  inputSection: {
    margin: 20,
    flex: 6,
    justifyContent: "space-evenly",
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  /* inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, // Giảm khoảng cách giữa các ô nhập
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    height: 45, // Giữ chiều cao cố định cho ô nhập
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  }, */
  icon: {
    marginRight: 10,
  },
  inputError: {
    borderColor: "red", // Đổi màu viền khi có lỗi
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10, // Để thông báo lỗi cách đều với viền ô nhập
  },
  discountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  discountInputWrapper: {
    flexDirection: "row",
    flex: 7,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  discountInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
    paddingLeft: 10,
    borderWidth: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  discountButton: {
    flex: 3,
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginLeft: 10,
  },
  discountButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectedSeats: {
    fontSize: 18,
    marginVertical: 10,
    color: "#666",
  },
  details: {
    fontSize: 16,
    marginVertical: 10,
    color: "#999",
  },
  confirmSection: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: "#32CD32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    flex: 1, // Để nội dung có thể mở rộng toàn bộ không gian
    flexWrap: "wrap", // Cho phép văn bản xuống dòng nếu cần thiết
    maxWidth: "100%", // Đảm bảo chiều rộng không vượt quá
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoSection: {
    padding: 16,
    margin: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginTop: 10,
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 16,
  },
  detailText: {
    fontSize: 16,
    color: "#666",
    flex: 1,
    flexWrap: "wrap",
    textAlign: "right",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    textAlign: "right",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007BFF",
    textAlign: "right",
  },
  wrapText: {
    flexWrap: "wrap", // Cho phép xuống dòng khi văn bản quá dài
  },
  discountAppliedInput: {
    backgroundColor: "#f0f0f0", // Màu xám nhạt
    color: "#555", // Màu chữ tối
  },
  transferSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  nsferButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  transferInput: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  // Nút Trung chuyển - đón tận nơi
  transferButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10, // Giảm khoảng cách dưới nút
    width: "auto", // Cho phép nút tự điều chỉnh chiều rộng
    alignSelf: "flex-start", // Canh trái nút
  },

  // Các ô nhập địa chỉ
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Giảm khoảng cách giữa các ô nhập
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    height: 40, // Điều chỉnh chiều cao ô nhập cho nhỏ gọn
    fontSize: 14, // Font size nhỏ hơn để phù hợp với giao diện
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  inputField: {
    flex: 1,
    height: 40, // Giữ chiều cao ô nhập đồng nhất
    fontSize: 14,
    paddingLeft: 10,
    borderWidth: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  transferCheckboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Tạo khoảng cách giữa ô chọn và phần nhập
    marginLeft: 3,
    marginVertical: 10,
  },
  // Nút Trung chuyển - đón tận nơi

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  thumbStyle: {
    borderWidth: 2, // Độ dày đường viền
    borderColor: "#000", // Màu của đường viền
    borderRadius: 15, // Để bo tròn hình tròn
  },
  switchWrapper: {
    borderWidth: 2, // Đặt độ dày viền
    borderColor: "black", // Màu viền
    borderRadius: 30, // Hình tròn
    padding: 3, // Khoảng cách giữa viền và Switch
  },
  switchWrapperEnabled: {
    // Viền sẽ thay đổi khi bật Switch
    borderColor: "#005C78",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#D24545",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#86A789",
    borderColor: "#86A789",
  },
  transferButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "left",
    flex: 1,
  },
  linkText: {
    color: "#005C78",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "left",
    lineHeight: 22,
  },
  infoHeading: {
    fontWeight: "bold",
    color: "#005C78",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
  },
  modalContainerCH: {
    alignItems: "flex-start", // Căn chỉnh các phần tử con về phía trái
    justifyContent: "flex-start", // Đảm bảo tất cả các phần tử con căn chỉnh từ trên xuống dưới
    width: "90%",
  },
  modalMainTitle: {
    fontSize: 24, // Kích thước lớn hơn cho tiêu đề chính
    fontWeight: "bold",
    color: "#005C78",
    marginBottom: 20,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#005C78",
  },
  highlightText: {
    fontWeight: "bold",
    color: "#8B0000", // Màu đỏ trầm
  },
  hotlineContainer: {
    flexDirection: "row", // Đặt icon và số hotline nằm cùng dòng
    alignItems: "center",
    marginBottom: 10,
  },
  hotlineButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF4545", // Màu xanh nổi bật cho nút
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 5, // Tạo khoảng cách giữa text và button
  },
  hotlineText: {
    fontSize: 16,
    color: "#FEEE91", // Màu chữ trắng
    fontWeight: "bold",
    marginLeft: 8, // Tạo khoảng cách giữa icon và số điện thoại
  },
  seatList: {
    flexWrap: "wrap", // Cho phép danh sách ghế xuống dòng khi không đủ không gian
    flexDirection: "row", // Đảm bảo ghế được hiển thị trên cùng một dòng cho đến khi cần xuống dòng
  },
  seatContainer: {
    flex: 1, // Đảm bảo chiếm hết không gian còn lại
    flexWrap: "wrap", // Cho phép xuống dòng
    flexDirection: "row", // Hiển thị nội dung theo hàng
  },
  seatText: {
    fontSize: 16,
    lineHeight: 30, // Điều chỉnh khoảng cách dòng
    flex: 1, // Để chiếm hết không gian còn lại
    flexWrap: "wrap", // Cho phép nội dung xuống dòng
  },
  selectedSeatsGrid: {
    flexDirection: "row",
    flexWrap: "wrap", // Cho phép các ô ghế xuống dòng khi không đủ chỗ
    width: "100%", // Đảm bảo container chiếm hết chiều rộng của phần tử cha
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },

  selectedSeatsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#005C78",
    lineHeight: 32,
  },
  selectedSeatBox: {
    width: 30, // Kích thước ô vuông
    height: 30,
    backgroundColor: "#ff3b30", // Màu nền đỏ
    justifyContent: "center",
    alignItems: "center", // Căn giữa nội dung
    borderRadius: 5, // Bo góc nhẹ
  },
  selectedSeatText: {
    color: "#fff", // Màu chữ trắng
    fontWeight: "bold",
    fontSize: 14,
  },
  aaa: { justifyContent: "flex-end" },
});
