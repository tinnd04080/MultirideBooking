"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _index = require("../constants/index.js");

var ticketSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  trip: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "trip",
    required: true
  },
  promotion: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "promotions"
  },
  customerPhone: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  note: {
    type: String,
    "default": null
  },
  code: {
    type: String,
    required: true
  },
  seatNumber: {
    type: Array,
    required: true
  },
  boardingPoint: {
    type: String,
    required: true
  },
  dropOffPoint: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    "enum": Object.values(_index.TICKET_STATUS),
    required: true,
    "default": _index.TICKET_STATUS.PENDING
  },
  paymentMethod: {
    type: String,
    "enum": Object.values(_index.PAYMENT_METHOD),
    required: true,
    "default": _index.PAYMENT_METHOD.PENDING
  },
  invoiceCode: {
    type: String
  }
}, {
  timestamps: true
});
var Tickets = (0, _mongoose.model)("tickets", ticketSchema);
var _default = Tickets;
exports["default"] = _default;