import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  WrapperticketBox: {
    flex: 1,
    maxHeight: "70%",
    overflow: "scroll",
    backgroundColor: "#fff",
    margin: 10,
    height: "100%",
  },
  ticketBox: {
    backgroundColor: "#fff",
    borderRadius: 20, // Bo góc cho hộp
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Cho Android
    borderWidth: 1,
    borderColor: "#26c6da", // Màu viền
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  labelTolal: {
    fontSize: 16,
    fontWeight: "500",
  },
  sectionPay: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTime: {
    flexDirection: "row",
    textAlign: "center",
  },
  countdownText: {
    fontWeight: "700",
    color: "#D70000",
    paddingTop: 5,
    fontSize: 15,
  },
  containerTime: {
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  lableTime: { fontWeight: "500", paddingTop: 5, fontSize: 15 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  sectionTitlePay: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    flexWrap: "wrap",
    width: "30%",
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    // backgroundColor: "#000",
    alignItems: "center",
  },
  infoRow2: {
    marginBottom: 10,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
    textAlign: "right",
  },
  value: {
    fontSize: 15,
    color: "#000",
    flex: 1,
    flexWrap: "wrap",
    textAlign: "right",
    fontWeight: "600",
  },
  value2: {
    fontSize: 14,
    color: "#666",
    flex: 1,
    flexWrap: "wrap",
    textAlign: "right",
    fontWeight: "bold",
  },
  valueHighlight: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D70000", // Màu xanh dương nổi bật
    flex: 1,
    flexWrap: "wrap",
    textAlign: "right",
  },
  lableMaVe: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#D70000", // Màu xanh dương nổi bật
    flex: 1,
    flexWrap: "wrap",
    textAlign: "right",
  },
  seatContainer: {
    elevation: 3,
    flexDirection: "row",
    backgroundColor: "#00796b",
  },
  seatText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00796b", // Màu chữ ghế
    padding: 5,
    backgroundColor: "#0202",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  dashedLineContainer: {
    flexDirection: "row", // Để các phần (logo và đường nét đứt) nằm ngang
    alignItems: "center", // Căn giữa các phần theo chiều dọc
    justifyContent: "center", // Căn giữa theo chiều ngang
    marginVertical: 10, // Khoảng cách giữa các phần
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderStyle: "dashed",
    flex: 1, // Để đường nét đứt có thể kéo dài ra hết không gian
    marginHorizontal: 10, // Khoảng cách giữa logo và đường nét đứt
  },
  watermarkLogo: {
    width: 300, // Chiều rộng của logo
    height: 300, // Chiều cao của logo
    position: "absolute", // Để logo chèn vào giữa đường gạch đứt
    opacity: 0.2,
  },
  seatContainer2: { textAlign: "center" },
  numberSeat: {
    flexDirection: "row",
    textAlign: "right",
    marginLeft: "auto",
    flexWrap: "wrap",
  },
  selectedSeatText: {
    color: "#fff", // Màu chữ trắng
    fontWeight: "bold",
    fontSize: 14,
  },
  selectedSeatBox: {
    width: 30, // Kích thước ô vuông
    height: 30,
    backgroundColor: "#ff3b30", // Màu nền đỏ
    justifyContent: "center",
    alignItems: "center", // Căn giữa nội dung
    borderRadius: 5, // Bo góc nhẹ
  },
  picker: {
    height: 50,
    borderRadius: 10,
  },
  paymentButton: {
    marginTop: 20,
  },
  pickerContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9", // Màu nền cho dropdown
  },
  inputContainer: {
    marginBottom: 15,
  },
  dropdown: {
    marginLeft: 10,
    marginBottom: 16,
    height: 40,
    width: "65%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "500",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconImage: {
    width: 24, // Chiều rộng của hình ảnh
    height: 24, // Chiều cao của hình ảnh
    marginRight: 8,
  },
  selectedIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  viewtwo: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -20 }, // Hướng bóng đổ lên trên (hướng y = -5)
    shadowOpacity: 1, // Độ mờ của bóng
    shadowRadius: 50, // Kích thước bóng
  },
  buttonContainer: {
    alignItems: "center", // Canh giữa nút
    marginTop: 30,
    marginBottom: 40,
  },
  confirmButton: {
    backgroundColor: "#005C78", // Màu nút
    width: "80%",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // Màu chữ trên nút
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f7f7f7",
    color: "#666",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    backgroundColor: "#FFFF",
    color: "#666",
    paddingRight: 30, // Để dành chỗ cho mũi tên
    elevation: 3, // Cho Android
  },
};
