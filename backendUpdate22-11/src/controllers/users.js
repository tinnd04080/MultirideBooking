import { PAGINATION } from "../constants/index.js";
import Permission from "../models/permissions.js";
import User from "../models/users.js";
import bcrypt from "bcrypt";
import { ROLE } from "../constants/index.js";
import { USER_STATUS } from "../constants/index.js";
import Tickets from "../models/tickets.js";
import mongoose from "mongoose";
const UserController = {
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId).exec();

      const permission = await Permission.findOne({ user: userId }).exec();

      res.json({
        ...user.toJSON(),
        role: permission.role,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { userName, phoneNumber, fullName, cccd } = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        {
          userName,
          phoneNumber,
          fullName,
          cccd,
        },
        { new: true }
      ).exec();

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  changeProfilePassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { password, newPassword } = req.body;

      const findUser = await User.findById(userId).exec();
      if (!findUser) {
        return res.status(404).json({
          message: "Không tìm thấy tài khoản!",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, findUser.password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Mật khẩu hiện tại không chính xác!" });
      }

      const isSameOldPassword = await bcrypt.compare(
        newPassword,
        findUser.password
      );
      if (isSameOldPassword) {
        return res
          .status(406)
          .json({ message: "Mật khẩu cũ không được trùng mật khẩu mới" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
      }).exec();

      res.json({
        message: "Đổi mật khẩu thành công",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getUsers: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;

      // Lấy danh sách người dùng
      const users = await User.find()
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

      // Lấy tổng số người dùng để tính tổng số trang
      const count = await User.countDocuments();
      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      // Lấy danh sách quyền tương ứng với userIds
      const userIds = users.map((user) => user._id);
      const permissions = await Permission.find({
        user: { $in: userIds },
      }).exec();

      // Tạo một map để ánh xạ userId với role
      const permissionMap = permissions.reduce((acc, permission) => {
        acc[permission.user] = permission.role;
        return acc;
      }, {});

      // Gắn thông tin role vào danh sách người dùng
      const usersWithRoles = users.map((user) => ({
        ...user.toJSON(),
        role: permissionMap[user._id] || null, // Nếu không tìm thấy role thì để null
      }));

      res.json({
        data: usersWithRoles,
        totalPage,
        currentPage,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  /* updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { userName, phoneNumber, fullName, cccd } = req.body;

      const user = await User.findByIdAndUpdate(
        id,
        {
          userName,
          phoneNumber,
          fullName,
          cccd,
        },
        { new: true }
      );

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */
  /* updateUser 02/12 */
  /* updateUser: async (req, res) => {
    try {
      const { id } = req.params; // Lấy ID người dùng từ params
      const { userName, phoneNumber, fullName, cccd, role } = req.body; // Lấy dữ liệu từ body

      // Kiểm tra vai trò hợp lệ
      const validRoles = Object.values(ROLE); // ["ADMIN", "STAFF", "CUSTOMER"]
      const userRole = validRoles.includes(role) ? role : null;

      // Cập nhật thông tin người dùng
      const user = await User.findByIdAndUpdate(
        id,
        { userName, phoneNumber, fullName, cccd },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      // Nếu có role và hợp lệ, cập nhật bảng Permission
      if (userRole) {
        const permission = await Permission.findOneAndUpdate(
          { user: id },
          { role: userRole },
          { new: true }
        );

        if (!permission) {
          return res
            .status(404)
            .json({ message: "Không tìm thấy quyền người dùng" });
        }
      }

      res.json({
        message: "Cập nhật người dùng thành công",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
 */
  /* updateUser 02/12 finish*/
  /* updateUser: async (req, res) => {
    try {
      const { id } = req.params; // Lấy ID người dùng từ params
      const { userName, phoneNumber, fullName, cccd, role, status } = req.body; // Lấy dữ liệu từ body

      // Kiểm tra vai trò hợp lệ
      const validRoles = Object.values(ROLE); // ["ADMIN", "STAFF", "CUSTOMER"]
      const userRole = validRoles.includes(role) ? role : null;

      // Xác định trạng thái, nếu không có, mặc định là 'ACTIVE'
      const userStatus =
        status && Object.values(USER_STATUS).includes(status)
          ? status
          : USER_STATUS.ACTIVE;

      // Cập nhật thông tin người dùng
      const user = await User.findByIdAndUpdate(
        id,
        { userName, phoneNumber, fullName, cccd, status: userStatus }, // Cập nhật trạng thái
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      // Nếu có role và hợp lệ, cập nhật bảng Permission
      if (userRole) {
        const permission = await Permission.findOneAndUpdate(
          { user: id },
          { role: userRole },
          { new: true }
        );

        if (!permission) {
          return res
            .status(404)
            .json({ message: "Không tìm thấy quyền người dùng" });
        }
      }

      res.json({
        message: "Cập nhật người dùng thành công",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */
  /* updateUser: async (req, res) => {
    try {
      const { id } = req.params; // Lấy ID người dùng từ params
      const { userName, phoneNumber, fullName, cccd, role, status } = req.body; // Lấy dữ liệu từ body

      // Lấy thông tin người dùng hiện tại từ cơ sở dữ liệu
      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      // Kiểm tra nếu có thay đổi phoneNumber, kiểm tra trùng với các item trong cơ sở dữ liệu
      if (phoneNumber && phoneNumber !== user.phoneNumber) {
        const existingUserWithPhoneNumber = await User.findOne({ phoneNumber });
        if (existingUserWithPhoneNumber) {
          return res
            .status(400)
            .json({ message: "Số điện thoại đã được đăng ký" });
        }
      }

      // Kiểm tra vai trò hợp lệ
      const validRoles = Object.values(ROLE); // ["ADMIN", "STAFF", "CUSTOMER"]
      const userRole = validRoles.includes(role) ? role : null;

      // Xác định trạng thái, nếu không có, mặc định là 'ACTIVE'
      const userStatus =
        status && Object.values(USER_STATUS).includes(status)
          ? status
          : USER_STATUS.ACTIVE;

      // Cập nhật thông tin người dùng
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { userName, phoneNumber, fullName, cccd, status: userStatus }, // Cập nhật trạng thái
        { new: true }
      );

      // Nếu có role và hợp lệ, cập nhật bảng Permission
      if (userRole) {
        const permission = await Permission.findOneAndUpdate(
          { user: id },
          { role: userRole },
          { new: true }
        );

        if (!permission) {
          return res
            .status(404)
            .json({ message: "Không tìm thấy quyền người dùng" });
        }
      }

      res.json({
        message: "Cập nhật người dùng thành công",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */
  /* updateUser: async (req, res) => {
    try {
      const { id } = req.params; // Lấy ID người dùng từ params
      const { userName, phoneNumber, fullName, cccd, role, status } = req.body; // Lấy dữ liệu từ body

      // Lấy thông tin người dùng hiện tại từ cơ sở dữ liệu
      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      // Kiểm tra nếu có thay đổi phoneNumber, kiểm tra trùng với các item trong cơ sở dữ liệu
      if (phoneNumber && phoneNumber !== user.phoneNumber) {
        const existingUserWithPhoneNumber = await User.findOne({ phoneNumber });
        if (existingUserWithPhoneNumber) {
          return res
            .status(400)
            .json({ message: "Số điện thoại đã được đăng ký" });
        }
      }

      // Kiểm tra vai trò hợp lệ và đảm bảo người dùng không thể thay đổi vai trò của chính mình
      const validRoles = Object.values(ROLE); // ["ADMIN", "STAFF", "CUSTOMER"]
      let userRole = null;
      if (role && validRoles.includes(role)) {
        if (user._id.toString() === req.user.id) {
          // Nếu người dùng là chính họ, không cho phép thay đổi vai trò
          return res.status(400).json({
            message: "Bạn không thể thay đổi phân quyền của chính mình",
          });
        }
        userRole = role;
      }

      // Xác định trạng thái, nếu không có, mặc định là 'ACTIVE'
      const userStatus =
        status && Object.values(USER_STATUS).includes(status)
          ? status
          : USER_STATUS.ACTIVE;

      // Cập nhật thông tin người dùng
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { userName, phoneNumber, fullName, cccd, status: userStatus }, // Cập nhật trạng thái
        { new: true }
      );

      // Nếu có role và hợp lệ, cập nhật bảng Permission
      if (userRole) {
        const permission = await Permission.findOneAndUpdate(
          { user: id },
          { role: userRole },
          { new: true }
        );

        if (!permission) {
          return res
            .status(404)
            .json({ message: "Không tìm thấy quyền người dùng" });
        }
      }

      res.json({
        message: "Cập nhật người dùng thành công",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */
  updateUser: async (req, res) => {
    try {
      const { id } = req.params; // Lấy ID người dùng từ params
      const originalId = id;

      const { userName, phoneNumber, fullName, cccd, role, status } = req.body; // Lấy dữ liệu từ body

      // Lấy thông tin người dùng hiện tại từ cơ sở dữ liệu
      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      // Kiểm tra nếu có thay đổi phoneNumber, kiểm tra trùng với các item trong cơ sở dữ liệu
      if (phoneNumber && phoneNumber !== user.phoneNumber) {
        const existingUserWithPhoneNumber = await User.findOne({ phoneNumber });
        if (existingUserWithPhoneNumber) {
          return res
            .status(400)
            .json({ message: "Số điện thoại đã được đăng ký" });
        }
      }

      // Kiểm tra nếu trạng thái muốn thay đổi là 'INACTIVE'
      if (status === "INACTIVE") {
        const objectId = new mongoose.Types.ObjectId(originalId);
        // Kiểm tra xem có vé xe nào còn hoạt động khôngkhông
        const today = new Date();
        // Kiểm tra xem có chuyến xe nào với busRouteId này và có status là 'OPEN'
        // const activeTickets = await Tickets.find({ user: id, status: "PAID"});
        const activeTickets = await Tickets.aggregate([
          {
            $match: {
              user: objectId,
              status: "PAID", // Chỉ lấy vé đã thanh toán
            },
          },
          {
            $lookup: {
              from: "trips", // Tên collection Trip
              localField: "trip", // Trường tham chiếu trong Tickets
              foreignField: "_id", // Trường _id của Trip
              as: "tripDetails", // Kết quả join sẽ lưu vào tripDetails
            },
          },
          {
            $unwind: "$tripDetails", // Giải nén mảng tripDetails thành object
          },
          {
            $match: {
              "tripDetails.departureTime": { $gte: today }, // Chỉ lấy vé có thời gian khởi hành >= hiện tại
            },
          },
          {
            $limit: 1, // Chỉ cần lấy 1 kết quả rồi dừng lại
          },
        ]);
        console.log("activeTickets:", activeTickets);
        if (activeTickets.length > 0) {
          return res.status(400).json({
            message:
              "Người này còn vé xe chưa đi nên không thể thay đổi trạng thái sang ngừng hoạt động",
          });
        }
      }

      // Kiểm tra vai trò hợp lệ và đảm bảo người dùng không thể thay đổi vai trò của chính mình
      const validRoles = Object.values(ROLE); // ["ADMIN", "STAFF", "CUSTOMER"]
      let userRole = null;
      if (role !== user.role) {
        if (role && validRoles.includes(role)) {
          if (user._id.toString() === req.user.id) {
            // Nếu người dùng là chính họ, không cho phép thay đổi vai trò
            return res.status(400).json({
              message:
                "Bạn không thể thay đổi phân quyền hoặc trạng thái của chính mình",
            });
          }
          userRole = role;
        }
      }

      // Xác định trạng thái, nếu không có, mặc định là 'ACTIVE'
      const userStatus =
        status && Object.values(USER_STATUS).includes(status)
          ? status
          : USER_STATUS.ACTIVE;

      // Cập nhật thông tin người dùng

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { userName, phoneNumber, fullName, cccd, status: userStatus }, // Cập nhật trạng thái
        { new: true }
      );

      // Nếu có role và hợp lệ, cập nhật bảng Permission
      if (userRole) {
        const permission = await Permission.findOneAndUpdate(
          { user: id },
          { role: userRole },
          { new: true }
        );

        if (!permission) {
          return res
            .status(404)
            .json({ message: "Không tìm thấy quyền người dùng" });
        }
      }

      res.json({
        message: "Cập nhật người dùng thành công",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  updateUserRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const user = await User.findById(id).exec();
      if (!user) {
        return res.status(404).json({
          message: "User không tồn tại",
        });
      }

      await Permission.findOneAndUpdate({ user: id }, { role }).exec();

      res.json({
        message: "Update role successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removeUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default UserController;
