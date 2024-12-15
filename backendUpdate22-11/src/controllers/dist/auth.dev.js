"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../models/users.js"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _index = require("../constants/index.js");

var _permissions = _interopRequireDefault(require("../models/permissions.js"));

var _crypto = _interopRequireDefault(require("crypto"));

var _otpCodes = _interopRequireDefault(require("../models/otpCodes.js"));

var _sendMail = _interopRequireDefault(require("../utils/sendMail.js"));

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AuthController = {
  // signUp: async (req, res) => {
  //   const { userName, password, email, phoneNumber, fullName, cccd } = req.body;
  //   try {
  //     const emailOrPhoneExists = await User.findOne({
  //       $or: [{ email }, { phoneNumber }],
  //     }).exec();
  //     if (emailOrPhoneExists) {
  //       return res.status(400).json({
  //         message: "Email hoặc số điện thoại đã tồn tại",
  //       });
  //     }
  //     const salt = await bcrypt.genSalt(10);
  //     const hashedPassword = await bcrypt.hash(password, salt);
  //     const userCount = await User.countDocuments();
  //     const role = userCount > 0 ? ROLE.CUSTOMER : ROLE.ADMIN;
  //     const user = await new User({
  //       userName,
  //       password,
  //       email,
  //       phoneNumber,
  //       fullName,
  //       cccd,
  //       password: hashedPassword,
  //     }).save();
  //     // send email verify
  //     const expireMinutes = 15;
  //     const otp = crypto.randomInt(100000, 999999).toString();
  //     const otpExpires = new Date(Date.now() + expireMinutes * 60 * 1000);
  //     await sendMail({
  //       toEmail: email,
  //       title: "Xác thực tài khoản",
  //       content: `Mã xác thực tài khoản của bạn là: ${otp}. Vui lòng nhập mã OTP để xác minh tài khoản, mã OTP có hiệu lực tối đa ${expireMinutes} phút.`,
  //     });
  //     await new OtpCodes({
  //       user: user._id,
  //       code: otp,
  //       expired: otpExpires,
  //     }).save();
  //     // save permission
  //     await new Permission({
  //       user: user._id,
  //       role,
  //     }).save();
  //     res.status(201).json({
  //       status: true,
  //       message: "Đăng ký tài khoản thành công",
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Internal server error",
  //       error: error.message,
  //     });
  //   }
  // },

  /* signUp: async (req, res) => {
    const { userName, password, email, phoneNumber, fullName, cccd } = req.body;
      try {
      // Kiểm tra xem email hoặc số điện thoại đã tồn tại chưa
      const emailOrPhoneExists = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      }).exec();
        if (emailOrPhoneExists) {
        return res.status(400).json({
          message: "Email hoặc số điện thoại đã tồn tại",
        });
      }
        // Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
        // Kiểm tra số lượng người dùng và gán quyền
      const userCount = await User.countDocuments();
      const role = userCount > 0 ? ROLE.CUSTOMER : ROLE.ADMIN;
        // Lưu thông tin người dùng mới
      const user = await new User({
        userName,
        password,
        email,
        phoneNumber,
        fullName,
        cccd,
        password: hashedPassword,
      }).save();
        // Gửi mã OTP xác thực
      const expireMinutes = 15;
      const otp = crypto.randomInt(100000, 999999).toString();
      const otpExpires = new Date(Date.now() + expireMinutes * 60 * 1000);
        await sendMail({
        toEmail: email,
        title: "Xác thực tài khoản",
        content: `Mã xác thực tài khoản của bạn là: ${otp}. Vui lòng nhập mã OTP để xác minh tài khoản, mã OTP có hiệu lực tối đa ${expireMinutes} phút.`,
      });
        // Lưu mã OTP vào database
      await new OtpCodes({
        user: user._id,
        code: otp,
        expired: otpExpires,
      }).save();
        // Lưu quyền cho người dùng
      await new Permission({
        user: user._id,
        role,
      }).save();
        // Đăng ký thành công và gửi phản hồi
      res.status(201).json({
        status: true,
        message:
          "Đăng ký tài khoản thành công. Mã OTP đã được gửi đến email của bạn.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */

  /* Đăng ký. Update 02/12 . Phân quyền khi thêm người dùng ở webadmin - còn nhiều lỗi  */

  /*   signUp: async (req, res) => {
    const { userName, password, email, phoneNumber, fullName, cccd, role } =
      req.body;
      try {
      // Kiểm tra xem email hoặc số điện thoại đã tồn tại chưa
      const emailOrPhoneExists = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      }).exec();
        if (emailOrPhoneExists) {
        return res.status(400).json({
          message: "Email hoặc số điện thoại đã tồn tại",
        });
      }
        // Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
        // Xác định vai trò dựa trên input từ người dùng hoặc mặc định là CUSTOMER
      const validRoles = Object.values(ROLE); // ["ADMIN", "STAFF", "CUSTOMER"]
      const userRole = validRoles.includes(role) ? role : ROLE.CUSTOMER;
        // Lưu thông tin người dùng mới
      const user = await new User({
        userName,
        password: hashedPassword,
        email,
        phoneNumber,
        fullName,
        cccd,
      }).save();
        // Gửi mã OTP xác thực
      const expireMinutes = 15;
      const otp = crypto.randomInt(100000, 999999).toString();
      const otpExpires = new Date(Date.now() + expireMinutes * 60 * 1000);
        await sendMail({
        toEmail: email,
        title: "Xác thực tài khoản",
        content: `Mã xác thực tài khoản của bạn là: ${otp}. Vui lòng nhập mã OTP để xác minh tài khoản, mã OTP có hiệu lực tối đa ${expireMinutes} phút.`,
      });
        // Lưu mã OTP vào database
      await new OtpCodes({
        user: user._id,
        code: otp,
        expired: otpExpires,
      }).save();
        // Lưu quyền cho người dùng
      await new Permission({
        user: user._id,
        role: userRole,
      }).save();
        // Đăng ký thành công và gửi phản hồi
      res.status(201).json({
        status: true,
        message:
          "Đăng ký tài khoản thành công. Mã OTP đã được gửi đến email của bạn.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */

  /* Đăng ký. Update 02/12 . Phân quyền khi thêm người dùng ở webadmin - đã hoàn thành */
  signUp: function signUp(req, res) {
    var _req$body, password, email, phoneNumber, fullName, cccd, role, status, existingEmail, existingPhoneNumber, salt, hashedPassword, validRoles, userRole, validStatuses, userStatus, user, expireMinutes, otp, otpExpires;

    return regeneratorRuntime.async(function signUp$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, password = _req$body.password, email = _req$body.email, phoneNumber = _req$body.phoneNumber, fullName = _req$body.fullName, cccd = _req$body.cccd, role = _req$body.role, status = _req$body.status;
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_users["default"].findOne({
              email: email
            }).exec());

          case 4:
            existingEmail = _context.sent;

            if (!existingEmail) {
              _context.next = 8;
              break;
            }

            console.error("Email đã tồn tại:", email); // Log lỗi chi tiết

            return _context.abrupt("return", res.status(400).json({
              message: "Email đã tồn tại"
            }));

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(_users["default"].findOne({
              phoneNumber: phoneNumber
            }).exec());

          case 10:
            existingPhoneNumber = _context.sent;

            if (!existingPhoneNumber) {
              _context.next = 14;
              break;
            }

            console.error("Số điện thoại đã tồn tại:", phoneNumber); // Log lỗi chi tiết

            return _context.abrupt("return", res.status(400).json({
              message: "Số điện thoại đã tồn tại"
            }));

          case 14:
            _context.next = 16;
            return regeneratorRuntime.awrap(_bcrypt["default"].genSalt(10));

          case 16:
            salt = _context.sent;
            _context.next = 19;
            return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, salt));

          case 19:
            hashedPassword = _context.sent;
            // Xác định vai trò dựa trên input từ người dùng hoặc mặc định là CUSTOMER
            validRoles = Object.values(_index.ROLE); // ["ADMIN", "STAFF", "CUSTOMER"]

            userRole = validRoles.includes(role) ? role : _index.ROLE.CUSTOMER; // Xác định trạng thái dựa vào input hoặc mặc định là ACTIVE

            validStatuses = Object.values(_index.USER_STATUS); // ["ACTIVE", "INACTIVE"]

            userStatus = validStatuses.includes(status) ? status : _index.USER_STATUS.ACTIVE; // Lưu thông tin người dùng mới

            _context.next = 26;
            return regeneratorRuntime.awrap(new _users["default"]({
              password: hashedPassword,
              email: email,
              phoneNumber: phoneNumber,
              fullName: fullName,
              cccd: cccd,
              status: userStatus // Thêm trường trạng thái

            }).save());

          case 26:
            user = _context.sent;
            // Gửi mã OTP xác thực
            expireMinutes = 15;
            otp = _crypto["default"].randomInt(100000, 999999).toString();
            otpExpires = new Date(Date.now() + expireMinutes * 60 * 1000);
            _context.next = 32;
            return regeneratorRuntime.awrap((0, _sendMail["default"])({
              toEmail: email,
              title: "Xác thực tài khoản",
              content: "M\xE3 x\xE1c th\u1EF1c t\xE0i kho\u1EA3n c\u1EE7a b\u1EA1n l\xE0: ".concat(otp, ". Vui l\xF2ng nh\u1EADp m\xE3 OTP \u0111\u1EC3 x\xE1c minh t\xE0i kho\u1EA3n, m\xE3 OTP c\xF3 hi\u1EC7u l\u1EF1c t\u1ED1i \u0111a ").concat(expireMinutes, " ph\xFAt.")
            }));

          case 32:
            _context.next = 34;
            return regeneratorRuntime.awrap(new _otpCodes["default"]({
              user: user._id,
              code: otp,
              expired: otpExpires
            }).save());

          case 34:
            _context.next = 36;
            return regeneratorRuntime.awrap(new _permissions["default"]({
              user: user._id,
              role: userRole
            }).save());

          case 36:
            // Đăng ký thành công và gửi phản hồi
            res.status(201).json({
              status: true,
              message: "Đăng ký tài khoản thành công. Mã OTP đã được gửi đến email của bạn."
            });
            _context.next = 42;
            break;

          case 39:
            _context.prev = 39;
            _context.t0 = _context["catch"](1);
            res.status(500).json({
              message: "Internal server error",
              error: _context.t0.message
            });

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 39]]);
  },

  /* signIn: async (req, res) => {
    const { email, password } = req.body;
      try {
      // check email registered
      const findUser = await User.findOne({ email }).exec();
        if (!findUser) {
        return res.status(404).json({ message: "Tài khoản chưa đăng ký!" });
      }
        // kiểm tra tài khoản đã xác minh chưa
      if (!findUser.isVerified) {
        return res
          .status(400)
          .json({ message: "Tài khoản chưa được xác minh" });
      }
        // check password
      const isPasswordValid = await bcrypt.compare(password, findUser.password);
        if (!isPasswordValid) {
        return res.status(400).json({ message: "Mật khẩu không chính xác!" });
      }
        const role = await Permission.findOne({ user: findUser._id }).exec();
        const token = jwt.sign(
        {
          id: findUser._id,
          email: findUser.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );
        res.json({
        user: {
          ...findUser.toJSON(),
          role: role.role,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */

  /* Login update 02/12 */
  signIn: function signIn(req, res) {
    var _req$body2, email, password, findUser, isPasswordValid, role, token;

    return regeneratorRuntime.async(function signIn$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(_users["default"].findOne({
              email: email
            }).exec());

          case 4:
            findUser = _context2.sent;

            if (findUser) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: "Tài khoản chưa đăng ký!"
            }));

          case 7:
            if (findUser.isVerified) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "Tài khoản chưa được xác minh"
            }));

          case 9:
            if (!(findUser.status === "INACTIVE")) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(403).json({
              message: "Tài khoản của bạn đang bị khóa, không thể đăng nhập"
            }));

          case 11:
            _context2.next = 13;
            return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, findUser.password));

          case 13:
            isPasswordValid = _context2.sent;

            if (isPasswordValid) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              message: "Mật khẩu không chính xác!"
            }));

          case 16:
            _context2.next = 18;
            return regeneratorRuntime.awrap(_permissions["default"].findOne({
              user: findUser._id
            }).exec());

          case 18:
            role = _context2.sent;
            // Tạo token JWT
            token = _jsonwebtoken["default"].sign({
              id: findUser._id,
              email: findUser.email
            }, process.env.JWT_SECRET_KEY, {
              expiresIn: "30d"
            }); // Trả về thông tin người dùng và token

            res.json({
              user: _objectSpread({}, findUser.toJSON(), {
                role: role.role
              }),
              token: token
            });
            _context2.next = 26;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](1);
            res.status(500).json({
              message: "Internal server error",
              error: _context2.t0.message
            });

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 23]]);
  },
  verifyOtp: function verifyOtp(req, res) {
    var _req$body3, email, otp, user, otpData, isExpired;

    return regeneratorRuntime.async(function verifyOtp$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body3 = req.body, email = _req$body3.email, otp = _req$body3.otp;
            _context3.next = 4;
            return regeneratorRuntime.awrap(_users["default"].findOne({
              email: email
            }).exec());

          case 4:
            user = _context3.sent;

            if (user) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: "Không tìm thấy tài khoản"
            }));

          case 7:
            _context3.next = 9;
            return regeneratorRuntime.awrap(_otpCodes["default"].findOne({
              user: user._id,
              code: otp
            }).exec());

          case 9:
            otpData = _context3.sent;

            if (otpData) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: "Mã OTP không chính xác"
            }));

          case 12:
            isExpired = (0, _dayjs["default"])(otpData.expired).diff((0, _dayjs["default"])()) <= 0;

            if (!isExpired) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              message: "Mã OTP đã hết hạn"
            }));

          case 15:
            user.isVerified = true;
            _context3.next = 18;
            return regeneratorRuntime.awrap(user.save());

          case 18:
            _context3.next = 20;
            return regeneratorRuntime.awrap(_otpCodes["default"].findByIdAndDelete(otpData._id));

          case 20:
            res.json({
              message: "Xác minh tài khoản thành công"
            });
            _context3.next = 26;
            break;

          case 23:
            _context3.prev = 23;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context3.t0.message
            });

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 23]]);
  },
  resendOtp: function resendOtp(req, res) {
    var email, user, expireMinutes, otp, otpExpires;
    return regeneratorRuntime.async(function resendOtp$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            email = req.body.email;
            _context4.prev = 1;
            _context4.next = 4;
            return regeneratorRuntime.awrap(_users["default"].findOne({
              email: email
            }).exec());

          case 4:
            user = _context4.sent;

            if (user) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "Không tìm thấy tài khoản"
            }));

          case 7:
            if (!user.isVerified) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.json({
              message: "Tài khoản đã được xác minh"
            }));

          case 9:
            // send email verify
            expireMinutes = 15;
            otp = _crypto["default"].randomInt(100000, 999999).toString();
            otpExpires = new Date(Date.now() + expireMinutes * 60 * 1000);
            _context4.next = 14;
            return regeneratorRuntime.awrap((0, _sendMail["default"])({
              toEmail: email,
              title: "Xác thực tài khoản",
              content: "M\xE3 x\xE1c th\u1EF1c t\xE0i kho\u1EA3n c\u1EE7a b\u1EA1n l\xE0: ".concat(otp, ". Vui l\xF2ng nh\u1EADp m\xE3 OTP \u0111\u1EC3 x\xE1c minh t\xE0i kho\u1EA3n, m\xE3 OTP c\xF3 hi\u1EC7u l\u1EF1c t\u1ED1i \u0111a ").concat(expireMinutes, " ph\xFAt.")
            }));

          case 14:
            _context4.next = 16;
            return regeneratorRuntime.awrap(_otpCodes["default"].findOneAndUpdate({
              user: user._id
            }, {
              code: otp,
              expired: otpExpires
            }).exec());

          case 16:
            res.json(true);
            _context4.next = 22;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](1);
            res.status(500).json({
              message: "Internal server error",
              error: _context4.t0.message
            });

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 19]]);
  }
};
var _default = AuthController;
exports["default"] = _default;