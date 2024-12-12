"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../middlewares/auth.js");

var _users = _interopRequireDefault(require("../controllers/users.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get("/profile", _auth.checkLogin, _users["default"].getProfile);
userRouter.put("/profile", _auth.checkLogin, _users["default"].updateProfile);
userRouter.post("/profile/change-password", _auth.checkLogin, _users["default"].changeProfilePassword);
userRouter.get("/", _auth.checkLogin, _auth.isAdmin, _users["default"].getUsers);
userRouter.get("/:id", _auth.checkLogin, _auth.isAdmin, _users["default"].getUser);
userRouter.put("/:id/update-role", _auth.checkLogin, _auth.isAdmin, _users["default"].updateUserRole);
userRouter.put("/:id", _auth.checkLogin, _auth.isAdmin, _users["default"].updateUser);
userRouter["delete"]("/:id", _auth.checkLogin, _auth.isAdmin, _users["default"].removeUser);
var _default = userRouter;
exports["default"] = _default;