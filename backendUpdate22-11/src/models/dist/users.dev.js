"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _index = require("../constants/index.js");

var userSchema = new _mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  cccd: {
    type: String,
    "default": null
  },
  isVerified: {
    type: Boolean,
    "default": false
  },
  status: {
    type: String,
    // kiểu dữ liệu được định nghĩa là : Chuỗi
    "enum": Object.values(_index.USER_STATUS),
    // giới hạn giá trị cho trường status. chỉ được nằm trong danh sách các giá trị của USER_STATUS (ở đây là "ACTIVE" và "INACTIVE")
    "default": _index.USER_STATUS.ACTIVE,
    // Nếu không chỉ định giá trị status khi tạo, mặc định giá trị sẽ là "ACTIVE".
    required: true // Trường status bắt buộc phải có giá trị khi tạo một bản ghi mới.

  }
}, {
  timestamps: true
});
userSchema.set("toJSON", {
  transform: function transform(doc, ret, opt) {
    delete ret["password"];
    return ret;
  }
});
var User = (0, _mongoose.model)("users", userSchema);
var _default = User;
exports["default"] = _default;