"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../middlewares/auth.js");

var _tickets = _interopRequireDefault(require("../controllers/tickets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ticketRouter = _express["default"].Router();

ticketRouter.get("/", _auth.checkLogin, _tickets["default"].getTickets);
ticketRouter.get("/revenue-stats", _auth.checkLogin, _tickets["default"].getRevenue);
ticketRouter.get("/user-top", _auth.checkLogin, _tickets["default"].getTopUsers);
ticketRouter.get("/me", _auth.checkLogin, _tickets["default"].getMyTickets);
ticketRouter.post("/callbackPay", _tickets["default"].callbackPay);
ticketRouter.post("/create", _auth.checkLogin, _tickets["default"].createTicket);
ticketRouter.get("/:id", _auth.checkLogin, _tickets["default"].getTicket);
ticketRouter.put("/update-status/:id", _auth.checkLogin, _tickets["default"].updateTicketStatus);
ticketRouter.post("/payment/:id", _auth.checkLogin, _tickets["default"].updateTicketPaymentMethod);
/* ticketRouter.post("/zalopaypayment", TicketController.createzalopaypaymentUrl); */

ticketRouter.post("/order-status/:app_trans_id", _tickets["default"].oderStatusPay);
var _default = ticketRouter;
exports["default"] = _default;