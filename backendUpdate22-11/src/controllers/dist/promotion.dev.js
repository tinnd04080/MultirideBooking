"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _index = require("../constants/index.js");

var _promotion = _interopRequireDefault(require("../models/promotion.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PromotionController = {
  /*  createPromotion: async (req, res) => {
    try {
      const {
        code,
        description,
        discountAmount,
        discountType,
        startDate,
        endDate,
      } = req.body;
        const busType = await new Promotion({
        code,
        description,
        discountAmount,
        discountType,
        startDate,
        endDate,
      }).save();
        res.json(busType);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */

  /* Tạo mã giảm giá update 02/12 */

  /* createPromotion: async (req, res) => {
    try {
      const {
        code,
        description,
        discountAmount,
        discountType,
        startDate,
        endDate,
        quantity, // Thêm trường quantity
        status, // Thêm trường status
      } = req.body;
        // Kiểm tra xem trạng thái có được chọn không
      if (!status || !Object.values(PROMOTIONT_STATUS).includes(status)) {
        return res.status(400).json({
          message:
            "Trạng thái không hợp lệ, vui lòng chọn ACTIVE hoặc EXPIRED.",
        });
      }
        // Kiểm tra số lượng hợp lệ
      if (quantity <= 0) {
        return res.status(400).json({ message: "Số lượng phải lớn hơn 0" });
      }
        // Tạo và lưu mã giảm giá, gán số lượng vào remainingCount
      const promotion = await new Promotion({
        code,
        description,
        discountAmount,
        discountType,
        startDate,
        endDate,
        quantity,
        remainingCount: quantity, // Gán số lượng vào remainingCount
        status,
      }).save();
        res.json(promotion);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */

  /* Tạo mã giảm giá update 02/12 finish */
  createPromotion: function createPromotion(req, res) {
    var _req$body, code, description, discountAmount, discountType, startDate, endDate, quantity, status, existingPromotion, currentDate, startDateObj, finalStatus, promotion;

    return regeneratorRuntime.async(function createPromotion$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, code = _req$body.code, description = _req$body.description, discountAmount = _req$body.discountAmount, discountType = _req$body.discountType, startDate = _req$body.startDate, endDate = _req$body.endDate, quantity = _req$body.quantity, status = _req$body.status; // Kiểm tra xem mã khuyến mãi đã tồn tại trong cơ sở dữ liệu chưa

            _context.next = 4;
            return regeneratorRuntime.awrap(_promotion["default"].findOne({
              code: code
            }));

          case 4:
            existingPromotion = _context.sent;

            if (!existingPromotion) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "Mã khuyến mãi đã có"
            }));

          case 7:
            if (!(quantity <= 0)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "Số lượng phải lớn hơn 0"
            }));

          case 9:
            // Kiểm tra ngày bắt đầu hợp lệ
            currentDate = new Date(); // Lấy ngày giờ hiện tại

            startDateObj = new Date(startDate); // Nếu startDate là ngày trong tương lai, tự động đặt status thành "EXPIRED"

            finalStatus = status;

            if (!(startDateObj > currentDate)) {
              _context.next = 16;
              break;
            }

            finalStatus = "EXPIRED";
            _context.next = 18;
            break;

          case 16:
            if (!(!status || !Object.values(_index.PROMOTIONT_STATUS).includes(status))) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "Trạng thái không hợp lệ, vui lòng chọn ACTIVE hoặc EXPIRED."
            }));

          case 18:
            _context.next = 20;
            return regeneratorRuntime.awrap(new _promotion["default"]({
              code: code,
              description: description,
              discountAmount: discountAmount,
              discountType: discountType,
              startDate: startDate,
              endDate: endDate,
              quantity: quantity,
              remainingCount: quantity,
              // Gán số lượng vào remainingCount
              status: finalStatus
            }).save());

          case 20:
            promotion = _context.sent;
            res.json(promotion);
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context.t0.message
            });

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 24]]);
  },

  /*  getPromotions: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;
        const promotions = await Promotion.find()
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();
        const count = await Promotion.countDocuments();
        const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);
        res.json({
        data: promotions,
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

  /* update lấy danh sách
  Mô tả luồng xử lý: Trước khi trả về danh sách khuyến mãi, kiểm tra 2 điều kiện và cập nhật trạng thái. 
  Điều kiện 1: Trường endDate có bằng ngày hiện tại hay không Nếu endDate là ngày quá khứ. Thì trường status sẽ được chuyển thành EXPIRED
  Điều kiện 2: Kiểm tra trường remainingCount. Nếu remainingCount <= 0. Thì trường status sẽ được chuyển thành EXPIRED vì đã hết lượt
  Còn nếu qua 2 điều kiện thì giữ nguyên*/
  getPromotions: function getPromotions(req, res) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, promotions, currentDate, updatedPromotions, count, totalPage, currentPage;

    return regeneratorRuntime.async(function getPromotions$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? _index.PAGINATION.PAGE : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? _index.PAGINATION.LIMIT : _req$query$limit;
            _context3.next = 4;
            return regeneratorRuntime.awrap(_promotion["default"].find().sort("-createdAt").skip((page - 1) * limit).limit(limit * 1).exec());

          case 4:
            promotions = _context3.sent;
            currentDate = new Date(); // Kiểm tra và cập nhật trạng thái trước khi trả về

            _context3.next = 8;
            return regeneratorRuntime.awrap(Promise.all(promotions.map(function _callee(promotion) {
              var status;
              return regeneratorRuntime.async(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      status = promotion.status;

                      if (promotion.remainingCount <= 0 || new Date(promotion.endDate) < currentDate) {
                        status = _index.PROMOTIONT_STATUS.EXPIRED;
                      } // Nếu trạng thái cần cập nhật


                      if (!(status !== promotion.status)) {
                        _context2.next = 6;
                        break;
                      }

                      promotion.status = status;
                      _context2.next = 6;
                      return regeneratorRuntime.awrap(promotion.save());

                    case 6:
                      return _context2.abrupt("return", promotion);

                    case 7:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            })));

          case 8:
            updatedPromotions = _context3.sent;
            _context3.next = 11;
            return regeneratorRuntime.awrap(_promotion["default"].countDocuments());

          case 11:
            count = _context3.sent;
            totalPage = Math.ceil(count / limit);
            currentPage = Number(page);
            res.json({
              data: updatedPromotions,
              totalPage: totalPage,
              currentPage: currentPage
            });
            _context3.next = 20;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context3.t0.message
            });

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 17]]);
  },
  getPromotion: function getPromotion(req, res) {
    var id, promotion;
    return regeneratorRuntime.async(function getPromotion$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return regeneratorRuntime.awrap(_promotion["default"].findById(id).exec());

          case 4:
            promotion = _context4.sent;
            res.json(promotion);
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context4.t0.message
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },

  /*   updatePromotion: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        code,
        description,
        discountAmount,
        discountType,
        startDate,
        endDate,
      } = req.body;
        const promotion = await Promotion.findByIdAndUpdate(
        id,
        {
          code,
          description,
          discountAmount,
          discountType,
          startDate,
          endDate,
        },
        { new: true }
      ).exec();
        res.json(promotion);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */

  /*  updatePromotion: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        code,
        description,
        discountAmount,
        discountType,
        startDate,
        endDate,
        remainingCount, // Thêm trường remainingCount
        status, // Thêm trường status
      } = req.body;
        const currentDate = new Date(); // Lấy ngày hiện tại
      const startDateObj = new Date(startDate); // Chuyển startDate thành đối tượng Date
        // Kiểm tra nếu startDate là trong tương lai thì tự động đặt status thành "EXPIRED"
      let finalStatus = status;
      if (startDateObj > currentDate) {
        finalStatus = "EXPIRED";
      } else {
        // Kiểm tra xem status có hợp lệ không, chỉ khi startDate không phải trong tương lai
        if (!status || !Object.values(PROMOTIONT_STATUS).includes(status)) {
          return res.status(400).json({
            message:
              "Trạng thái không hợp lệ, vui lòng chọn ACTIVE hoặc EXPIRED.",
          });
        }
      }
        // Cập nhật Promotion
      const promotion = await Promotion.findByIdAndUpdate(
        id,
        {
          code,
          description,
          discountAmount,
          discountType,
          startDate,
          endDate,
          remainingCount, // Cập nhật remainingCount
          status: finalStatus, // Cập nhật status sau khi kiểm tra điều kiện
        },
        { new: true } // Trả về đối tượng mới sau khi cập nhật
      ).exec();
        // Trả về thông tin đã cập nhật
      res.json(promotion);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */
  updatePromotion: function updatePromotion(req, res) {
    var id, _req$body2, code, description, discountAmount, discountType, startDate, endDate, remainingCount, status, quantity, currentDate, startDateObj, finalStatus, promotion, updatedRemainingCount, updatedPromotion;

    return regeneratorRuntime.async(function updatePromotion$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _req$body2 = req.body, code = _req$body2.code, description = _req$body2.description, discountAmount = _req$body2.discountAmount, discountType = _req$body2.discountType, startDate = _req$body2.startDate, endDate = _req$body2.endDate, remainingCount = _req$body2.remainingCount, status = _req$body2.status, quantity = _req$body2.quantity;
            currentDate = new Date(); // Lấy ngày hiện tại

            startDateObj = new Date(startDate); // Chuyển startDate thành đối tượng Date
            // Kiểm tra nếu startDate là trong tương lai thì tự động đặt status thành "EXPIRED"

            finalStatus = status;

            if (!(startDateObj > currentDate)) {
              _context5.next = 10;
              break;
            }

            finalStatus = "EXPIRED";
            _context5.next = 12;
            break;

          case 10:
            if (!(!status || !Object.values(_index.PROMOTIONT_STATUS).includes(status))) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", res.status(400).json({
              message: "Trạng thái không hợp lệ, vui lòng chọn ACTIVE hoặc EXPIRED."
            }));

          case 12:
            _context5.next = 14;
            return regeneratorRuntime.awrap(_promotion["default"].findById(id).exec());

          case 14:
            promotion = _context5.sent;

            if (promotion) {
              _context5.next = 17;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "Không tìm thấy khuyến mãi"
            }));

          case 17:
            // Kiểm tra nếu quantity thay đổi, tính toán lại remainingCount
            updatedRemainingCount = remainingCount; // Nếu quantity thay đổi

            if (quantity !== undefined && quantity !== promotion.quantity) {
              // Tính toán lại remainingCount mới theo công thức:
              // remainingCount mới = quantity mới - (quantity cũ - remainingCount cũ)
              updatedRemainingCount = quantity - (promotion.quantity - promotion.remainingCount);
            } // Cập nhật Promotion


            _context5.next = 21;
            return regeneratorRuntime.awrap(_promotion["default"].findByIdAndUpdate(id, {
              code: code,
              description: description,
              discountAmount: discountAmount,
              discountType: discountType,
              startDate: startDate,
              endDate: endDate,
              remainingCount: updatedRemainingCount,
              // Cập nhật lại remainingCount
              quantity: quantity,
              // Cập nhật quantity
              status: finalStatus // Cập nhật status

            }, {
              "new": true
            } // Trả về đối tượng mới sau khi cập nhật
            ).exec());

          case 21:
            updatedPromotion = _context5.sent;
            // Trả về thông tin đã cập nhật
            res.json(updatedPromotion);
            _context5.next = 28;
            break;

          case 25:
            _context5.prev = 25;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context5.t0.message
            });

          case 28:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 25]]);
  },
  removePromotion: function removePromotion(req, res) {
    var id, promotion;
    return regeneratorRuntime.async(function removePromotion$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            _context6.next = 4;
            return regeneratorRuntime.awrap(_promotion["default"].findByIdAndDelete(id).exec());

          case 4:
            promotion = _context6.sent;
            res.json(promotion);
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context6.t0.message
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },
  applyPromotion: function applyPromotion(req, res) {
    var code, discount, isBeforeStart, isExpired;
    return regeneratorRuntime.async(function applyPromotion$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            code = req.params.code;
            _context7.next = 4;
            return regeneratorRuntime.awrap(_promotion["default"].findOne({
              code: code
            }).exec());

          case 4:
            discount = _context7.sent;

            if (discount) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              message: "Không tìm thấy mã giảm giá"
            }));

          case 7:
            isBeforeStart = (0, _dayjs["default"])().isBefore((0, _dayjs["default"])(discount.startDate));

            if (!isBeforeStart) {
              _context7.next = 10;
              break;
            }

            return _context7.abrupt("return", res.status(406).json({
              message: "Chưa đến thời gian sử dụng"
            }));

          case 10:
            isExpired = (0, _dayjs["default"])().isAfter(discount.endDate);

            if (!isExpired) {
              _context7.next = 13;
              break;
            }

            return _context7.abrupt("return", res.status(406).json({
              message: "Mã giảm giá đã hết hạn"
            }));

          case 13:
            res.json(discount);
            _context7.next = 19;
            break;

          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context7.t0.message
            });

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 16]]);
  },
  getPromotionByCode: function getPromotionByCode(req, res) {
    var code, promotion;
    return regeneratorRuntime.async(function getPromotionByCode$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            code = req.params.code; // Tìm kiếm theo mã giảm giá 'code', không phải theo _id

            _context8.next = 4;
            return regeneratorRuntime.awrap(_promotion["default"].findOne({
              code: code
            }).exec());

          case 4:
            promotion = _context8.sent;

            if (promotion) {
              _context8.next = 7;
              break;
            }

            return _context8.abrupt("return", res.status(404).json({
              message: "Không tìm thấy mã giảm giá"
            }));

          case 7:
            res.json(promotion);
            _context8.next = 13;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context8.t0.message
            });

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[0, 10]]);
  }
};
var _default = PromotionController;
exports["default"] = _default;