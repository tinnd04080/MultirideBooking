import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  dateDisplayContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0, 92, 120, 0.9)",
    borderBottomLeftRadius: 40, // Sử dụng giá trị lớn để bo tròn toàn bộ
    borderBottomRightRadius: 40,
    overflow: "hidden", // Đảm bảo phần tử con không tràn khỏi góc bo
    elevation: 3,
  },
  currentDateText: {
    fontSize: 15,
    color: "#FFF7D1",
    marginBottom: 8,
    fontWeight: "500",
  },
  routeDisplayText: {
    fontSize: 18,
    marginTop: 8,
    color: "#FFF7D1",
    fontWeight: "800",
    alignItems: "center",
  },
  customButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  customButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalSeats: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  ticketContainer: {
    padding: 10,
  },
  ticket: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  foTop: {
    alignItems: "flex-start",
  },
  leftPart: {
    width: "20%", // Phần chiếm 2/10 chiều ngang
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
  verticalLine: {
    width: 1,
    height: 30, // Độ dài của đường thẳng
    backgroundColor: "#4CAF50",
    marginVertical: 5,
  },
  locationIcon: {
    marginTop: 5,
  },
  rightPart: {
    width: "80%", // Phần chiếm 8/10 chiều ngang
    justifyContent: "center",
  },
  circleIcon: {
    marginLeft: 5, // Khoảng cách giữa thông tin thời gian và icon chấm tròn
  },
  divider: {
    height: 1,
    backgroundColor: "#000", // Đường kẻ đen
    marginVertical: 10,
  },
  ticketInfoBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seatContainer: {
    flex: 1,
    justifyContent: "center",
  },
  priceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  availableSeats: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  availableSeatsb: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  ticketPriceTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  ticketPriceNumber: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "800",
    color: "#D70000",
  },
  selectTripButton: {
    backgroundColor: "#005C78",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  selectTripButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ticketType: {
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
    marginTop: 10, // Khoảng cách trên giữa các phần tử văn bản
  },
  timeContainer: {
    flexDirection: "column", // Sắp xếp các phần tử theo chiều dọc
    justifyContent: "space-between", // Khoảng cách giữa hai khối
  },
  ticketInfoTop: {
    flexDirection: "row", // Chia ra 2 cột
    alignItems: "flex-start", // Căn chỉnh các phần tử theo chiều dọc
  },
  iconColumn: {
    flexDirection: "column", // Chia thành các hàng dọc
    alignItems: "center", // Căn giữa các phần tử theo chiều ngang
    justifyContent: "space-between", // Khoảng cách đều giữa các phần tử trong cột
    marginRight: 10, // Khoảng cách giữa cột 1 và cột 2
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
  },
  dividerTop: {
    width: 0, // Không cần chiều rộng cho đường kẻ (sử dụng border)
    height: 40, // Chiều cao của đường kẻ
    borderLeftWidth: 1, // Độ dày của đường kẻ dọc
    borderLeftColor: "black", // Màu sắc đường kẻ
    borderStyle: "dashed",
  },
  timeColumn: {
    flexDirection: "column", // Chia thành các hàng dọc cho thông tin thời gian
    justifyContent: "space-between", // Khoảng cách đều giữa các hàng
    flex: 1, // Chiếm không gian còn lại
  },
  ticketInfo1: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
    height: 40,
    marginBottom: 20,
  },
  ticketInfo: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
    height: 40,
  },
  emptySpace: {
    flex: 1, // Tạo khoảng trống giữa hai phần tử thời gian
  },
  District: { fontSize: 17, color: "#000", fontWeight: "600" },
});
