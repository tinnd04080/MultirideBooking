"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _index = require("../constants/index.js");

var permissionSchema = new _mongoose.Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  role: {
    type: String,
    "enum": Object.values(_index.ROLE),
    required: true
  }
}, {
  timestamps: true
});
var Permission = (0, _mongoose.model)("permissions", permissionSchema);
var _default = Permission;
exports["default"] = _default;