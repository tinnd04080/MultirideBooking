import { StyleSheet } from "react-native";

const buttonColor = "#E88D67";
const backgroundColor = "#fff";
const textColor = "#005C78";
const inputBackgroundColor = "#f0f0f0";
const borderColor = "#ccc";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: backgroundColor,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: textColor,
    marginBottom: 25,
  },
  /* label: {
    fontSize: 16,
    color: textColor,
    marginBottom: 6,
    marginTop: 10,
  }, */
  /*  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: inputBackgroundColor,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderColor: borderColor,
    borderWidth: 1,
  }, */
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: buttonColor,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: "#007BFF",
    textAlign: "center",
    fontSize: 14,
  },
  logo: {
    width: 400, // Kích thước của logo
    height: 250, // Kích thước của logo
    resizeMode: "contain", // Đảm bảo logo không bị méo
  },
  logoContainer: {
    alignItems: "center", // Căn giữa logo
    /* backgroundColor: "#000", */
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: inputBackgroundColor,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: borderColor,
    borderWidth: 1,
    height: 50, // Đảm bảo chiều cao cố định cho ô mật khẩu
  },
  input: {
    backgroundColor: inputBackgroundColor,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: borderColor,
    borderWidth: 1,
    height: 50, // Đảm bảo chiều cao tương đồng với ô mật khẩu
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  toggleText: {
    color: "#007BFF",
    fontSize: 16,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    color: textColor,
    marginBottom: 6,
    marginTop: 10,
  },
});
