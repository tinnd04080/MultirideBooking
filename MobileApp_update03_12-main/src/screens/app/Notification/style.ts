import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  notificationContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },
  notificationBox: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  successBox: {
    backgroundColor: "#e0f7e9", // Màu xanh nhạt cho thành công
    borderLeftWidth: 4,
    borderLeftColor: "#34c759", // Màu xanh thành công
  },
  failedBox: {
    backgroundColor: "#fde8e8", // Màu đỏ nhạt cho thất bại
    borderLeftWidth: 4,
    borderLeftColor: "#ff3b30", // Màu đỏ thất bại
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  successText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34c759", // Màu xanh cho trạng thái thành công
  },
  failedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff3b30", // Màu đỏ cho trạng thái thất bại
  },
  route: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  time: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  seats: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});
