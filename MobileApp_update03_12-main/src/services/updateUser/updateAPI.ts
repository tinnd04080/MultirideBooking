import axiosClient from "../Api/axiosClient";

interface UpdateProfileRequest {
  email: string;
  phoneNumber: string;
  fullName: string;
  cccd: string;
}

interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

const profileApi = {
  // Lấy thông tin người dùng
  getProfile: async (): Promise<any> => {
    try {
      const response = await axiosClient.get("users/profile", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  // Cập nhật thông tin người dùng
  updateProfile: async (data: UpdateProfileRequest): Promise<any> => {
    try {
      const response = await axiosClient.put("users/profile", data, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error updating profile:", error.message);
      throw error.response?.data || "Có lỗi khi cập nhật thông tin người dùng";
    }
  },

  // Thay đổi mật khẩu người dùng
  changePassword: async (data: ChangePasswordRequest): Promise<any> => {
    try {
      const response = await axiosClient.post(
        "users/profile/change-password",
        data,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error changing password:", error.message);
      throw error.response?.data || "Có lỗi khi thay đổi mật khẩu";
    }
  },
};

export default profileApi;
