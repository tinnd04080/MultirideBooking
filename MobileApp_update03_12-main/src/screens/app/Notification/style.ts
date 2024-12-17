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
    backgroundColor: "#e0f7e9", // Light green for success
    borderLeftWidth: 4,
    borderLeftColor: "#34c759", // Green for success
  },
  failedBox: {
    backgroundColor: "#fde8e8", // Light red for failure
    borderLeftWidth: 4,
    borderLeftColor: "#ff3b30", // Red for failure
  },
  pendingBox: {
    backgroundColor: "#fff3cd", // Light yellow for pending
    borderLeftWidth: 4,
    borderLeftColor: "#ffcc00", // Yellow for pending
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
    color: "#34c759", // Green for success status
  },
  failedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff3b30", // Red for failure status
  },
  pendingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffcc00", // Yellow for pending status
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff3b30", // Red for error
    textAlign: "center",
    margin: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
});
