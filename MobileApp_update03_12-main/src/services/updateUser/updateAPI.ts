import axiosClient from "../Api/axiosClient";

interface UpdateProfileRequest {
  userName: string;
  phoneNumber: string;
  fullName: string;
  cccd: string;
}

interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

const profileApi = {
  // Cập nhật thông tin người dùng
  updateProfile: async (data: UpdateProfileRequest): Promise<any> => {
    try {
      const response = await axiosClient.put("/profiles", data, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  // Thay đổi mật khẩu người dùng
  changePassword: async (data: ChangePasswordRequest): Promise<any> => {
    try {
      const response = await axiosClient.post(
        "/profile/change-password",
        data,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },
};

export default profileApi;
