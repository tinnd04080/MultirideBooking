import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F6FC",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C3E50",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#7F8C8D",
  },
  email: {
    fontWeight: "bold",
    color: "#2980B9",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  input: {
    width: 50,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderColor: "#2980B9",
    borderWidth: 2,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#2C3E50",
    marginHorizontal: 5,
    shadowColor: "#BDC3C7",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  verifyButton: {
    backgroundColor: "#2980B9",
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  resendContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
    color: "#7F8C8D",
    marginBottom: 10,
  },
  resendButton: {
    backgroundColor: "#3498DB",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
