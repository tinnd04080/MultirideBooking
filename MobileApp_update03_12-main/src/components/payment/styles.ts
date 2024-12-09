import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  viewtwo: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -20 }, // Hướng bóng đổ lên trên (hướng y = -5)
    shadowOpacity: 1, // Độ mờ của bóng
    shadowRadius: 50, // Kích thước bóng
  },
  containerTime: {
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  sectionTime: {
    flexDirection: "row",
    textAlign: "center",
  },
  lableTime: { fontWeight: "500", paddingTop: 5, fontSize: 15 },
  countdownText: {
    fontWeight: "700",
    color: "#D70000",
    paddingTop: 5,
    fontSize: 15,
  },
  sectionPay: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitlePay: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    flexWrap: "wrap",
    width: "30%",
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
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: "500",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
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
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconImage: {
    width: 24, // Chiều rộng của hình ảnh
    height: 24, // Chiều cao của hình ảnh
    marginRight: 8,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
