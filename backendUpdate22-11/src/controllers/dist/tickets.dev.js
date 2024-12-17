"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ticketUpdateStt = void 0;

var _index = require("../constants/index.js");

var _randomNumber = _interopRequireDefault(require("../utils/randomNumber.js"));

var _payment = _interopRequireDefault(require("../utils/payment.js"));

var _qs = _interopRequireDefault(require("qs"));

var _moment = _interopRequireDefault(require("moment"));

var _crypto = _interopRequireDefault(require("crypto"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _zalopayService = require("../utils/zalopayService.js");

var _zalopay = _interopRequireDefault(require("../config/zalopay.js"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _axios = _interopRequireDefault(require("axios"));

var _users = _interopRequireDefault(require("../models/users.js"));

var _permissions = _interopRequireDefault(require("../models/permissions.js"));

var _busRoutes = _interopRequireDefault(require("../models/busRoutes.js"));

var _seats = _interopRequireDefault(require("../models/seats.js"));

var _notifications = _interopRequireDefault(require("../models/notifications.js"));

var _trips = _interopRequireDefault(require("../models/trips.js"));

var _bus = _interopRequireDefault(require("../models/bus.js"));

var _tickets = _interopRequireDefault(require("../models/tickets.js"));

var _promotion = _interopRequireWildcard(require("../models/promotion.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

var getListTicket = function getListTicket(page, limit) {
  var queryObj,
      tickets,
      count,
      totalPage,
      currentPage,
      _args = arguments;
  return regeneratorRuntime.async(function getListTicket$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          queryObj = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
          _context.next = 3;
          return regeneratorRuntime.awrap(_tickets["default"].find(queryObj).sort("-createdAt").skip((page - 1) * limit).limit(limit * 1).populate(["user", "trip"]).exec());

        case 3:
          tickets = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_tickets["default"].countDocuments(queryObj));

        case 6:
          count = _context.sent;
          // Tính tổng số trang
          totalPage = Math.ceil(count / limit);
          currentPage = Number(page);
          return _context.abrupt("return", {
            tickets: tickets,
            totalPage: totalPage,
            currentPage: currentPage
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

var updateSeatStt = function updateSeatStt(_ref) {
  var tripId, seatNumber, status, updateSeatTask;
  return regeneratorRuntime.async(function updateSeatStt$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          tripId = _ref.tripId, seatNumber = _ref.seatNumber, status = _ref.status;
          updateSeatTask = seatNumber.map(function (seatName) {
            return _seats["default"].findOneAndUpdate({
              trip: tripId,
              seatNumber: seatName
            }, {
              status: status
            });
          });
          _context2.next = 4;
          return regeneratorRuntime.awrap(Promise.all(updateSeatTask));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var ticketUpdateStt = function ticketUpdateStt(_ref2) {
  var ticketId, status, ticket, discount;
  return regeneratorRuntime.async(function ticketUpdateStt$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ticketId = _ref2.ticketId, status = _ref2.status;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_tickets["default"].findByIdAndUpdate(ticketId, {
            status: status
          }, {
            "new": true
          }).populate("trip").exec());

        case 3:
          ticket = _context3.sent;
          _context3.t0 = status;
          _context3.next = _context3.t0 === _index.TICKET_STATUS.CANCELED ? 7 : _context3.t0 === _index.TICKET_STATUS.PAYMENT_FAILED ? 20 : _context3.t0 === _index.TICKET_STATUS.PAID ? 25 : 28;
          break;

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(new _notifications["default"]({
            ticket: ticket._id,
            type: _index.NOTIFICATION_TYPE.TICKET_CANCELED,
            user: ticket.user
          }).save());

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(updateSeatStt({
            tripId: ticket.trip._id,
            seatNumber: ticket.seatNumber,
            status: _index.SEAT_STATUS.EMPTY
          }));

        case 11:
          if (!ticket.promotion) {
            _context3.next = 19;
            break;
          }

          _context3.next = 14;
          return regeneratorRuntime.awrap(_promotion["default"].findById(ticket.promotion));

        case 14:
          discount = _context3.sent;

          if (!discount) {
            _context3.next = 19;
            break;
          }

          discount.remainingCount += 1; // Hoàn trả lượt sử dụng

          _context3.next = 19;
          return regeneratorRuntime.awrap(discount.save());

        case 19:
          return _context3.abrupt("break", 28);

        case 20:
          _context3.next = 22;
          return regeneratorRuntime.awrap(new _notifications["default"]({
            ticket: ticket._id,
            type: _index.NOTIFICATION_TYPE.TICKET_BOOK_FAILED,
            user: ticket.user
          }).save());

        case 22:
          _context3.next = 24;
          return regeneratorRuntime.awrap(updateSeatStt({
            tripId: ticket.trip._id,
            seatNumber: ticket.seatNumber,
            status: _index.SEAT_STATUS.EMPTY
          }));

        case 24:
          return _context3.abrupt("break", 28);

        case 25:
          _context3.next = 27;
          return regeneratorRuntime.awrap(new _notifications["default"]({
            ticket: ticket._id,
            type: _index.NOTIFICATION_TYPE.TICKET_BOOK_SUCCESS,
            user: ticket.user
          }).save());

        case 27:
          return _context3.abrupt("break", 28);

        case 28:
          return _context3.abrupt("return", ticket);

        case 29:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.ticketUpdateStt = ticketUpdateStt;
var TicketController = {
  // createTicket: async (req, res) => {
  //   try {
  //     const {
  //       customerPhone,
  //       customerName,
  //       note,
  //       trip,
  //       seatNumber,
  //       boardingPoint,
  //       dropOffPoint,
  //       status,
  //       discountCode,
  //     } = req.body;
  //     // Kiểm tra thông tin các trường bắt buộc
  //     if (!customerPhone || !customerName || !boardingPoint || !dropOffPoint) {
  //       return res.status(400).json({
  //         message: "Vui lòng nhập đầy đủ thông tin yêu cầu.",
  //       });
  //     }
  //     const user = req.user.id;
  //     /* const code = `MD${randomNumber(5)}`; */
  //     let code;
  //     // Hàm tạo mã vé duy nhất
  //     // Hàm tạo mã vé duy nhất với ngày tháng năm (2 số cuối năm), 2 chữ cái random và số ngẫu nhiên
  //     const generateUniqueCode = async () => {
  //       const randomLetters = () => {
  //         const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Bảng chữ cái
  //         return (
  //           letters.charAt(Math.floor(Math.random() * letters.length)) +
  //           letters.charAt(Math.floor(Math.random() * letters.length))
  //         ); // Lấy 2 chữ cái ngẫu nhiên
  //       };
  //       // Lấy ngày, tháng, năm hiện tại (2 số cuối của năm)
  //       const today = dayjs();
  //       const datePart =
  //         today.format("DDMM") + today.year().toString().slice(-2); // Lấy ngày, tháng và 2 số cuối năm
  //       let newCode = `${randomLetters()}${datePart}- ${randomNumber(5)}`; // Tạo mã với ngày tháng năm (2 số cuối năm), 2 chữ cái và số ngẫu nhiên
  //       const existingTicket = await Tickets.findOne({ code: newCode }).exec();
  //       if (existingTicket) {
  //         return generateUniqueCode(); // Tạo lại mã nếu mã đã tồn tại
  //       }
  //       return newCode;
  //     };
  //     // Tạo mã vé duy nhất
  //     code = await generateUniqueCode();
  //     // kiểm tra thông tin chuyến xe
  //     const tripInfo = await Trip.findById(trip).populate("bus route").exec();
  //     if (!tripInfo) {
  //       return res.status(404).json({
  //         message: "Chuyến xe không tồn tại",
  //       });
  //     }
  //     if (dayjs().isAfter(tripInfo.departureTime)) {
  //       return res.status(400).json({
  //         message: "Chuyến xe đã khởi hành",
  //       });
  //     }
  //     let totalAmount = tripInfo.price * seatNumber.length;
  //     // kiểm tra trạng thái ghế
  //     for await (let seat of seatNumber) {
  //       const seatInfo = await Seats.findOne({
  //         seatNumber: seat,
  //         trip: tripInfo._id,
  //       }).exec();
  //       if (!seatInfo) {
  //         return res.status(404).json({
  //           message: "Không tìm thấy ghế",
  //         });
  //       }
  //       if (seatInfo.status === SEAT_STATUS.SOLD) {
  //         return res.status(406).json({
  //           message: `Ghế ${seat} đã có người đặt`,
  //         });
  //       }
  //     }
  //     // cập nhật trạng thái ghế
  //     await updateSeatStt({
  //       tripId: tripInfo._id,
  //       seatNumber,
  //       status: SEAT_STATUS.SOLD,
  //     });
  //     let discount;
  //     if (discountCode) {
  //       discount = await Promotion.findOne({ code: discountCode }).exec();
  //       if (!discount) {
  //         return res.status(404).json({ message: "Mã giảm giá không tồn tại" });
  //       }
  //       // Kiểm tra trạng thái mã giảm giá
  //       if (discount.status === PROMOTIONT_STATUS.EXPIRED) {
  //         return res.status(400).json({ message: "Mã giảm giá đã hết hạn" });
  //       }
  //       // Tính giảm giá
  //       if (discount.discountType === DISCOUNT_TYPE.AMOUNT) {
  //         totalAmount -= discount.discountAmount;
  //       } else {
  //         const decreasePrice = (totalAmount * discount.discountAmount) / 100;
  //         totalAmount -= decreasePrice;
  //       }
  //       totalAmount = totalAmount >= 0 ? totalAmount : 0;
  //     }
  //     const ticket = await new Tickets({
  //       user,
  //       customerPhone,
  //       customerName,
  //       note,
  //       trip,
  //       code,
  //       seatNumber,
  //       boardingPoint,
  //       dropOffPoint,
  //       status,
  //       totalAmount,
  //     }).save();
  //     // mã giảm giá
  //     if (discountCode) {
  //       await new PromotionUsage({
  //         user,
  //         ticket: ticket._id,
  //         promotion: discount._id,
  //       }).save();
  //       // Cập nhật remainingCount
  //       if (discount.remainingCount > 0) {
  //         discount.remainingCount -= 1;
  //         await discount.save();
  //       } else {
  //         return res
  //           .status(400)
  //           .json({ message: "Mã giảm giá đã hết lượt sử dụng" });
  //       }
  //     }
  //     // Đặt timeout 10 phút
  //     /* Nếu trong 10' không xử lý thanh toán thì vé sẽ bị hủy  */
  //     setTimeout(async () => {
  //       const ticketInfo = await Tickets.findById(ticket._id).exec();
  //       console.log(`Giá trị ticketInfo ${ticketInfo}`);
  //       // Nếu người dùng chưa chọn phương thức thanh toán
  //       if (ticketInfo.status === TICKET_STATUS.PENDING) {
  //         // Cập nhật trạng thái vé
  //         ticketInfo.status = TICKET_STATUS.CANCELED;
  //         await ticketInfo.save();
  //         // cập nhật trạng thái ghế
  //         await updateSeatStt({
  //           tripId: tripInfo._id,
  //           seatNumber,
  //           status: SEAT_STATUS.EMPTY,
  //         });
  //         if (discountCode) {
  //           const discount = await Promotion.findOne({
  //             code: discountCode,
  //           }).exec();
  //           if (discount) {
  //             discount.remainingCount += 1;
  //             await discount.save();
  //           }
  //         }
  //       }
  //     }, 10 * 60 * 1000); // 10 phút
  //     // Lấy thông tin chi tiết vé
  //     const ticketInfo = await Tickets.findById(ticket._id)
  //       .populate({
  //         path: "trip",
  //         populate: {
  //           path: "bus route",
  //         },
  //       })
  //       .exec();
  //     res.json({
  //       message: "Create ticket successfully",
  //       ticket: ticketInfo,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Lỗi tạo vé",
  //       error: error.message,
  //     });
  //   }
  // },

  /* createTicket: async (req, res) => {
    try {
      const {
        customerPhone,
        customerName,
        note,
        trip,
        seatNumber,
        boardingPoint,
        dropOffPoint,
        status,
        discountCode,
      } = req.body;
        // Kiểm tra thông tin các trường bắt buộc
      if (!customerPhone || !customerName || !boardingPoint || !dropOffPoint) {
        return res.status(400).json({
          message: "Vui lòng nhập đầy đủ thông tin yêu cầu.",
        });
      }
        const user = req.user.id;
        // Hàm tạo mã vé duy nhất
      const generateUniqueCode = async () => {
        const randomLetters = () => {
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          return (
            letters.charAt(Math.floor(Math.random() * letters.length)) +
            letters.charAt(Math.floor(Math.random() * letters.length))
          );
        };
          const today = dayjs();
        const datePart =
          today.format("DDMM") + today.year().toString().slice(-2);
          let newCode = `${randomLetters()}${datePart}-${Math.floor(
          Math.random() * 100000
        )
          .toString()
          .padStart(5, "0")}`;
        const existingTicket = await Tickets.findOne({ code: newCode }).exec();
        if (existingTicket) {
          return generateUniqueCode();
        }
        return newCode;
      };
        // Tạo mã vé duy nhất
      const code = await generateUniqueCode();
        // kiểm tra thông tin chuyến xe
      const tripInfo = await Trip.findById(trip).populate("bus route").exec();
      if (!tripInfo) {
        return res.status(404).json({
          message: "Chuyến xe không tồn tại",
        });
      }
        if (dayjs().isAfter(tripInfo.departureTime)) {
        return res.status(400).json({
          message: "Chuyến xe đã khởi hành",
        });
      }
        let totalAmount = tripInfo.price * seatNumber.length;
        // kiểm tra trạng thái ghế
      for await (let seat of seatNumber) {
        const seatInfo = await Seats.findOne({
          seatNumber: seat,
          trip: tripInfo._id,
        }).exec();
          if (!seatInfo) {
          return res.status(404).json({
            message: "Không tìm thấy ghế",
          });
        }
          if (seatInfo.status === SEAT_STATUS.SOLD) {
          return res.status(406).json({
            message: `Ghế ${seat} đã có người đặt`,
          });
        }
      }
        // cập nhật trạng thái ghế
      await updateSeatStt({
        tripId: tripInfo._id,
        seatNumber,
        status: SEAT_STATUS.SOLD,
      });
        let discount = null;
      if (discountCode) {
        discount = await Promotion.findOne({ code: discountCode }).exec();
        if (!discount) {
          return res.status(404).json({ message: "Mã giảm giá không tồn tại" });
        }
          // Kiểm tra trạng thái mã giảm giá
        if (discount.status === PROMOTIONT_STATUS.EXPIRED) {
          return res.status(400).json({ message: "Mã giảm giá đã hết hạn" });
        }
          // Tính giảm giá
        if (discount.discountType === DISCOUNT_TYPE.AMOUNT) {
          totalAmount -= discount.discountAmount;
        } else {
          const decreasePrice = (totalAmount * discount.discountAmount) / 100;
          totalAmount -= decreasePrice;
        }
          totalAmount = totalAmount >= 0 ? totalAmount : 0;
      }
        const ticket = await new Tickets({
        user,
        customerPhone,
        customerName,
        note,
        trip,
        code,
        seatNumber,
        boardingPoint,
        dropOffPoint,
        status,
        totalAmount,
      }).save();
        // mã giảm giá
      if (discountCode) {
        await new PromotionUsage({
          user,
          ticket: ticket._id,
          promotion: discount._id,
        }).save();
          if (discount.remainingCount > 0) {
          discount.remainingCount -= 1;
          await discount.save();
        } else {
          return res
            .status(400)
            .json({ message: "Mã giảm giá đã hết lượt sử dụng" });
        }
      }
        // Đặt timeout 10 phút
      setTimeout(async () => {
        const ticketInfo = await Tickets.findById(ticket._id).exec();
          if (ticketInfo.status === TICKET_STATUS.PENDING) {
          ticketInfo.status = TICKET_STATUS.CANCELED;
          await ticketInfo.save();
            await updateSeatStt({
            tripId: tripInfo._id,
            seatNumber,
            status: SEAT_STATUS.EMPTY,
          });
            if (discountCode) {
            const discount = await Promotion.findOne({
              code: discountCode,
            }).exec();
            if (discount) {
              discount.remainingCount += 1;
              await discount.save();
            }
          }
        }
      }, 10 * 60 * 1000);
        // Lấy thông tin chi tiết vé
      const ticketInfo = await Tickets.findById(ticket._id)
        .populate({
          path: "trip",
          populate: {
            path: "bus route",
          },
        })
        .exec();
        // Bổ sung dữ liệu từ Promotion
      res.json({
        message: "Create ticket successfully",
        ticket: ticketInfo,
        discount: discount
          ? {
              code: discount.code,
              discountType: discount.discountType,
              discountAmount: discount.discountAmount,
              remainingCount: discount.remainingCount,
              status: discount.status,
            }
          : null,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi tạo vé",
        error: error.message,
      });
    }
  }, */
  //  Thêm trường

  /* 13/12 */

  /* createTicket: async (req, res) => {
    try {
      const {
        customerPhone,
        customerName,
        note,
        trip,
        seatNumber,
        boardingPoint,
        dropOffPoint,
        status,
        discountCode,
      } = req.body;
        // Kiểm tra thông tin các trường bắt buộc
      if (!customerPhone || !customerName || !boardingPoint || !dropOffPoint) {
        return res.status(400).json({
          message: "Vui lòng nhập đầy đủ thông tin yêu cầu.",
        });
      }
        const user = req.user.id;
        let code;
      // Hàm tạo mã vé duy nhất
      const generateUniqueCode = async () => {
        const randomLetters = () => {
          const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Bảng chữ cái
          return (
            letters.charAt(Math.floor(Math.random() * letters.length)) +
            letters.charAt(Math.floor(Math.random() * letters.length))
          ); // Lấy 2 chữ cái ngẫu nhiên
        };
          // Lấy ngày, tháng, năm hiện tại (2 số cuối của năm)
        const today = dayjs();
        const datePart =
          today.format("DDMM") + today.year().toString().slice(-2); // Lấy ngày, tháng và 2 số cuối năm
          let newCode = `${randomLetters()}${datePart}- ${randomNumber(5)}`; // Tạo mã với ngày tháng năm (2 số cuối năm), 2 chữ cái và số ngẫu nhiên
        const existingTicket = await Tickets.findOne({ code: newCode }).exec();
        if (existingTicket) {
          return generateUniqueCode(); // Tạo lại mã nếu mã đã tồn tại
        }
        return newCode;
      };
      // Tạo mã vé duy nhất
      code = await generateUniqueCode();
        // kiểm tra thông tin chuyến xe
      const tripInfo = await Trip.findById(trip).populate("bus route").exec();
      if (!tripInfo) {
        return res.status(404).json({
          message: "Chuyến xe không tồn tại",
        });
      }
        if (dayjs().isAfter(tripInfo.departureTime)) {
        return res.status(400).json({
          message: "Chuyến xe đã khởi hành",
        });
      }
        let totalAmount = tripInfo.price * seatNumber.length;
        // kiểm tra trạng thái ghế
      for await (let seat of seatNumber) {
        const seatInfo = await Seats.findOne({
          seatNumber: seat,
          trip: tripInfo._id,
        }).exec();
          if (!seatInfo) {
          return res.status(404).json({
            message: "Không tìm thấy ghế",
          });
        }
          if (seatInfo.status === SEAT_STATUS.SOLD) {
          return res.status(406).json({
            message: `Ghế ${seat} đã có người đặt`,
          });
        }
      }
        // cập nhật trạng thái ghế
      await updateSeatStt({
        tripId: tripInfo._id,
        seatNumber,
        status: SEAT_STATUS.SOLD,
      });
        let discount;
      if (discountCode) {
        discount = await Promotion.findOne({ code: discountCode }).exec();
        if (!discount) {
          return res.status(404).json({ message: "Mã giảm giá không tồn tại" });
        }
          // Kiểm tra trạng thái mã giảm giá
        if (discount.status === PROMOTIONT_STATUS.EXPIRED) {
          return res.status(400).json({ message: "Mã giảm giá đã hết hạn" });
        }
          // Tính giảm giá
        if (discount.discountType === DISCOUNT_TYPE.AMOUNT) {
          totalAmount -= discount.discountAmount;
        } else {
          const decreasePrice = (totalAmount * discount.discountAmount) / 100;
          totalAmount -= decreasePrice;
        }
          totalAmount = totalAmount >= 0 ? totalAmount : 0;
      }
        const ticket = await new Tickets({
        user,
        customerPhone,
        customerName,
        note,
        trip,
        code,
        seatNumber,
        boardingPoint,
        dropOffPoint,
        status,
        totalAmount,
        promotion: discount ? discount._id : null, // Lưu mã giảm giá vào trường promotion
      }).save();
        // mã giảm giá
      if (discountCode) {
        await new PromotionUsage({
          user,
          ticket: ticket._id,
          promotion: discount._id,
        }).save();
          // Cập nhật remainingCount
        if (discount.remainingCount > 0) {
          discount.remainingCount -= 1;
          await discount.save();
        } else {
          return res
            .status(400)
            .json({ message: "Mã giảm giá đã hết lượt sử dụng" });
        }
      }
        // Đặt timeout 10 phút
      setTimeout(async () => {
        const ticketInfo = await Tickets.findById(ticket._id).exec();
          if (ticketInfo.status === TICKET_STATUS.PENDING) {
          ticketInfo.status = TICKET_STATUS.CANCELED;
          await ticketInfo.save();
            await updateSeatStt({
            tripId: tripInfo._id,
            seatNumber,
            status: SEAT_STATUS.EMPTY,
          });
        }
      }, 10 * 60 * 1000);
      // Lấy thông tin chi tiết vé, bao gồm thông tin mã giảm giá
      const ticketInfo = await Tickets.findById(ticket._id)
        .populate({
          path: "trip",
          populate: {
            path: "bus route",
          },
        })
        .populate("promotion") // Populates information from the Promotion model
        .exec();
        res.json({
        message: "Create ticket successfully",
        ticket: ticketInfo,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi tạo vé",
        error: error.message,
      });
    }
  }, */

  /* 14/12 */
  createTicket: function createTicket(req, res) {
    var _req$body, customerPhone, customerName, note, trip, seatNumber, boardingPoint, dropOffPoint, status, discountCode, user, code, generateUniqueCode, tripInfo, totalAmount, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, seat, seatInfo, discount, decreasePrice, ticket, ticketInfo;

    return regeneratorRuntime.async(function createTicket$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$body = req.body, customerPhone = _req$body.customerPhone, customerName = _req$body.customerName, note = _req$body.note, trip = _req$body.trip, seatNumber = _req$body.seatNumber, boardingPoint = _req$body.boardingPoint, dropOffPoint = _req$body.dropOffPoint, status = _req$body.status, discountCode = _req$body.discountCode; // Kiểm tra thông tin các trường bắt buộc

            if (!(!customerPhone || !customerName || !boardingPoint || !dropOffPoint)) {
              _context6.next = 4;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              message: "Vui lòng nhập đầy đủ thông tin yêu cầu."
            }));

          case 4:
            user = req.user.id;

            // Hàm tạo mã vé duy nhất
            generateUniqueCode = function generateUniqueCode() {
              var randomLetters, today, datePart, newCode, existingTicket;
              return regeneratorRuntime.async(function generateUniqueCode$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      randomLetters = function randomLetters() {
                        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                        return letters.charAt(Math.floor(Math.random() * letters.length)) + letters.charAt(Math.floor(Math.random() * letters.length));
                      };

                      today = (0, _dayjs["default"])();
                      datePart = today.format("DDMM") + today.year().toString().slice(-2);
                      newCode = "".concat(randomLetters()).concat(datePart, "-").concat((0, _randomNumber["default"])(5));
                      _context4.next = 6;
                      return regeneratorRuntime.awrap(_tickets["default"].findOne({
                        code: newCode
                      }).exec());

                    case 6:
                      existingTicket = _context4.sent;

                      if (!existingTicket) {
                        _context4.next = 9;
                        break;
                      }

                      return _context4.abrupt("return", generateUniqueCode());

                    case 9:
                      return _context4.abrupt("return", newCode);

                    case 10:
                    case "end":
                      return _context4.stop();
                  }
                }
              });
            };

            _context6.next = 8;
            return regeneratorRuntime.awrap(generateUniqueCode());

          case 8:
            code = _context6.sent;
            _context6.next = 11;
            return regeneratorRuntime.awrap(_trips["default"].findById(trip).populate("bus route").exec());

          case 11:
            tripInfo = _context6.sent;

            if (tripInfo) {
              _context6.next = 14;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "Chuyến xe không tồn tại"
            }));

          case 14:
            if (!(0, _dayjs["default"])().isAfter(tripInfo.departureTime)) {
              _context6.next = 16;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              message: "Chuyến xe đã khởi hành"
            }));

          case 16:
            totalAmount = tripInfo.price * seatNumber.length; // kiểm tra trạng thái ghế

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context6.prev = 19;
            _iterator = _asyncIterator(seatNumber);

          case 21:
            _context6.next = 23;
            return regeneratorRuntime.awrap(_iterator.next());

          case 23:
            _step = _context6.sent;
            _iteratorNormalCompletion = _step.done;
            _context6.next = 27;
            return regeneratorRuntime.awrap(_step.value);

          case 27:
            _value = _context6.sent;

            if (_iteratorNormalCompletion) {
              _context6.next = 40;
              break;
            }

            seat = _value;
            _context6.next = 32;
            return regeneratorRuntime.awrap(_seats["default"].findOne({
              seatNumber: seat,
              trip: tripInfo._id
            }).exec());

          case 32:
            seatInfo = _context6.sent;

            if (seatInfo) {
              _context6.next = 35;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "Không tìm thấy ghế"
            }));

          case 35:
            if (!(seatInfo.status === _index.SEAT_STATUS.SOLD)) {
              _context6.next = 37;
              break;
            }

            return _context6.abrupt("return", res.status(406).json({
              message: "Gh\u1EBF ".concat(seat, " \u0111\xE3 c\xF3 ng\u01B0\u1EDDi \u0111\u1EB7t")
            }));

          case 37:
            _iteratorNormalCompletion = true;
            _context6.next = 21;
            break;

          case 40:
            _context6.next = 46;
            break;

          case 42:
            _context6.prev = 42;
            _context6.t0 = _context6["catch"](19);
            _didIteratorError = true;
            _iteratorError = _context6.t0;

          case 46:
            _context6.prev = 46;
            _context6.prev = 47;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context6.next = 51;
              break;
            }

            _context6.next = 51;
            return regeneratorRuntime.awrap(_iterator["return"]());

          case 51:
            _context6.prev = 51;

            if (!_didIteratorError) {
              _context6.next = 54;
              break;
            }

            throw _iteratorError;

          case 54:
            return _context6.finish(51);

          case 55:
            return _context6.finish(46);

          case 56:
            _context6.next = 58;
            return regeneratorRuntime.awrap(updateSeatStt({
              tripId: tripInfo._id,
              seatNumber: seatNumber,
              status: _index.SEAT_STATUS.SOLD
            }));

          case 58:
            if (!discountCode) {
              _context6.next = 68;
              break;
            }

            _context6.next = 61;
            return regeneratorRuntime.awrap(_promotion["default"].findOne({
              code: discountCode
            }).exec());

          case 61:
            discount = _context6.sent;

            if (discount) {
              _context6.next = 64;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "Mã giảm giá không tồn tại"
            }));

          case 64:
            if (!(discount.status === _index.PROMOTIONT_STATUS.EXPIRED)) {
              _context6.next = 66;
              break;
            }

            return _context6.abrupt("return", res.status(400).json({
              message: "Mã giảm giá đã hết hạn"
            }));

          case 66:
            if (discount.discountType === _index.DISCOUNT_TYPE.AMOUNT) {
              totalAmount -= discount.discountAmount;
            } else {
              decreasePrice = totalAmount * discount.discountAmount / 100;
              totalAmount -= decreasePrice;
            }

            totalAmount = totalAmount >= 0 ? totalAmount : 0;

          case 68:
            _context6.next = 70;
            return regeneratorRuntime.awrap(new _tickets["default"]({
              user: user,
              customerPhone: customerPhone,
              customerName: customerName,
              note: note,
              trip: trip,
              code: code,
              seatNumber: seatNumber,
              boardingPoint: boardingPoint,
              dropOffPoint: dropOffPoint,
              status: status,
              totalAmount: totalAmount,
              promotion: discount ? discount._id : null
            }).save());

          case 70:
            ticket = _context6.sent;

            if (!discountCode) {
              _context6.next = 81;
              break;
            }

            _context6.next = 74;
            return regeneratorRuntime.awrap(new _promotion.PromotionUsage({
              user: user,
              ticket: ticket._id,
              promotion: discount._id
            }).save());

          case 74:
            if (!(discount.remainingCount > 0)) {
              _context6.next = 80;
              break;
            }

            discount.remainingCount -= 1;
            _context6.next = 78;
            return regeneratorRuntime.awrap(discount.save());

          case 78:
            _context6.next = 81;
            break;

          case 80:
            return _context6.abrupt("return", res.status(400).json({
              message: "Mã giảm giá đã hết lượt sử dụng"
            }));

          case 81:
            // Đặt timeout 10 phút
            setTimeout(function _callee() {
              var ticketInfo;
              return regeneratorRuntime.async(function _callee$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return regeneratorRuntime.awrap(_tickets["default"].findById(ticket._id).exec());

                    case 2:
                      ticketInfo = _context5.sent;

                      if (!(ticketInfo.status === _index.TICKET_STATUS.PENDING)) {
                        _context5.next = 6;
                        break;
                      }

                      _context5.next = 6;
                      return regeneratorRuntime.awrap(ticketUpdateStt({
                        ticketId: ticket._id,
                        status: _index.TICKET_STATUS.CANCELED
                      }));

                    case 6:
                    case "end":
                      return _context5.stop();
                  }
                }
              });
            }, 10 * 60 * 1000);
            _context6.next = 84;
            return regeneratorRuntime.awrap(_tickets["default"].findById(ticket._id).populate({
              path: "trip",
              populate: {
                path: "bus route"
              }
            }).populate("promotion").exec());

          case 84:
            ticketInfo = _context6.sent;
            res.json({
              message: "Create ticket successfully",
              ticket: ticketInfo
            });
            _context6.next = 91;
            break;

          case 88:
            _context6.prev = 88;
            _context6.t1 = _context6["catch"](0);
            res.status(500).json({
              message: "Lỗi tạo vé",
              error: _context6.t1.message
            });

          case 91:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 88], [19, 42, 46, 56], [47,, 51, 55]]);
  },

  /* getTickets: async (req, res) => {
    try {
      const {
        page = PAGINATION.PAGE,
        limit = PAGINATION.LIMIT,
        status,
      } = req.query;
        // Tạo đối tượng điều kiện truy vấn cho vé
      let query = {};
        // Nếu có status, thêm điều kiện lọc vào query
      if (status) {
        query.status = status;
      }
        // Lấy danh sách vé, trang hiện tại và tổng số trang từ getListTicket
      const { tickets, currentPage, totalPage } = await getListTicket(
        page,
        limit,
        query // Truy vấn với điều kiện lọc theo status
      );
        // Truy vấn thêm thông tin từ bảng BusRoutes dựa trên route_id của từng vé
      const ticketsWithRoute = await Promise.all(
        tickets.map(async (ticket) => {
          // Lấy thông tin chuyến đi từ bảng Trip, giả sử mỗi vé có trip_id
          const trip = await Trip.findById(ticket.trip);
            // Kiểm tra xem trip có chứa route_id không
          if (trip && trip.route) {
            // Truy vấn bảng BusRoutes để lấy thông tin về tuyến xe từ route_id
            const busRoute = await BusRoutes.findById(trip.route);
            return {
              ...ticket.toObject(), // Bao gồm tất cả các dữ liệu từ ticket
              busRoute: busRoute || null, // Thêm dữ liệu về tuyến xe vào mỗi vé
            };
          }
          return ticket;
        })
      );
        // Trả về kết quả với dữ liệu về tuyến xe (busRoute) đã được thêm vào
      res.json({
        data: ticketsWithRoute,
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
  */
  // 12/12

  /* getTickets: async (req, res) => {
    try {
      const {
        page = PAGINATION.PAGE,
        limit = PAGINATION.LIMIT,
        status,
      } = req.query;
        // Tạo đối tượng điều kiện truy vấn cho vé
      let query = {};
        // Nếu có status, thêm điều kiện lọc vào query
      if (status) {
        query.status = status;
      }
        // Lấy danh sách vé, trang hiện tại và tổng số trang từ getListTicket
      const { tickets, currentPage, totalPage } = await getListTicket(
        page,
        limit,
        query // Truy vấn với điều kiện lọc theo status
      );
        // Truy vấn thêm thông tin từ bảng BusRoutes và Promotion
      const ticketsWithRouteAndPromotion = await Promise.all(
        tickets.map(async (ticket) => {
          // Lấy thông tin chuyến đi từ bảng Trip, giả sử mỗi vé có trip_id
          const trip = await Trip.findById(ticket.trip);
            // Kiểm tra xem trip có chứa route_id không
          if (trip && trip.route) {
            // Truy vấn bảng BusRoutes để lấy thông tin về tuyến xe từ route_id
            const busRoute = await BusRoutes.findById(trip.route);
              // Truy vấn bảng Promotion để lấy thông tin về khuyến mãi từ trường promotion
            const promotion = ticket.promotion
              ? await Promotion.findById(ticket.promotion)
              : null;
              return {
              ...ticket.toObject(), // Bao gồm tất cả các dữ liệu từ ticket
              busRoute: busRoute || null, // Thêm dữ liệu về tuyến xe vào mỗi vé
              promotion: promotion || null, // Thêm thông tin khuyến mãi vào mỗi vé
            };
          }
          return ticket;
        })
      );
        // Trả về kết quả với dữ liệu về tuyến xe (busRoute) và khuyến mãi (promotion) đã được thêm vào
      res.json({
        data: ticketsWithRouteAndPromotion,
        totalPage,
        currentPage,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */
  // 14/12
  getTickets: function getTickets(req, res) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, status, currentTime, query, _ref3, tickets, currentPage, totalPage, ticketsWithRouteAndPromotion;

    return regeneratorRuntime.async(function getTickets$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? _index.PAGINATION.PAGE : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? _index.PAGINATION.LIMIT : _req$query$limit, status = _req$query.status; // Lấy thời gian hiện tại

            currentTime = new Date(); // Tạo đối tượng điều kiện truy vấn cho vé

            query = {}; // Nếu có status, thêm điều kiện lọc vào query

            if (status) {
              query.status = status;
            } // Lấy danh sách vé, trang hiện tại và tổng số trang từ getListTicket


            _context8.next = 7;
            return regeneratorRuntime.awrap(getListTicket(page, limit, query // Truy vấn với điều kiện lọc theo status
            ));

          case 7:
            _ref3 = _context8.sent;
            tickets = _ref3.tickets;
            currentPage = _ref3.currentPage;
            totalPage = _ref3.totalPage;
            _context8.next = 13;
            return regeneratorRuntime.awrap(Promise.all(tickets.map(function _callee2(ticket) {
              var trip, departureTime, timeDifference, discount, busRoute, promotion;
              return regeneratorRuntime.async(function _callee2$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return regeneratorRuntime.awrap(_trips["default"].findById(ticket.trip));

                    case 2:
                      trip = _context7.sent;

                      if (!(trip && trip.departureTime)) {
                        _context7.next = 20;
                        break;
                      }

                      departureTime = new Date(trip.departureTime); // So sánh thời gian hiện tại với departureTime

                      timeDifference = departureTime - currentTime; // Nếu thời gian còn cách departureTime ít hơn 30 phút và trạng thái vé là PAYMENTPENDING hoặc PENDING

                      if (!(timeDifference < 30 * 60 * 1000 && (ticket.status === _index.TICKET_STATUS.PAYMENTPENDING || ticket.status === _index.TICKET_STATUS.PENDING))) {
                        _context7.next = 20;
                        break;
                      }

                      _context7.next = 9;
                      return regeneratorRuntime.awrap(ticketUpdateStt({
                        ticketId: ticket._id,
                        status: _index.TICKET_STATUS.CANCELED
                      }));

                    case 9:
                      if (!ticket.promotion) {
                        _context7.next = 20;
                        break;
                      }

                      _context7.next = 12;
                      return regeneratorRuntime.awrap(_promotion["default"].findById(ticket.promotion));

                    case 12:
                      discount = _context7.sent;

                      if (!(discount && discount.remainingCount > 0)) {
                        _context7.next = 19;
                        break;
                      }

                      discount.remainingCount += 1;
                      _context7.next = 17;
                      return regeneratorRuntime.awrap(discount.save());

                    case 17:
                      _context7.next = 20;
                      break;

                    case 19:
                      return _context7.abrupt("return", res.status(400).json({
                        message: "Mã giảm giá đã hết lượt sử dụng"
                      }));

                    case 20:
                      if (!(trip && trip.route)) {
                        _context7.next = 26;
                        break;
                      }

                      _context7.next = 23;
                      return regeneratorRuntime.awrap(_busRoutes["default"].findById(trip.route));

                    case 23:
                      _context7.t0 = _context7.sent;
                      _context7.next = 27;
                      break;

                    case 26:
                      _context7.t0 = null;

                    case 27:
                      busRoute = _context7.t0;

                      if (!ticket.promotion) {
                        _context7.next = 34;
                        break;
                      }

                      _context7.next = 31;
                      return regeneratorRuntime.awrap(_promotion["default"].findById(ticket.promotion));

                    case 31:
                      _context7.t1 = _context7.sent;
                      _context7.next = 35;
                      break;

                    case 34:
                      _context7.t1 = null;

                    case 35:
                      promotion = _context7.t1;
                      return _context7.abrupt("return", _objectSpread({}, ticket.toObject(), {
                        // Bao gồm tất cả các dữ liệu từ ticket
                        busRoute: busRoute || null,
                        // Thêm dữ liệu về tuyến xe vào mỗi vé
                        promotion: promotion || null // Thêm thông tin khuyến mãi vào mỗi vé

                      }));

                    case 37:
                    case "end":
                      return _context7.stop();
                  }
                }
              });
            })));

          case 13:
            ticketsWithRouteAndPromotion = _context8.sent;
            // Trả về kết quả với dữ liệu về tuyến xe (busRoute) và khuyến mãi (promotion) đã được thêm vào
            res.json({
              data: ticketsWithRouteAndPromotion,
              totalPage: totalPage,
              currentPage: currentPage
            });
            _context8.next = 20;
            break;

          case 17:
            _context8.prev = 17;
            _context8.t0 = _context8["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context8.t0.message
            });

          case 20:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[0, 17]]);
  },
  getMyTickets: function getMyTickets(req, res) {
    var _req$query2, _req$query2$page, page, _req$query2$limit, limit, queryObj, _ref4, tickets, currentPage, totalPage, ticketsWithRoute;

    return regeneratorRuntime.async(function getMyTickets$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _req$query2 = req.query, _req$query2$page = _req$query2.page, page = _req$query2$page === void 0 ? _index.PAGINATION.PAGE : _req$query2$page, _req$query2$limit = _req$query2.limit, limit = _req$query2$limit === void 0 ? _index.PAGINATION.LIMIT : _req$query2$limit;
            queryObj = {
              user: req.user.id
            };
            _context10.next = 5;
            return regeneratorRuntime.awrap(getListTicket(page, limit, queryObj));

          case 5:
            _ref4 = _context10.sent;
            tickets = _ref4.tickets;
            currentPage = _ref4.currentPage;
            totalPage = _ref4.totalPage;
            _context10.next = 11;
            return regeneratorRuntime.awrap(Promise.all(tickets.map(function _callee3(ticket) {
              var trip, busRoute;
              return regeneratorRuntime.async(function _callee3$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return regeneratorRuntime.awrap(_trips["default"].findById(ticket.trip));

                    case 2:
                      trip = _context9.sent;

                      if (!(trip && trip.route)) {
                        _context9.next = 8;
                        break;
                      }

                      _context9.next = 6;
                      return regeneratorRuntime.awrap(_busRoutes["default"].findById(trip.route));

                    case 6:
                      busRoute = _context9.sent;
                      return _context9.abrupt("return", _objectSpread({}, ticket.toObject(), {
                        // Bao gồm tất cả các dữ liệu từ ticket
                        busRoute: busRoute || null // Thêm dữ liệu về tuyến xe vào mỗi vé

                      }));

                    case 8:
                      return _context9.abrupt("return", ticket);

                    case 9:
                    case "end":
                      return _context9.stop();
                  }
                }
              });
            })));

          case 11:
            ticketsWithRoute = _context10.sent;
            res.json({
              data: ticketsWithRoute,
              totalPage: totalPage,
              currentPage: currentPage
            });
            _context10.next = 18;
            break;

          case 15:
            _context10.prev = 15;
            _context10.t0 = _context10["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context10.t0.message
            });

          case 18:
          case "end":
            return _context10.stop();
        }
      }
    }, null, null, [[0, 15]]);
  },
  getTicket: function getTicket(req, res) {
    var id, ticket, promotion, promotionUsage, trip, route, bus;
    return regeneratorRuntime.async(function getTicket$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            id = req.params.id; // Tìm vé theo id và populate thông tin người dùng và chuyến xe

            _context11.next = 4;
            return regeneratorRuntime.awrap(_tickets["default"].findById(id).populate(["user", "trip"]) // Đảm bảo lấy thông tin chuyến xe
            .exec());

          case 4:
            ticket = _context11.sent;

            if (ticket) {
              _context11.next = 7;
              break;
            }

            return _context11.abrupt("return", res.status(404).json({
              message: "Ticket not found"
            }));

          case 7:
            // Lấy thông tin khuyến mãi nếu có
            promotion = null;
            _context11.next = 10;
            return regeneratorRuntime.awrap(_promotion.PromotionUsage.findOne({
              ticket: ticket._id
            }).exec());

          case 10:
            promotionUsage = _context11.sent;

            if (!promotionUsage) {
              _context11.next = 15;
              break;
            }

            _context11.next = 14;
            return regeneratorRuntime.awrap(_promotion["default"].findById(promotionUsage.promotion).exec());

          case 14:
            promotion = _context11.sent;

          case 15:
            // Lấy thông tin về chuyến xe từ bảng Trip
            trip = ticket.trip; // Chúng ta đã populate trip trong ticket

            if (trip) {
              _context11.next = 18;
              break;
            }

            return _context11.abrupt("return", res.status(404).json({
              message: "Trip not found for this ticket"
            }));

          case 18:
            // Nếu route là một tham chiếu tới bảng BusRoutes, ta populate thêm thông tin tuyến xe
            route = trip.route; // Lấy thông tin tuyến từ trip

            if (!(_typeof(route) === "object" && route._id)) {
              _context11.next = 23;
              break;
            }

            _context11.next = 22;
            return regeneratorRuntime.awrap(_busRoutes["default"].findById(route._id).exec());

          case 22:
            route = _context11.sent;

          case 23:
            _context11.next = 25;
            return regeneratorRuntime.awrap(_bus["default"].findById(trip.bus).exec());

          case 25:
            bus = _context11.sent;

            if (bus) {
              _context11.next = 28;
              break;
            }

            return _context11.abrupt("return", res.status(404).json({
              message: "Bus not found for this trip"
            }));

          case 28:
            // Trả về thông tin vé, chuyến xe, xe và người lái xe
            res.json(_objectSpread({}, ticket.toJSON(), {
              trip: {
                id: trip._id,
                route: route ? {
                  startProvince: route.startProvince,
                  startDistrict: route.startDistrict,
                  endProvince: route.endProvince,
                  endDistrict: route.endDistrict,
                  duration: route.duration,
                  status: route.status,
                  distance: route.distance,
                  pricePerKM: route.pricePerKM
                } : trip.route,
                // Trả về toàn bộ thông tin của tuyến nếu có
                departureTime: trip.departureTime,
                // Thời gian khởi hành
                arrivalTime: trip.arrivalTime,
                // Thời gian đến
                price: trip.price // Giá vé của chuyến xe

              },
              bus: {
                id: bus._id,
                busType: bus.busType,
                // Loại xe
                licensePlate: bus.licensePlate,
                // Biển số xe
                driver: bus.driver // Thông tin người lái xe

              },
              promotion: promotion
            }));
            _context11.next = 34;
            break;

          case 31:
            _context11.prev = 31;
            _context11.t0 = _context11["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context11.t0.message
            });

          case 34:
          case "end":
            return _context11.stop();
        }
      }
    }, null, null, [[0, 31]]);
  },
  updateTicketPaymentMethod: function updateTicketPaymentMethod(req, res) {
    var id, paymentMethod, ticketInfo, orderInfo, zpUrl;
    return regeneratorRuntime.async(function updateTicketPaymentMethod$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            id = req.params.id; // ID của vé

            paymentMethod = req.body.paymentMethod; // Phương thức thanh toán do người dùng nhập
            // Kiểm tra paymentMethod có hợp lệ không

            if ([_index.PAYMENT_METHOD.ZALOPAY, _index.PAYMENT_METHOD.OFFLINEPAYMENT].includes(paymentMethod)) {
              _context12.next = 5;
              break;
            }

            return _context12.abrupt("return", res.status(400).json({
              message: "Phương thức thanh toán không hợp lệ. Chỉ chấp nhận 'ZALOPAY' hoặc 'OFFLINEPAYMENT'."
            }));

          case 5:
            _context12.next = 7;
            return regeneratorRuntime.awrap(_tickets["default"].findById(id).exec());

          case 7:
            ticketInfo = _context12.sent;

            if (ticketInfo) {
              _context12.next = 10;
              break;
            }

            return _context12.abrupt("return", res.status(404).json({
              message: "Không tìm thấy vé với ID đã cung cấp."
            }));

          case 10:
            // Cập nhật paymentMethod trong vé
            ticketInfo.paymentMethod = paymentMethod; // Nếu người dùng chọn ZALOPAY, thực hiện tạo liên kết thanh toán

            if (!(paymentMethod === _index.PAYMENT_METHOD.ZALOPAY)) {
              _context12.next = 22;
              break;
            }

            // Lấy thông tin đơn hàng từ vé
            orderInfo = "BOOKING_".concat(ticketInfo._id); // Tạo token thanh toán từ ZaloPay

            _context12.next = 15;
            return regeneratorRuntime.awrap((0, _zalopayService.createPaymentToken)(orderInfo, ticketInfo.totalAmount));

          case 15:
            zpUrl = _context12.sent;
            // Cập nhật trạng thái vé là đã xác nhận thanh toán và trả về thông tin ZaloPay
            ticketInfo.invoiceCode = zpUrl.appTransId;
            _context12.next = 19;
            return regeneratorRuntime.awrap(ticketInfo.save());

          case 19:
            return _context12.abrupt("return", res.json(zpUrl));

          case 22:
            ticketInfo.status = _index.TICKET_STATUS.PAYMENTPENDING; // Đánh dấu là chờ thanh toán với PAYMENTPENDING

            _context12.next = 25;
            return regeneratorRuntime.awrap(ticketInfo.save());

          case 25:
            res.json({
              message: "Cập nhật phương thức thanh toán thành công.",
              ticketInfo: ticketInfo
            });
            _context12.next = 31;
            break;

          case 28:
            _context12.prev = 28;
            _context12.t0 = _context12["catch"](0);
            res.status(500).json({
              message: "Đã xảy ra lỗi trong quá trình cập nhật phương thức thanh toán.",
              error: _context12.t0.message
            });

          case 31:
          case "end":
            return _context12.stop();
        }
      }
    }, null, null, [[0, 28]]);
  },
  updateTicketStatus: function updateTicketStatus(req, res) {
    var user, id, status, ticketInfo, tripInfo, userRole, isGTE5h, ticket;
    return regeneratorRuntime.async(function updateTicketStatus$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            user = req.user;
            id = req.params.id;
            status = req.body.status;
            _context13.next = 6;
            return regeneratorRuntime.awrap(_tickets["default"].findById(id).exec());

          case 6:
            ticketInfo = _context13.sent;
            _context13.next = 9;
            return regeneratorRuntime.awrap(_trips["default"].findById(ticketInfo.trip).exec());

          case 9:
            tripInfo = _context13.sent;
            _context13.next = 12;
            return regeneratorRuntime.awrap(_permissions["default"].findOne({
              user: user.id
            }).exec());

          case 12:
            userRole = _context13.sent;
            isGTE5h = Math.floor((0, _dayjs["default"])(tripInfo.departureTime).diff((0, _dayjs["default"])()) / (1000 * 60 * 60) % 24) >= 5;

            if (!(userRole === _index.ROLE.CUSTOMER && status === _index.TICKET_STATUS.CANCELED && !isGTE5h)) {
              _context13.next = 16;
              break;
            }

            return _context13.abrupt("return", res.status(400).json({
              message: "Bạn chỉ có thể huỷ vé trước khi chuyến xe xuất phát 5h"
            }));

          case 16:
            _context13.next = 18;
            return regeneratorRuntime.awrap(ticketUpdateStt({
              ticketId: id,
              status: status
            }));

          case 18:
            ticket = _context13.sent;
            res.json(ticket);
            _context13.next = 25;
            break;

          case 22:
            _context13.prev = 22;
            _context13.t0 = _context13["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context13.t0.message
            });

          case 25:
          case "end":
            return _context13.stop();
        }
      }
    }, null, null, [[0, 22]]);
  },
  createPaymentUrl: function createPaymentUrl(req, res) {
    var ticketId, ticket, ipAddr, orderId, paymentUrl;
    return regeneratorRuntime.async(function createPaymentUrl$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            ticketId = req.body.ticketId;
            _context14.next = 4;
            return regeneratorRuntime.awrap(_tickets["default"].findById(ticketId).exec());

          case 4:
            ticket = _context14.sent;

            if (ticket) {
              _context14.next = 7;
              break;
            }

            return _context14.abrupt("return", res.status(404).json({
              message: "Không tìm thấy vé"
            }));

          case 7:
            ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
            orderId = "BOOKING_".concat(ticket._id);
            _context14.next = 11;
            return regeneratorRuntime.awrap((0, _payment["default"])({
              ipAddr: ipAddr,
              orderId: orderId,
              amount: ticket.totalAmount,
              orderInfo: "Thanh toan ve xe ".concat(orderId)
            }));

          case 11:
            paymentUrl = _context14.sent;
            res.json(paymentUrl);
            _context14.next = 18;
            break;

          case 15:
            _context14.prev = 15;
            _context14.t0 = _context14["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context14.t0.message
            });

          case 18:
          case "end":
            return _context14.stop();
        }
      }
    }, null, null, [[0, 15]]);
  },

  /*  createzalopaypaymentUrl: async (req, res) => {
    try {
      // Lấy ticketId từ body request
      const { ticketId } = req.body;
        // Tìm vé trong cơ sở dữ liệu
      const ticket = await Tickets.findById(ticketId).exec();
      if (!ticket) {
        return res.status(404).json({ message: "Không tìm thấy vé" });
      }
      // Lấy thông tin đơn hàng từ vé
      const orderInfo = `BOOKING_${ticket._id}`;
      // Tạo token thanh toán từ ZaloPay
      const zpUrl = await createPaymentToken(orderInfo, ticket.totalAmount);
      // Trả về phản hồi đầy đủ trong body
      res.json(zpUrl); // Trả về thông tin ZaloPay trả về, bao gồm appTransId
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }, */

  /* callbackPay: async (req, res) => {
    let result = {};
      try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;
        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
      console.log("mac =", mac);
        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = "mac not equal";
      } else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng
        let dataJson = JSON.parse(dataStr, config.key2);
        console.log(
          "update order's status = success where app_trans_id =",
          dataJson["app_trans_id"]
        );
        result.return_code = 1;
        result.return_message = "success";
      }
    } catch (ex) {
      result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.return_message = ex.message;
    }
      // thông báo kết quả cho ZaloPay server
    res.json(result);
    const data = req.query;
    console.log("Dữ liệu từ query string:", data);
  }, */
  callbackPay: function callbackPay(req, res) {
    var result, dataStr, reqMac, mac, dataJson, appTransId, ticketInfo, data;
    return regeneratorRuntime.async(function callbackPay$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            // update 27/11
            result = {};
            _context15.prev = 1;
            // Lấy dữ liệu từ callback
            dataStr = req.body.data;
            reqMac = req.body.mac; // Tính lại MAC để kiểm tra tính hợp lệ

            mac = _cryptoJs["default"].HmacSHA256(dataStr, _zalopay["default"].key2).toString();
            console.log("mac =", mac); // Kiểm tra callback có hợp lệ hay không

            if (!(reqMac !== mac)) {
              _context15.next = 11;
              break;
            }

            // Callback không hợp lệ
            result.return_code = -1;
            result.return_message = "mac not equal";
            _context15.next = 29;
            break;

          case 11:
            // Parse dữ liệu callback
            dataJson = JSON.parse(dataStr); // Lấy app_trans_id từ callback

            appTransId = dataJson["app_trans_id"];
            console.log("app_trans_id =", appTransId); // Tìm vé dựa trên app_trans_id

            _context15.next = 16;
            return regeneratorRuntime.awrap(_tickets["default"].findOne({
              invoiceCode: appTransId
            }).exec());

          case 16:
            ticketInfo = _context15.sent;

            if (ticketInfo) {
              _context15.next = 23;
              break;
            }

            // Không tìm thấy vé, trả về lỗi
            console.log("Ticket not found for app_trans_id =", appTransId);
            result.return_code = 0;
            result.return_message = "Ticket not found";
            _context15.next = 29;
            break;

          case 23:
            // Cập nhật trạng thái vé
            ticketInfo.status = _index.TICKET_STATUS.PAID;
            _context15.next = 26;
            return regeneratorRuntime.awrap(ticketInfo.save());

          case 26:
            console.log("Updated ticket status to PAID for app_trans_id =", appTransId); // Trả về thành công

            result.return_code = 1;
            result.return_message = "success";

          case 29:
            _context15.next = 36;
            break;

          case 31:
            _context15.prev = 31;
            _context15.t0 = _context15["catch"](1);
            // Bắt lỗi và trả về
            console.error("Error processing callback:", _context15.t0.message);
            result.return_code = 0; // ZaloPay sẽ retry callback

            result.return_message = _context15.t0.message;

          case 36:
            // Trả kết quả cho ZaloPay server
            res.json(result); // Log query string để theo dõi

            data = req.query;
            console.log("Dữ liệu từ query string:", data);

          case 39:
          case "end":
            return _context15.stop();
        }
      }
    }, null, null, [[1, 31]]);
  },
  oderStatusPay: function oderStatusPay(req, res) {
    var app_trans_id, postData, data, postConfig, result;
    return regeneratorRuntime.async(function oderStatusPay$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            app_trans_id = req.params.app_trans_id;
            postData = {
              app_id: _zalopay["default"].app_id,
              app_trans_id: app_trans_id // Input your app_trans_id

            };
            data = postData.app_id + "|" + postData.app_trans_id + "|" + _zalopay["default"].key1; // appid|app_trans_id|key1

            postData.mac = _cryptoJs["default"].HmacSHA256(data, _zalopay["default"].key1).toString();
            postConfig = {
              method: "post",
              url: "https://sb-openapi.zalopay.vn/v2/query",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: _qs["default"].stringify(postData)
            };
            _context16.prev = 5;
            _context16.next = 8;
            return regeneratorRuntime.awrap((0, _axios["default"])(postConfig));

          case 8:
            result = _context16.sent;
            console.log("Response received:", result.data); // Log the response data

            res.json(result.data);
            _context16.next = 17;
            break;

          case 13:
            _context16.prev = 13;
            _context16.t0 = _context16["catch"](5);
            console.error("Error occurred:", _context16.t0.message); // Log the error if it occurs

            res.status(500).json({
              error: _context16.t0.message
            });

          case 17:
          case "end":
            return _context16.stop();
        }
      }
    }, null, null, [[5, 13]]);
  },

  /* getRevenue: async (req, res) => {
    try {
      const { type, startDate, endDate } = req.query;
        if (!type || !startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: "Missing required parameters: type, startDate, or endDate",
        });
      }
        const start = moment(startDate);
      const end = moment(endDate);
        if (!start.isValid() || !end.isValid()) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format",
        });
      }
        const matchStage = {
        status: "PAID",
        updatedAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
        let groupByField;
      let dateFormat;
      let timeRange = [];
        if (type === "day") {
        groupByField = {
          $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" },
        };
        dateFormat = "YYYY-MM-DD";
        for (let m = moment(start); m.isSameOrBefore(end); m.add(1, "days")) {
          timeRange.push(m.format(dateFormat));
        }
      } else if (type === "month") {
        groupByField = {
          $dateToString: { format: "%Y-%m", date: "$updatedAt" },
        };
        dateFormat = "YYYY-MM";
        for (let m = moment(start); m.isSameOrBefore(end); m.add(1, "months")) {
          timeRange.push(m.format(dateFormat));
        }
      } else if (type === "year") {
        groupByField = {
          $year: "$updatedAt",
        };
        dateFormat = "YYYY";
        for (let year = start.year(); year <= end.year(); year++) {
          timeRange.push(year.toString());
        }
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid type parameter. Use "day", "month", or "year".',
        });
      }
        const revenueStats = await Tickets.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: groupByField,
            totalAmount: { $sum: "$totalAmount" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
        // Bổ sung dữ liệu bị thiếu và định dạng đúng với `RevenueStats.tsx`
      const mappedData = timeRange.map((time) => {
        const found = revenueStats.find((item) => item._id.toString() === time);
        return {
          label: time, // Field `label` để phù hợp với component React
          totalAmount: found ? found.totalAmount : 0,
        };
      });
        res.json({
        success: true,
        data: mappedData, // Định dạng đúng cho `RevenueStats.tsx`
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */
  getRevenue: function getRevenue(req, res) {
    var _req$query3, type, startDate, endDate, start, end, matchStage, groupByField, dateFormat, timeRange, m, _m, year, revenueStats, mappedData;

    return regeneratorRuntime.async(function getRevenue$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _req$query3 = req.query, type = _req$query3.type, startDate = _req$query3.startDate, endDate = _req$query3.endDate;

            if (!(!type || !startDate || !endDate)) {
              _context17.next = 4;
              break;
            }

            return _context17.abrupt("return", res.status(400).json({
              success: false,
              message: "Missing required parameters: type, startDate, or endDate"
            }));

          case 4:
            start = (0, _moment["default"])(startDate);
            end = (0, _moment["default"])(endDate);

            if (!(!start.isValid() || !end.isValid())) {
              _context17.next = 8;
              break;
            }

            return _context17.abrupt("return", res.status(400).json({
              success: false,
              message: "Invalid date format"
            }));

          case 8:
            // $lte: new Date(endDate + "T23:59:59Z"),
            matchStage = {
              status: "PAID",
              updatedAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              }
            };
            timeRange = [];

            if (!(type === "day")) {
              _context17.next = 16;
              break;
            }

            groupByField = {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$updatedAt"
              }
            };
            dateFormat = "YYYY-MM-DD";

            for (m = (0, _moment["default"])(start); m.isSameOrBefore(end); m.add(1, "days")) {
              timeRange.push(m.format(dateFormat));
            }

            _context17.next = 29;
            break;

          case 16:
            if (!(type === "month")) {
              _context17.next = 22;
              break;
            }

            groupByField = {
              $dateToString: {
                format: "%Y-%m",
                date: "$updatedAt"
              }
            };
            dateFormat = "YYYY-MM";

            for (_m = (0, _moment["default"])(start); _m.isSameOrBefore(end); _m.add(1, "months")) {
              timeRange.push(_m.format(dateFormat));
            }

            _context17.next = 29;
            break;

          case 22:
            if (!(type === "year")) {
              _context17.next = 28;
              break;
            }

            groupByField = {
              $year: "$updatedAt"
            };
            dateFormat = "YYYY";

            for (year = start.year(); year <= end.year(); year++) {
              timeRange.push(year.toString());
            }

            _context17.next = 29;
            break;

          case 28:
            return _context17.abrupt("return", res.status(400).json({
              success: false,
              message: 'Invalid type parameter. Use "day", "month", or "year".'
            }));

          case 29:
            _context17.next = 31;
            return regeneratorRuntime.awrap(_tickets["default"].aggregate([{
              $match: matchStage
            }, {
              $group: {
                _id: groupByField,
                totalAmount: {
                  $sum: "$totalAmount"
                }
              }
            }, {
              $sort: {
                _id: 1
              }
            }]));

          case 31:
            revenueStats = _context17.sent;
            // Bổ sung dữ liệu bị thiếu và định dạng đúng với `RevenueStats.tsx`
            mappedData = timeRange.map(function (time) {
              var found = revenueStats.find(function (item) {
                return item._id.toString() === time;
              });
              return {
                label: time,
                // Field `label` để phù hợp với component React
                totalAmount: found ? found.totalAmount : 0
              };
            });
            res.json({
              success: true,
              data: mappedData // Định dạng đúng cho `RevenueStats.tsx`

            });
            _context17.next = 39;
            break;

          case 36:
            _context17.prev = 36;
            _context17.t0 = _context17["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context17.t0.message
            });

          case 39:
          case "end":
            return _context17.stop();
        }
      }
    }, null, null, [[0, 36]]);
  },

  /* getTopUsers: async (req, res) => {
    try {
      // Truy vấn 1: Tính số lượng vé đã đặt cho từng người dùng
      const topUsersStats = await Tickets.aggregate([
        {
          $group: {
            _id: "$user", // Nhóm theo `userId`
            bookingCount: { $sum: 1 }, // Đếm số vé đặt
          },
        },
        { $sort: { bookingCount: -1 } }, // Sắp xếp giảm dần theo số vé
        { $limit: 5 }, // Lấy 5 người dùng có số vé cao nhất
      ]);
        // Truy vấn 2: Lấy thông tin chi tiết của người dùng
      const userIds = topUsersStats.map((user) => user._id); // Lấy danh sách userId từ kết quả đầu tiên
      const users = await User.find({ _id: { $in: userIds } }); // Lấy thông tin chi tiết người dùng từ bảng User
        // Ghép thông tin người dùng với số vé đã đặt
      const topUsers = topUsersStats.map((stat) => {
        const user = users.find(
          (user) => user._id.toString() === stat._id.toString()
        );
        return {
          _id: stat._id,
          name: user ? user.fullName : "N/A", // Nếu không tìm thấy thì trả về 'N/A'
          email: user ? user.email : "N/A", // Nếu không tìm thấy thì trả về 'N/A'
          bookingCount: stat.bookingCount,
        };
      });
        res.json({
        success: true,
        data: topUsers, // Trả về danh sách top người dùng với số lượng vé đặt
      });
    } catch (error) {
      console.error("Error fetching top users:", error); // Log lỗi chi tiết
      res.status(500).json({
        success: false,
        message: `Error fetching top users: ${error.message}`, // Trả về thông tin lỗi chi tiết
      });
    }
  }, */
  getTopUsers: function getTopUsers(req, res) {
    var topUsersStats, userIds, users, topUsers;
    return regeneratorRuntime.async(function getTopUsers$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _context18.next = 3;
            return regeneratorRuntime.awrap(_tickets["default"].aggregate([{
              $match: {
                status: "PAID"
              } // Lọc chỉ lấy vé có trạng thái "PAID"

            }, {
              $group: {
                _id: "$user",
                // Nhóm theo `userId`
                bookingCount: {
                  $sum: 1
                } // Đếm số vé đặt

              }
            }, {
              $sort: {
                bookingCount: -1
              }
            }, // Sắp xếp giảm dần theo số vé
            {
              $limit: 5
            } // Lấy 5 người dùng có số vé cao nhất
            ]));

          case 3:
            topUsersStats = _context18.sent;
            // Truy vấn 2: Lấy thông tin chi tiết của người dùng
            userIds = topUsersStats.map(function (user) {
              return user._id;
            }); // Lấy danh sách userId từ kết quả đầu tiên

            _context18.next = 7;
            return regeneratorRuntime.awrap(_users["default"].find({
              _id: {
                $in: userIds
              }
            }));

          case 7:
            users = _context18.sent;
            // Lấy thông tin chi tiết người dùng từ bảng User
            // Ghép thông tin người dùng với số vé đã đặt
            topUsers = topUsersStats.map(function (stat) {
              var user = users.find(function (user) {
                return user._id.toString() === stat._id.toString();
              });
              return {
                _id: stat._id,
                name: user ? user.fullName : "N/A",
                // Nếu không tìm thấy thì trả về 'N/A'
                email: user ? user.email : "N/A",
                // Nếu không tìm thấy thì trả về 'N/A'
                bookingCount: stat.bookingCount
              };
            });
            res.json({
              success: true,
              data: topUsers // Trả về danh sách top người dùng với số lượng vé đặt

            });
            _context18.next = 16;
            break;

          case 12:
            _context18.prev = 12;
            _context18.t0 = _context18["catch"](0);
            console.error("Error fetching top users:", _context18.t0); // Log lỗi chi tiết

            res.status(500).json({
              success: false,
              message: "Error fetching top users: ".concat(_context18.t0.message) // Trả về thông tin lỗi chi tiết

            });

          case 16:
          case "end":
            return _context18.stop();
        }
      }
    }, null, null, [[0, 12]]);
  }
};
var _default = TicketController;
exports["default"] = _default;