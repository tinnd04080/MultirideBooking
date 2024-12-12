"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../constants/index.js");

var _bus = _interopRequireDefault(require("../models/bus.js"));

var _trips = _interopRequireDefault(require("../models/trips.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BusController = {
  // Hàm tạo mới một bus

  /*  createBus: async (req, res) => {
    try {
      // Lấy thông tin từ body request
      const { busTypeName, seatCapacity, priceFactor, licensePlate } = req.body;
        // Kiểm tra nếu biển số đã tồn tại
      const existingBus = await Bus.findOne({ licensePlate });
      if (existingBus) {
        return res.status(400).json({ message: "Biển số xe đã tồn tại" });
      }
        // Tạo mới một xe bus
      const bus = await new Bus({
        busTypeName,
        seatCapacity,
        priceFactor,
        licensePlate,
      }).save();
        res.json(bus);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */

  /* Hàm tạo xe. Cập nhật ngày 01/12 */
  createBus: function createBus(req, res) {
    var _req$body, busTypeName, seatCapacity, priceFactor, licensePlate, status, existingBus, bus;

    return regeneratorRuntime.async(function createBus$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // Lấy thông tin từ body request
            _req$body = req.body, busTypeName = _req$body.busTypeName, seatCapacity = _req$body.seatCapacity, priceFactor = _req$body.priceFactor, licensePlate = _req$body.licensePlate, status = _req$body.status; // Kiểm tra nếu biển số đã tồn tại

            _context.next = 4;
            return regeneratorRuntime.awrap(_bus["default"].findOne({
              licensePlate: licensePlate
            }));

          case 4:
            existingBus = _context.sent;

            if (!existingBus) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "Biển số xe đã tồn tại"
            }));

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(new _bus["default"]({
              busTypeName: busTypeName,
              seatCapacity: seatCapacity,
              priceFactor: priceFactor,
              licensePlate: licensePlate,
              status: status || BUSES_STATUS.OPEN // Nếu không có status, sử dụng mặc định là OPEN

            }).save());

          case 9:
            bus = _context.sent;
            res.json(bus);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context.t0.message
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 13]]);
  },
  // Hàm lấy danh sách các bus với phân trang
  getBuses: function getBuses(req, res) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, buses, count, totalPage, currentPage;

    return regeneratorRuntime.async(function getBuses$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? _index.PAGINATION.PAGE : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? _index.PAGINATION.LIMIT : _req$query$limit; // Lấy danh sách xe bus với phân trang

            _context2.next = 4;
            return regeneratorRuntime.awrap(_bus["default"].find().sort("-createdAt").skip((page - 1) * limit).limit(limit * 1).exec());

          case 4:
            buses = _context2.sent;
            _context2.next = 7;
            return regeneratorRuntime.awrap(_bus["default"].countDocuments());

          case 7:
            count = _context2.sent;
            totalPage = Math.ceil(count / limit);
            currentPage = Number(page);
            res.json({
              data: buses,
              totalPage: totalPage,
              currentPage: currentPage
            });
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context2.t0.message
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 13]]);
  },
  // Hàm lấy thông tin chi tiết một bus theo id
  getBus: function getBus(req, res) {
    var id, bus;
    return regeneratorRuntime.async(function getBus$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _context3.next = 4;
            return regeneratorRuntime.awrap(_bus["default"].findById(id).exec());

          case 4:
            bus = _context3.sent;

            if (bus) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: "Bus not found"
            }));

          case 7:
            res.json(bus);
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context3.t0.message
            });

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 10]]);
  },
  // updateBus: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { busTypeName, seatCapacity, priceFactor, licensePlate, status } =
  //       req.body;
  //     /*   // Kiểm tra xem xe bus này có đang tham gia chuyến xe nào không
  //     const tripUsingBus = await Trip.findOne({ busId: id });
  //     // Nếu xe đang tham gia chuyến xe và chuyến xe có status là OPEN
  //     if (tripUsingBus && tripUsingBus.status === "OPEN") {
  //       return res.status(400).json({
  //         message:
  //           "Xe không thể thay đổi trạng thái khi đang tham gia chuyến xe mở",
  //       });
  //     } */
  //     // Cập nhật thông tin xe bus, bao gồm trường status nếu có
  //     const bus = await Bus.findByIdAndUpdate(
  //       id,
  //       {
  //         busTypeName,
  //         seatCapacity,
  //         priceFactor,
  //         licensePlate,
  //         status, // Cập nhật trường status
  //       },
  //       { new: true }
  //     ).exec();
  //     // Kiểm tra nếu không tìm thấy bus
  //     if (!bus) {
  //       return res.status(404).json({ message: "Bus not found" });
  //     }
  //     // Trả về thông tin bus đã cập nhật
  //     res.json(bus);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Internal server error",
  //       error: error.message,
  //     });
  //   }
  // },
  updateBus: function updateBus(req, res) {
    var id, _req$body2, busTypeName, seatCapacity, priceFactor, licensePlate, status, tripUsingBus, bus;

    return regeneratorRuntime.async(function updateBus$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _req$body2 = req.body, busTypeName = _req$body2.busTypeName, seatCapacity = _req$body2.seatCapacity, priceFactor = _req$body2.priceFactor, licensePlate = _req$body2.licensePlate, status = _req$body2.status; // Kiểm tra nếu status là 'CLOSED', thực hiện kiểm tra tình trạng chuyến xe

            if (!(status === "CLOSED")) {
              _context4.next = 10;
              break;
            }

            _context4.next = 6;
            return regeneratorRuntime.awrap(_trips["default"].findOne({
              bus: id,
              status: "OPEN"
            }));

          case 6:
            tripUsingBus = _context4.sent;
            console.log(tripUsingBus); // Nếu tìm thấy chuyến xe nào có status là "OPEN", không cho phép chuyển bus thành "CLOSED"

            if (!tripUsingBus) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: "Tuyến xe này có chuyến xe đang hoạt động. Không thể chuyển đổi trạng thái"
            }));

          case 10:
            _context4.next = 12;
            return regeneratorRuntime.awrap(_bus["default"].findByIdAndUpdate(id, {
              busTypeName: busTypeName,
              seatCapacity: seatCapacity,
              priceFactor: priceFactor,
              licensePlate: licensePlate,
              status: status // Cập nhật trường status

            }, {
              "new": true
            }).exec());

          case 12:
            bus = _context4.sent;

            if (bus) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "Bus not found"
            }));

          case 15:
            // Trả về thông tin bus đã cập nhật
            res.json(bus);
            _context4.next = 21;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context4.t0.message
            });

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 18]]);
  },
  removeBus: function removeBus(req, res) {
    var id, bus;
    return regeneratorRuntime.async(function removeBus$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return regeneratorRuntime.awrap(_bus["default"].findByIdAndDelete(id).exec());

          case 4:
            bus = _context5.sent;

            if (bus) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              message: "Bus not found"
            }));

          case 7:
            res.json({
              message: "Bus removed successfully"
            });
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context5.t0.message
            });

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 10]]);
  }
};
var _default = BusController;
exports["default"] = _default;