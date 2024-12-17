"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../constants/index.js");

var _permissions = _interopRequireDefault(require("../models/permissions.js"));

var _users = _interopRequireDefault(require("../models/users.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _tickets = _interopRequireDefault(require("../models/tickets.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UserController = {
  getProfile: function getProfile(req, res) {
    var userId, user, permission;
    return regeneratorRuntime.async(function getProfile$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            userId = req.user.id;
            _context.next = 4;
            return regeneratorRuntime.awrap(_users["default"].findById(userId).exec());

          case 4:
            user = _context.sent;
            _context.next = 7;
            return regeneratorRuntime.awrap(_permissions["default"].findOne({
              user: userId
            }).exec());

          case 7:
            permission = _context.sent;
            res.json(_objectSpread({}, user.toJSON(), {
              role: permission.role
            }));
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context.t0.message
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 11]]);
  },
  updateProfile: function updateProfile(req, res) {
    var userId, _req$body, userName, phoneNumber, fullName, cccd, user;

    return regeneratorRuntime.async(function updateProfile$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userId = req.user.id;
            _req$body = req.body, userName = _req$body.userName, phoneNumber = _req$body.phoneNumber, fullName = _req$body.fullName, cccd = _req$body.cccd;
            _context2.next = 5;
            return regeneratorRuntime.awrap(_users["default"].findByIdAndUpdate(userId, {
              userName: userName,
              phoneNumber: phoneNumber,
              fullName: fullName,
              cccd: cccd
            }, {
              "new": true
            }).exec());

          case 5:
            user = _context2.sent;
            res.json(user);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context2.t0.message
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  },
  changeProfilePassword: function changeProfilePassword(req, res) {
    var userId, _req$body2, password, newPassword, findUser, isPasswordValid, isSameOldPassword, salt, hashedPassword;

    return regeneratorRuntime.async(function changeProfilePassword$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userId = req.user.id;
            _req$body2 = req.body, password = _req$body2.password, newPassword = _req$body2.newPassword;
            _context3.next = 5;
            return regeneratorRuntime.awrap(_users["default"].findById(userId).exec());

          case 5:
            findUser = _context3.sent;

            if (findUser) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: "Không tìm thấy tài khoản!"
            }));

          case 8:
            _context3.next = 10;
            return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, findUser.password));

          case 10:
            isPasswordValid = _context3.sent;

            if (isPasswordValid) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              message: "Mật khẩu hiện tại không chính xác!"
            }));

          case 13:
            _context3.next = 15;
            return regeneratorRuntime.awrap(_bcrypt["default"].compare(newPassword, findUser.password));

          case 15:
            isSameOldPassword = _context3.sent;

            if (!isSameOldPassword) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("return", res.status(406).json({
              message: "Mật khẩu cũ không được trùng mật khẩu mới"
            }));

          case 18:
            _context3.next = 20;
            return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

          case 20:
            salt = _context3.sent;
            _context3.next = 23;
            return regeneratorRuntime.awrap(_bcrypt["default"].hash(newPassword, salt));

          case 23:
            hashedPassword = _context3.sent;
            _context3.next = 26;
            return regeneratorRuntime.awrap(_users["default"].findByIdAndUpdate(userId, {
              password: hashedPassword
            }).exec());

          case 26:
            res.json({
              message: "Đổi mật khẩu thành công"
            });
            _context3.next = 32;
            break;

          case 29:
            _context3.prev = 29;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context3.t0.message
            });

          case 32:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 29]]);
  },
  getUsers: function getUsers(req, res) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, users, count, totalPage, currentPage, userIds, permissions, permissionMap, usersWithRoles;

    return regeneratorRuntime.async(function getUsers$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? _index.PAGINATION.PAGE : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? _index.PAGINATION.LIMIT : _req$query$limit; // Lấy danh sách người dùng

            _context4.next = 4;
            return regeneratorRuntime.awrap(_users["default"].find().sort("-createdAt").skip((page - 1) * limit).limit(limit * 1).exec());

          case 4:
            users = _context4.sent;
            _context4.next = 7;
            return regeneratorRuntime.awrap(_users["default"].countDocuments());

          case 7:
            count = _context4.sent;
            totalPage = Math.ceil(count / limit);
            currentPage = Number(page); // Lấy danh sách quyền tương ứng với userIds

            userIds = users.map(function (user) {
              return user._id;
            });
            _context4.next = 13;
            return regeneratorRuntime.awrap(_permissions["default"].find({
              user: {
                $in: userIds
              }
            }).exec());

          case 13:
            permissions = _context4.sent;
            // Tạo một map để ánh xạ userId với role
            permissionMap = permissions.reduce(function (acc, permission) {
              acc[permission.user] = permission.role;
              return acc;
            }, {}); // Gắn thông tin role vào danh sách người dùng

            usersWithRoles = users.map(function (user) {
              return _objectSpread({}, user.toJSON(), {
                role: permissionMap[user._id] || null // Nếu không tìm thấy role thì để null

              });
            });
            res.json({
              data: usersWithRoles,
              totalPage: totalPage,
              currentPage: currentPage
            });
            _context4.next = 22;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context4.t0.message
            });

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 19]]);
  },
  getUser: function getUser(req, res) {
    var id, user;
    return regeneratorRuntime.async(function getUser$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return regeneratorRuntime.awrap(_users["default"].findById(id));

          case 4:
            user = _context5.sent;
            res.json(user);
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context5.t0.message
            });

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 8]]);
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
  updateUser: function updateUser(req, res) {
    var id, originalId, _req$body3, userName, phoneNumber, fullName, cccd, role, status, user, existingUserWithPhoneNumber, objectId, today, activeTickets, validRoles, userRole, userStatus, updatedUser, permission;

    return regeneratorRuntime.async(function updateUser$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id; // Lấy ID người dùng từ params

            originalId = id;
            _req$body3 = req.body, userName = _req$body3.userName, phoneNumber = _req$body3.phoneNumber, fullName = _req$body3.fullName, cccd = _req$body3.cccd, role = _req$body3.role, status = _req$body3.status; // Lấy dữ liệu từ body
            // Lấy thông tin người dùng hiện tại từ cơ sở dữ liệu

            _context6.next = 6;
            return regeneratorRuntime.awrap(_users["default"].findById(id).exec());

          case 6:
            user = _context6.sent;

            if (user) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "Người dùng không tồn tại"
            }));

          case 9:
            if (!(phoneNumber && phoneNumber !== user.phoneNumber)) {
              _context6.next = 15;
              break;
            }

            _context6.next = 12;
            return regeneratorRuntime.awrap(_users["default"].findOne({
              phoneNumber: phoneNumber
            }));

          case 12:
            existingUserWithPhoneNumber = _context6.sent;

            if (!existingUserWithPhoneNumber) {
              _context6.next = 15;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              message: "Số điện thoại đã được đăng ký"
            }));

          case 15:
            if (!(status === "INACTIVE")) {
              _context6.next = 24;
              break;
            }

            objectId = new _mongoose["default"].Types.ObjectId(originalId); // Kiểm tra xem có vé xe nào còn hoạt động khôngkhông

            today = new Date(); // Kiểm tra xem có chuyến xe nào với busRouteId này và có status là 'OPEN'
            // const activeTickets = await Tickets.find({ user: id, status: "PAID"});

            _context6.next = 20;
            return regeneratorRuntime.awrap(_tickets["default"].aggregate([{
              $match: {
                user: objectId,
                status: "PAID" // Chỉ lấy vé đã thanh toán

              }
            }, {
              $lookup: {
                from: "trips",
                // Tên collection Trip
                localField: "trip",
                // Trường tham chiếu trong Tickets
                foreignField: "_id",
                // Trường _id của Trip
                as: "tripDetails" // Kết quả join sẽ lưu vào tripDetails

              }
            }, {
              $unwind: "$tripDetails" // Giải nén mảng tripDetails thành object

            }, {
              $match: {
                "tripDetails.departureTime": {
                  $gte: today
                } // Chỉ lấy vé có thời gian khởi hành >= hiện tại

              }
            }, {
              $limit: 1 // Chỉ cần lấy 1 kết quả rồi dừng lại

            }]));

          case 20:
            activeTickets = _context6.sent;
            console.log("activeTickets:", activeTickets);

            if (!(activeTickets.length > 0)) {
              _context6.next = 24;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              message: "Người này còn vé xe chưa đi nên không thể thay đổi trạng thái sang ngừng hoạt động"
            }));

          case 24:
            // Kiểm tra vai trò hợp lệ và đảm bảo người dùng không thể thay đổi vai trò của chính mình
            validRoles = Object.values(_index.ROLE); // ["ADMIN", "STAFF", "CUSTOMER"]

            userRole = null;

            if (!(role !== user.role)) {
              _context6.next = 31;
              break;
            }

            if (!(role && validRoles.includes(role))) {
              _context6.next = 31;
              break;
            }

            if (!(user._id.toString() === req.user.id)) {
              _context6.next = 30;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              message: "Bạn không thể thay đổi phân quyền hoặc trạng thái của chính mình"
            }));

          case 30:
            userRole = role;

          case 31:
            // Xác định trạng thái, nếu không có, mặc định là 'ACTIVE'
            userStatus = status && Object.values(_index.USER_STATUS).includes(status) ? status : _index.USER_STATUS.ACTIVE; // Cập nhật thông tin người dùng

            _context6.next = 34;
            return regeneratorRuntime.awrap(_users["default"].findByIdAndUpdate(id, {
              userName: userName,
              phoneNumber: phoneNumber,
              fullName: fullName,
              cccd: cccd,
              status: userStatus
            }, // Cập nhật trạng thái
            {
              "new": true
            }));

          case 34:
            updatedUser = _context6.sent;

            if (!userRole) {
              _context6.next = 41;
              break;
            }

            _context6.next = 38;
            return regeneratorRuntime.awrap(_permissions["default"].findOneAndUpdate({
              user: id
            }, {
              role: userRole
            }, {
              "new": true
            }));

          case 38:
            permission = _context6.sent;

            if (permission) {
              _context6.next = 41;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "Không tìm thấy quyền người dùng"
            }));

          case 41:
            res.json({
              message: "Cập nhật người dùng thành công",
              user: updatedUser
            });
            _context6.next = 47;
            break;

          case 44:
            _context6.prev = 44;
            _context6.t0 = _context6["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context6.t0.message
            });

          case 47:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 44]]);
  },
  updateUserRole: function updateUserRole(req, res) {
    var id, role, user;
    return regeneratorRuntime.async(function updateUserRole$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            id = req.params.id;
            role = req.body.role;
            _context7.next = 5;
            return regeneratorRuntime.awrap(_users["default"].findById(id).exec());

          case 5:
            user = _context7.sent;

            if (user) {
              _context7.next = 8;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              message: "User không tồn tại"
            }));

          case 8:
            _context7.next = 10;
            return regeneratorRuntime.awrap(_permissions["default"].findOneAndUpdate({
              user: id
            }, {
              role: role
            }).exec());

          case 10:
            res.json({
              message: "Update role successfully"
            });
            _context7.next = 16;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context7.t0.message
            });

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 13]]);
  },
  removeUser: function removeUser(req, res) {
    var id, user;
    return regeneratorRuntime.async(function removeUser$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            id = req.params.id;
            _context8.next = 4;
            return regeneratorRuntime.awrap(_users["default"].findByIdAndDelete(id));

          case 4:
            user = _context8.sent;
            res.json(user);
            _context8.next = 11;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context8.t0.message
            });

          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[0, 8]]);
  }
};
var _default = UserController;
exports["default"] = _default;