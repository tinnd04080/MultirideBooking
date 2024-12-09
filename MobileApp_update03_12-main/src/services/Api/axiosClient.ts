import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Định nghĩa URL API gốc
const axiosClient = axios.create({
  baseURL: "http://10.0.2.2:8080/api/", // Thay bằng URL API của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
