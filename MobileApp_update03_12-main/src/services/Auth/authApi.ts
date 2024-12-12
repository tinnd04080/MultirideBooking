// {api clients chứa các hàm giúp tương tác với API }
import axiosClient from "../Api/axiosClient";

const authApi = {
  signIn: (data: { email: string; password: string }) => {
    return axiosClient.post("auth/login", data);
  },
  signUp: (data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    cccd: string;
    password: string;
  }) => {
    return axiosClient.post("auth/register", data);
  },
  verifyOtp: (data: { email: string; otp: string }) => {
    return axiosClient.post("/auth/verify-otp", data);
  },
  sendOtp: (email: string) => {
    return axiosClient.post("/auth/send-otp", { email });
  },
};

export default authApi;
