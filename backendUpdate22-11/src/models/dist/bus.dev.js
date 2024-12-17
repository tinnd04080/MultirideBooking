"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _index = require("../constants/index.js");

var busSchema = new _mongoose.Schema({
  busTypeName: {
    type: String,
    required: true
  },
  seatCapacity: {
    type: Number,
    required: true
  },
  priceFactor: {
    type: Number,
    required: true
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    "enum": Object.values(_index.BUSES_STATUS),
    "default": _index.BUSES_STATUS.OPEN
  }
}, {
  timestamps: true
});
var Bus = (0, _mongoose.model)("buses", busSchema);
var _default = Bus;
exports["default"] = _default;