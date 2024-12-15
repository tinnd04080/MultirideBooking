"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _index = require("../constants/index.js");

var _busRoutes = _interopRequireDefault(require("../models/busRoutes.js"));

var _trips = _interopRequireDefault(require("../models/trips.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BusRouteController = {
  /*  createBusRoutes: async (req, res) => {
    try {
      const {
        startProvince,
        startDistrict,
        endDistrict,
        endProvince,
        duration,
        status,
        distance,
        pricePerKM,
      } = req.body;
        const busRoute = await new BusRoutes({
        startProvince,
        startDistrict,
        endDistrict,
        endProvince,
        duration,
        status,
        distance,
        pricePerKM,
      }).save();
        res.json(busRoute);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */
  createBusRoutes: function createBusRoutes(req, res) {
    var _req$body, startProvince, startDistrict, endDistrict, endProvince, status, distance, pricePerKM, existingRoute, busRoute;

    return regeneratorRuntime.async(function createBusRoutes$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, startProvince = _req$body.startProvince, startDistrict = _req$body.startDistrict, endDistrict = _req$body.endDistrict, endProvince = _req$body.endProvince, status = _req$body.status, distance = _req$body.distance, pricePerKM = _req$body.pricePerKM; // Kiểm tra xem tuyến xe đã tồn tại hay chưa

            _context.next = 4;
            return regeneratorRuntime.awrap(_busRoutes["default"].findOne({
              startProvince: startProvince,
              endProvince: endProvince
            }));

          case 4:
            existingRoute = _context.sent;

            if (!existingRoute) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "Tuyến xe đã tồn tại. Vui lòng tạo lại"
            }));

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(new _busRoutes["default"]({
              startProvince: startProvince,
              startDistrict: startDistrict,
              endDistrict: endDistrict,
              endProvince: endProvince,
              status: status,
              distance: distance,
              pricePerKM: pricePerKM
            }).save());

          case 9:
            busRoute = _context.sent;
            res.json(busRoute);
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
  getBusRoutes: function getBusRoutes(req, res) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, startProvince, startDistrict, endProvince, endDistrict, status, queryObj, busRoutes, count, totalPage, currentPage;

    return regeneratorRuntime.async(function getBusRoutes$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? _index.PAGINATION.PAGE : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? _index.PAGINATION.LIMIT : _req$query$limit, startProvince = _req$query.startProvince, startDistrict = _req$query.startDistrict, endProvince = _req$query.endProvince, endDistrict = _req$query.endDistrict, status = _req$query.status;
            queryObj = {};
            startProvince && (queryObj.startProvince = startProvince);
            startDistrict && (queryObj.startDistrict = startDistrict);
            endProvince && (queryObj.endProvince = endProvince);
            endDistrict && (queryObj.endDistrict = endDistrict);
            status && (queryObj.status = status);
            /*  if (duration) {
              queryObj.duration = {
                $gte: dayjs(duration).startOf("day").toDate(),
                $lte: dayjs(duration).endOf("day").toDate(),
              };
            } */

            _context2.next = 10;
            return regeneratorRuntime.awrap(_busRoutes["default"].find(queryObj).sort("-createdAt").skip((page - 1) * limit).limit(limit * 1).exec());

          case 10:
            busRoutes = _context2.sent;
            _context2.next = 13;
            return regeneratorRuntime.awrap(_busRoutes["default"].countDocuments());

          case 13:
            count = _context2.sent;
            totalPage = Math.ceil(count / limit);
            currentPage = Number(page);
            res.json({
              data: busRoutes,
              totalPage: totalPage,
              currentPage: currentPage
            });
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context2.t0.message
            });

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 19]]);
  },
  getBusRoute: function getBusRoute(req, res) {
    var id, busRoute;
    return regeneratorRuntime.async(function getBusRoute$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _context3.next = 4;
            return regeneratorRuntime.awrap(_busRoutes["default"].findById(id));

          case 4:
            busRoute = _context3.sent;
            res.json(busRoute);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context3.t0.message
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 8]]);
  },

  /* update 12/12 */

  /* updateBusRoute: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.body);
      const {
        startProvince,
        startDistrict,
        endDistrict,
        endProvince,
        duration,
        status,
        distance,
        pricePerKM,
      } = req.body;
        const busRoute = await BusRoutes.findByIdAndUpdate(
        id,
        {
          startProvince,
          startDistrict,
          endDistrict,
          endProvince,
          duration,
          status,
          distance,
          pricePerKM,
        },
        { new: true }
      );
        res.json(busRoute);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */
  updateBusRoute: function updateBusRoute(req, res) {
    var id, _req$body2, startProvince, startDistrict, endDistrict, endProvince, status, distance, pricePerKM, activeTrip, busRoute;

    return regeneratorRuntime.async(function updateBusRoute$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            console.log(req.body);
            _req$body2 = req.body, startProvince = _req$body2.startProvince, startDistrict = _req$body2.startDistrict, endDistrict = _req$body2.endDistrict, endProvince = _req$body2.endProvince, status = _req$body2.status, distance = _req$body2.distance, pricePerKM = _req$body2.pricePerKM; // Kiểm tra nếu trạng thái muốn thay đổi là 'CLOSED'

            if (!(status === "CLOSED")) {
              _context4.next = 10;
              break;
            }

            _context4.next = 7;
            return regeneratorRuntime.awrap(_trips["default"].findOne({
              route: id,
              status: "OPEN"
            }));

          case 7:
            activeTrip = _context4.sent;

            if (!activeTrip) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: "Tuyến xe này đang có chuyến xe hoạt động. Không thể ngừng hoạt động tuyến."
            }));

          case 10:
            _context4.next = 12;
            return regeneratorRuntime.awrap(_busRoutes["default"].findByIdAndUpdate(id, {
              startProvince: startProvince,
              startDistrict: startDistrict,
              endDistrict: endDistrict,
              endProvince: endProvince,
              status: status,
              distance: distance,
              pricePerKM: pricePerKM
            }, {
              "new": true
            }));

          case 12:
            busRoute = _context4.sent;
            // Trả về BusRoute đã được cập nhật
            res.json(busRoute);
            _context4.next = 19;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context4.t0.message
            });

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 16]]);
  },
  removeBusRoute: function removeBusRoute(req, res) {
    var id, busRoute;
    return regeneratorRuntime.async(function removeBusRoute$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return regeneratorRuntime.awrap(_busRoutes["default"].findByIdAndDelete(id));

          case 4:
            busRoute = _context5.sent;
            res.json(busRoute);
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
  }
};
var _default = BusRouteController;
exports["default"] = _default;