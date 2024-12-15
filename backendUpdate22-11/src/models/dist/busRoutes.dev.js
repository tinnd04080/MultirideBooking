"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _index = require("../constants/index.js");

var busRoutesSchema = new _mongoose.Schema({
  startProvince: {
    type: String,
    required: true
  },
  startDistrict: {
    type: String,
    required: true
  },
  endDistrict: {
    type: String,
    required: true
  },
  endProvince: {
    type: String,
    required: true
  },
  status: {
    type: String,
    "enum": Object.values(_index.ROUTES_STATUS),
    "default": _index.ROUTES_STATUS.OPEN
  },
  distance: {
    type: Number,
    required: true
  },
  pricePerKM: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
var BusRoutes = (0, _mongoose.model)("busRoutes", busRoutesSchema);
var _default = BusRoutes;
exports["default"] = _default;