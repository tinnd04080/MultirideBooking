"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../constants/index.js");

var _bus = _interopRequireDefault(require("../models/bus.js"));

var _trips = _interopRequireDefault(require("../models/trips.js"));

var _busRoutes = _interopRequireDefault(require("../models/busRoutes.js"));

var _seats = _interopRequireDefault(require("../models/seats.js"));

var _tickets = _interopRequireDefault(require("../models/tickets.js"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TripController = {
  /* Thêm chuyến xe mới */

  /* createTrip: async (req, res) => {
    try {
      const { route, bus, departureTime, arrivalTime, status } = req.body;
        // Lấy thông tin xe và tuyến xe
      const busInfo = await Bus.findById(bus).exec();
      const busRouteInfo = await BusRoutes.findById(route).exec();
        // Tính toán giá vé
      const ticketPrice =
        busRouteInfo.distance * busRouteInfo.pricePerKM * busInfo.priceFactor;
        if (!busInfo || !busRouteInfo) {
        return res.status(404).json({
          message: "Bus or route not found",
        });
      }
        // Tạo chuyến xe
      const trip = await new Trip({
        route,
        bus,
        price: ticketPrice,
        availableSeats: busInfo.seatCapacity || 0,
        departureTime,
        arrivalTime,
        status,
      }).save();
        // Lấy số ghế từ seatCapacity
      const seatCapacity = busInfo.seatCapacity;
        // Danh sách để lưu ghế
      const seats = [];
      if (seatCapacity <= 16) {
        // Tạo ghế từ A01 đến A<seatCapacity>
        for (let i = 1; i <= seatCapacity; i++) {
          const seatNumber = `A${i.toString().padStart(2, "0")}`;
          seats.push({ trip: trip._id, seatNumber, status: SEAT_STATUS.EMPTY });
        }
      } else {
        // Chia ghế thành hai nhóm A và B
        const halfCapacity = Math.ceil(seatCapacity / 2);
          // Tạo nhóm A
        for (let i = 1; i <= halfCapacity; i++) {
          const seatNumber = `A${i.toString().padStart(2, "0")}`;
          seats.push({ trip: trip._id, seatNumber, status: SEAT_STATUS.EMPTY });
        }
          // Tạo nhóm B
        for (let i = 1; i <= seatCapacity - halfCapacity; i++) {
          const seatNumber = `B${i.toString().padStart(2, "0")}`;
          seats.push({ trip: trip._id, seatNumber, status: SEAT_STATUS.EMPTY });
        }
      }
        // Lưu danh sách ghế vào cơ sở dữ liệu
      await Seats.insertMany(seats);
        res.json({
        message: "Trip created successfully",
        trip,
        seats,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */
  createTrip: function createTrip(req, res) {
    var _req$body, route, bus, departureTime, arrivalTime, status, busInfo, busRouteInfo, ticketPrice, trip, seatCapacity, seats, i, seatNumber, halfCapacity, _i, _seatNumber, _i2, _seatNumber2;

    return regeneratorRuntime.async(function createTrip$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, route = _req$body.route, bus = _req$body.bus, departureTime = _req$body.departureTime, arrivalTime = _req$body.arrivalTime, status = _req$body.status; // Lấy thông tin xe và tuyến xe

            _context.next = 4;
            return regeneratorRuntime.awrap(_bus["default"].findById(bus).exec());

          case 4:
            busInfo = _context.sent;
            _context.next = 7;
            return regeneratorRuntime.awrap(_busRoutes["default"].findById(route).exec());

          case 7:
            busRouteInfo = _context.sent;

            if (!(busInfo.status !== "OPEN")) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "Không thể thêm. Vì xe này hiện tại không hoạt động"
            }));

          case 10:
            if (!(busRouteInfo.status !== "OPEN")) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "Không thể thêm. Vì tuyến đường hiện tại không hoạt động"
            }));

          case 12:
            // Tính toán giá vé
            ticketPrice = busRouteInfo.distance * busRouteInfo.pricePerKM * busInfo.priceFactor;

            if (!(!busInfo || !busRouteInfo)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              message: "Không tìm thấy xe hoặc tuyến đường"
            }));

          case 15:
            _context.next = 17;
            return regeneratorRuntime.awrap(new _trips["default"]({
              route: route,
              bus: bus,
              price: ticketPrice,
              availableSeats: busInfo.seatCapacity || 0,
              departureTime: departureTime,
              arrivalTime: arrivalTime,
              status: status
            }).save());

          case 17:
            trip = _context.sent;
            // Lấy số ghế từ seatCapacity
            seatCapacity = busInfo.seatCapacity; // Danh sách để lưu ghế

            seats = [];

            if (seatCapacity <= 16) {
              // Tạo ghế từ A01 đến A<seatCapacity>
              for (i = 1; i <= seatCapacity; i++) {
                seatNumber = "A".concat(i.toString().padStart(2, "0"));
                seats.push({
                  trip: trip._id,
                  seatNumber: seatNumber,
                  status: _index.SEAT_STATUS.EMPTY
                });
              }
            } else {
              // Chia ghế thành hai nhóm A và B
              halfCapacity = Math.ceil(seatCapacity / 2); // Tạo nhóm A

              for (_i = 1; _i <= halfCapacity; _i++) {
                _seatNumber = "A".concat(_i.toString().padStart(2, "0"));
                seats.push({
                  trip: trip._id,
                  seatNumber: _seatNumber,
                  status: _index.SEAT_STATUS.EMPTY
                });
              } // Tạo nhóm B


              for (_i2 = 1; _i2 <= seatCapacity - halfCapacity; _i2++) {
                _seatNumber2 = "B".concat(_i2.toString().padStart(2, "0"));
                seats.push({
                  trip: trip._id,
                  seatNumber: _seatNumber2,
                  status: _index.SEAT_STATUS.EMPTY
                });
              }
            } // Lưu danh sách ghế vào cơ sở dữ liệu


            _context.next = 23;
            return regeneratorRuntime.awrap(_seats["default"].insertMany(seats));

          case 23:
            res.json({
              message: "Trip created successfully",
              trip: trip,
              seats: seats
            });
            _context.next = 29;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context.t0.message
            });

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 26]]);
  },
  getTrips: function getTrips(req, res) {
    var _req$query, _req$query$page, page, _req$query$limit, limit, trips, count, totalPage, currentPage, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, trip, availableSeats;

    return regeneratorRuntime.async(function getTrips$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? _index.PAGINATION.PAGE : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? _index.PAGINATION.LIMIT : _req$query$limit;
            _context2.next = 4;
            return regeneratorRuntime.awrap(_trips["default"].find().populate(["route", "bus"]).sort("-createdAt").skip((page - 1) * limit).limit(limit * 1).exec());

          case 4:
            trips = _context2.sent;
            _context2.next = 7;
            return regeneratorRuntime.awrap(_trips["default"].countDocuments());

          case 7:
            count = _context2.sent;
            totalPage = Math.ceil(count / limit);
            currentPage = Number(page); // Tính số ghế trống cho mỗi chuyến xe và thêm vào dữ liệu chuyến xe

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 13;
            _iterator = trips[Symbol.iterator]();

          case 15:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 24;
              break;
            }

            trip = _step.value;
            _context2.next = 19;
            return regeneratorRuntime.awrap(_seats["default"].countDocuments({
              trip: trip._id,
              status: _index.SEAT_STATUS.EMPTY
            }));

          case 19:
            availableSeats = _context2.sent;
            // Thêm availableSeats vào mỗi chuyến xe
            trip.availableSeats = availableSeats;

          case 21:
            _iteratorNormalCompletion = true;
            _context2.next = 15;
            break;

          case 24:
            _context2.next = 30;
            break;

          case 26:
            _context2.prev = 26;
            _context2.t0 = _context2["catch"](13);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 30:
            _context2.prev = 30;
            _context2.prev = 31;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 33:
            _context2.prev = 33;

            if (!_didIteratorError) {
              _context2.next = 36;
              break;
            }

            throw _iteratorError;

          case 36:
            return _context2.finish(33);

          case 37:
            return _context2.finish(30);

          case 38:
            res.json({
              data: trips,
              totalPage: totalPage,
              currentPage: currentPage
            });
            _context2.next = 44;
            break;

          case 41:
            _context2.prev = 41;
            _context2.t1 = _context2["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context2.t1.message
            });

          case 44:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 41], [13, 26, 30, 38], [31,, 33, 37]]);
  },
  getTrip: function getTrip(req, res) {
    var id, trip;
    return regeneratorRuntime.async(function getTrip$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _context3.next = 4;
            return regeneratorRuntime.awrap(_trips["default"].findById(id).populate(["route", "bus"]).exec());

          case 4:
            trip = _context3.sent;
            res.json(trip);
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

  /* updateTrip: async (req, res) => {
    try {
      const { id } = req.params;
      const { route, bus, departureTime, arrivalTime, status } = req.body;
        // Kiểm tra tính hợp lệ của status
      if (status && !Object.values(TRIP_STATUS).includes(status)) {
        return res.status(400).json({
          message: "Trạng thái bạn chọn không hợp lệ.",
        });
      }
        // Lấy thông tin xe buýt và tuyến xe
      const busInfo = await Bus.findById(bus).exec();
      const busRouteInfo = await BusRoutes.findById(route).exec();
        if (!busInfo || !busRouteInfo) {
        return res.status(404).json({
          message: "Không tìm thấy xe buýt hoặc tuyến đường, vui lòng thử lại.",
        });
      }
        // Kiểm tra trạng thái thời gian chuyến đi
      const now = new Date();
      const departureDate = new Date(departureTime);
      const arrivalDate = new Date(arrivalTime);
        if (departureDate <= now && now <= arrivalDate) {
        return res.status(400).json({
          message:
            "Không thể cập nhật trạng thái. Chuyến xe hiện tại đang chạy.",
        });
      }
        // Cập nhật chuyến đi
      const newTrip = await Trip.findByIdAndUpdate(
        id,
        {
          route,
          bus,
          departureTime,
          arrivalTime,
          status, // Cập nhật thêm trường status
        },
        { new: true } // Trả về document mới sau khi cập nhật
      ).exec();
        if (!newTrip) {
        return res.status(404).json({
          message: "Không tìm thấy chuyến xe, vui lòng thử lại",
        });
      }
        res.json(newTrip);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }, */
  updateTrip: function updateTrip(req, res) {
    var id, _req$body2, route, bus, departureTime, arrivalTime, status, busInfo, busRouteInfo, now, departureDate, arrivalDate, tickets, ticketBlocked, newTrip;

    return regeneratorRuntime.async(function updateTrip$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _req$body2 = req.body, route = _req$body2.route, bus = _req$body2.bus, departureTime = _req$body2.departureTime, arrivalTime = _req$body2.arrivalTime, status = _req$body2.status; // Kiểm tra tính hợp lệ của status

            if (!(status && !Object.values(_index.TRIP_STATUS).includes(status))) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: "Trạng thái bạn chọn không hợp lệ."
            }));

          case 5:
            _context4.next = 7;
            return regeneratorRuntime.awrap(_bus["default"].findById(bus).exec());

          case 7:
            busInfo = _context4.sent;
            _context4.next = 10;
            return regeneratorRuntime.awrap(_busRoutes["default"].findById(route).exec());

          case 10:
            busRouteInfo = _context4.sent;

            if (!(!busInfo || !busRouteInfo)) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "Không tìm thấy xe buýt hoặc tuyến đường, vui lòng thử lại."
            }));

          case 13:
            // Kiểm tra trạng thái thời gian chuyến đi
            now = new Date();
            departureDate = new Date(departureTime);
            arrivalDate = new Date(arrivalTime);

            if (!(departureDate <= now && now <= arrivalDate)) {
              _context4.next = 18;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: "Không thể cập nhật trạng thái. Chuyến xe hiện tại đang chạy."
            }));

          case 18:
            if (!(status === "CLOSED")) {
              _context4.next = 25;
              break;
            }

            _context4.next = 21;
            return regeneratorRuntime.awrap(_tickets["default"].find({
              trip: id
            }).exec());

          case 21:
            tickets = _context4.sent;
            // Kiểm tra nếu có vé nào có trạng thái là PAID, PAYMENTPENDING hoặc PENDING
            ticketBlocked = tickets.some(function (ticket) {
              return ["PAID", "PAYMENTPENDING", "PENDING"].includes(ticket.status);
            });

            if (!ticketBlocked) {
              _context4.next = 25;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: "Không thể chuyển chuyến xe này thành CLOSED vì có vé đã thanh toán hoặc đang chờ thanh toán."
            }));

          case 25:
            _context4.next = 27;
            return regeneratorRuntime.awrap(_trips["default"].findByIdAndUpdate(id, {
              route: route,
              bus: bus,
              departureTime: departureTime,
              arrivalTime: arrivalTime,
              status: status // Cập nhật thêm trường status

            }, {
              "new": true
            } // Trả về document mới sau khi cập nhật
            ).exec());

          case 27:
            newTrip = _context4.sent;

            if (newTrip) {
              _context4.next = 30;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              message: "Không tìm thấy chuyến xe, vui lòng thử lại"
            }));

          case 30:
            res.json(newTrip);
            _context4.next = 36;
            break;

          case 33:
            _context4.prev = 33;
            _context4.t0 = _context4["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context4.t0.message
            });

          case 36:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 33]]);
  },
  removeTrip: function removeTrip(req, res) {
    var id, data, route, bus, trip;
    return regeneratorRuntime.async(function removeTrip$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return regeneratorRuntime.awrap(_trips["default"].findById(id).exec());

          case 4:
            data = _context5.sent;
            _context5.next = 7;
            return regeneratorRuntime.awrap(_busRoutes["default"].findById(data.route).exec());

          case 7:
            route = _context5.sent;
            _context5.next = 10;
            return regeneratorRuntime.awrap(_bus["default"].findById(data.bus).exec());

          case 10:
            bus = _context5.sent;
            _context5.next = 13;
            return regeneratorRuntime.awrap(_trips["default"].findByIdAndDelete(id).exec());

          case 13:
            trip = _context5.sent;
            res.json(trip);
            _context5.next = 20;
            break;

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](0);
            res.status(500).json({
              message: "Internal server error",
              error: _context5.t0.message
            });

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 17]]);
  },
  getTripsByRoute: function getTripsByRoute(req, res) {
    var _req$query2, startProvince, endProvince, departureDate, routes, routeIds, tripsQuery, startOfDay, endOfDay, trips, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, trip, availableSeats;

    return regeneratorRuntime.async(function getTripsByRoute$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _req$query2 = req.query, startProvince = _req$query2.startProvince, endProvince = _req$query2.endProvince, departureDate = _req$query2.departureDate;
            console.log("startProvince:", startProvince, "endProvince:", endProvince, "departureDate:", departureDate);
            _context6.next = 5;
            return regeneratorRuntime.awrap(_busRoutes["default"].find({
              startProvince: startProvince,
              endProvince: endProvince
            }).exec());

          case 5:
            routes = _context6.sent;

            if (!(routes.length === 0)) {
              _context6.next = 8;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "Không tìm thấy tuyến xe phù hợp."
            }));

          case 8:
            routeIds = routes.map(function (route) {
              return route._id;
            });
            tripsQuery = {
              route: {
                $in: routeIds
              }
            };

            if (departureDate) {
              // Sử dụng moment để tính toán startOfDay và endOfDay, chắc chắn là thời gian UTC hoặc múi giờ của bạn
              startOfDay = (0, _moment["default"])(departureDate).startOf("day").toDate(); // Múi giờ mặc định của hệ thống (hoặc UTC nếu muốn)

              endOfDay = (0, _moment["default"])(departureDate).endOf("day").toDate();
              console.log("startOfDay:", startOfDay);
              console.log("endOfDay:", endOfDay);
              tripsQuery.departureTime = {
                $gte: startOfDay,
                $lte: endOfDay
              };
            } else {
              tripsQuery.departureTime = {
                $gte: new Date()
              };
            }

            _context6.next = 13;
            return regeneratorRuntime.awrap(_trips["default"].find(tripsQuery).populate(["route", "bus"]).exec());

          case 13:
            trips = _context6.sent;

            if (!(trips.length === 0)) {
              _context6.next = 16;
              break;
            }

            return _context6.abrupt("return", res.status(404).json({
              message: "Không tìm thấy chuyến xe phù hợp."
            }));

          case 16:
            // Tính số ghế trống cho mỗi chuyến xe và thêm vào dữ liệu chuyến xe
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context6.prev = 19;
            _iterator2 = trips[Symbol.iterator]();

          case 21:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context6.next = 30;
              break;
            }

            trip = _step2.value;
            _context6.next = 25;
            return regeneratorRuntime.awrap(_seats["default"].countDocuments({
              trip: trip._id,
              status: _index.SEAT_STATUS.EMPTY
            }));

          case 25:
            availableSeats = _context6.sent;
            // Thêm availableSeats vào mỗi chuyến xe
            trip.availableSeats = availableSeats;

          case 27:
            _iteratorNormalCompletion2 = true;
            _context6.next = 21;
            break;

          case 30:
            _context6.next = 36;
            break;

          case 32:
            _context6.prev = 32;
            _context6.t0 = _context6["catch"](19);
            _didIteratorError2 = true;
            _iteratorError2 = _context6.t0;

          case 36:
            _context6.prev = 36;
            _context6.prev = 37;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 39:
            _context6.prev = 39;

            if (!_didIteratorError2) {
              _context6.next = 42;
              break;
            }

            throw _iteratorError2;

          case 42:
            return _context6.finish(39);

          case 43:
            return _context6.finish(36);

          case 44:
            return _context6.abrupt("return", res.status(200).json({
              trips: trips
            }));

          case 47:
            _context6.prev = 47;
            _context6.t1 = _context6["catch"](0);
            console.error("Error occurred:", _context6.t1);
            res.status(500).json({
              message: "Internal server error",
              error: _context6.t1.message
            });

          case 51:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 47], [19, 32, 36, 44], [37,, 39, 43]]);
  },
  getBusAndSeatsByTripId: function getBusAndSeatsByTripId(req, res) {
    var id, trip, bus, seats;
    return regeneratorRuntime.async(function getBusAndSeatsByTripId$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            // Lấy ID chuyến xe từ params
            id = req.params.id; // Bước 1: Tìm chuyến xe theo tripId và populate bus

            _context7.next = 4;
            return regeneratorRuntime.awrap(_trips["default"].findById(id).populate("bus"));

          case 4:
            trip = _context7.sent;

            if (trip) {
              _context7.next = 7;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              message: "Không tìm thấy chuyến xe."
            }));

          case 7:
            // Bước 3: Lấy thông tin xe buýt từ chuyến xe
            bus = trip.bus; // Bước 4: Kiểm tra nếu không tìm thấy xe buýt

            if (bus) {
              _context7.next = 10;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              message: "Không tìm thấy xe buýt cho chuyến này."
            }));

          case 10:
            _context7.next = 12;
            return regeneratorRuntime.awrap(_seats["default"].find({
              trip: trip._id
            }));

          case 12:
            seats = _context7.sent;

            if (seats.length) {
              _context7.next = 15;
              break;
            }

            return _context7.abrupt("return", res.status(404).json({
              message: "Không tìm thấy ghế cho chuyến này."
            }));

          case 15:
            return _context7.abrupt("return", res.status(200).json({
              bus: bus,
              seats: seats
            }));

          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](0);
            console.error("Error occurred:", _context7.t0);
            return _context7.abrupt("return", res.status(500).json({
              message: "Internal server error",
              error: _context7.t0.message
            }));

          case 22:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 18]]);
  },
  getTripStats: function getTripStats(req, res) {
    var _req$query3, startDate, endDate, type, start, end, dateFormat, timeRange, m, _m, year, tripStats, mappedData;

    return regeneratorRuntime.async(function getTripStats$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _req$query3 = req.query, startDate = _req$query3.startDate, endDate = _req$query3.endDate, type = _req$query3.type; // Kiểm tra tham số đầu vào

            if (!(!startDate || !endDate)) {
              _context8.next = 4;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              success: false,
              message: "Missing required parameters: startDate or endDate"
            }));

          case 4:
            start = (0, _moment["default"])(startDate);
            end = (0, _moment["default"])(endDate);

            if (!(!start.isValid() || !end.isValid())) {
              _context8.next = 8;
              break;
            }

            return _context8.abrupt("return", res.status(400).json({
              success: false,
              message: "Invalid date format"
            }));

          case 8:
            timeRange = []; // Tạo dãy thời gian (timeRange)

            if (!(type === "day")) {
              _context8.next = 14;
              break;
            }

            dateFormat = "YYYY-MM-DD";

            for (m = (0, _moment["default"])(start); m.isSameOrBefore(end); m.add(1, "days")) {
              timeRange.push(m.format(dateFormat));
            }

            _context8.next = 25;
            break;

          case 14:
            if (!(type === "month")) {
              _context8.next = 19;
              break;
            }

            dateFormat = "YYYY-MM";

            for (_m = (0, _moment["default"])(start); _m.isSameOrBefore(end); _m.add(1, "months")) {
              timeRange.push(_m.format(dateFormat));
            }

            _context8.next = 25;
            break;

          case 19:
            if (!(type === "year")) {
              _context8.next = 24;
              break;
            }

            dateFormat = "YYYY";

            for (year = start.year(); year <= end.year(); year++) {
              timeRange.push(year.toString());
            }

            _context8.next = 25;
            break;

          case 24:
            return _context8.abrupt("return", res.status(400).json({
              success: false,
              message: 'Invalid type parameter. Use "day", "month", or "year".'
            }));

          case 25:
            _context8.next = 27;
            return regeneratorRuntime.awrap(_trips["default"].aggregate([{
              $match: {
                arrivalTime: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate)
                }
              }
            }, {
              $group: {
                _id: {
                  $dateToString: {
                    format: dateFormat === "YYYY-MM-DD" ? "%Y-%m-%d" : dateFormat === "YYYY-MM" ? "%Y-%m" : "%Y",
                    date: "$arrivalTime"
                  }
                },
                tripCount: {
                  $sum: 1
                } // Đếm số chuyến xe

              }
            }, {
              $sort: {
                _id: 1
              }
            }]));

          case 27:
            tripStats = _context8.sent;
            // Bổ sung dữ liệu thiếu (trả về 0 nếu không có chuyến xe trong ngày)
            mappedData = timeRange.map(function (time) {
              var found = tripStats.find(function (item) {
                return item._id === time;
              });
              return {
                label: time,
                tripCount: found ? found.tripCount : 0
              };
            });
            res.json({
              success: true,
              data: mappedData // Dữ liệu trả về với thống kê chuyến xe

            });
            _context8.next = 36;
            break;

          case 32:
            _context8.prev = 32;
            _context8.t0 = _context8["catch"](0);
            console.error("Error fetching trips:", _context8.t0);
            res.status(500).json({
              success: false,
              message: "Internal server error"
            });

          case 36:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[0, 32]]);
  },
  getTripTop: function getTripTop(req, res) {
    var tripStats, busIds, busRoutes, result;
    return regeneratorRuntime.async(function getTripTop$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return regeneratorRuntime.awrap(_trips["default"].aggregate([{
              $group: {
                _id: "$route",
                // Nhóm theo `bus`
                tripCount: {
                  $sum: 1
                } // Đếm số chuyến

              }
            }, {
              $sort: {
                tripCount: -1
              }
            }, // Sắp xếp giảm dần
            {
              $limit: 10
            } // Lấy top 10
            ]));

          case 3:
            tripStats = _context9.sent;
            // Lấy danh sách `bus` từ kết quả
            busIds = tripStats.map(function (stat) {
              return stat._id;
            });
            console.log(busIds); // Query 2: Lấy thông tin `startProvince` và `endProvince` từ bảng `busroutes`

            _context9.next = 8;
            return regeneratorRuntime.awrap(_busRoutes["default"].find({
              _id: busIds
            }));

          case 8:
            busRoutes = _context9.sent;
            // Map kết quả `tripStats` với `busRoutes`
            result = tripStats.map(function (stat) {
              var route = busRoutes.find(function (route) {
                return route._id.toString() == stat._id.toString();
              });
              return {
                label: route ? "".concat(route.startProvince, " -> ").concat(route.endProvince) : "Unknown Route",
                // Nếu không tìm thấy tuyến xe, gán nhãn là 'Unknown Route'
                tripCount: stat.tripCount
              };
            }); // Trả kết quả

            res.json({
              success: true,
              data: result
            });
            _context9.next = 17;
            break;

          case 13:
            _context9.prev = 13;
            _context9.t0 = _context9["catch"](0);
            console.error("Error fetching top routes:", _context9.t0);
            res.status(500).json({
              success: false,
              message: "Failed to fetch top routes"
            });

          case 17:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[0, 13]]);
  }
};
var _default = TripController;
exports["default"] = _default;