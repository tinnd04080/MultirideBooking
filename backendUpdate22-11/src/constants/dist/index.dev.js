"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.PAGINATION =
  exports.NOTIFICATION_TYPE =
  exports.DISCOUNT_TYPE =
  exports.TICKET_STATUS =
  exports.PAYMENT_METHOD =
  exports.SEAT_STATUS =
  exports.PROMOTIONT_STATUS =
  exports.BUSES_STATUS =
  exports.TRIP_STATUS =
  exports.ROUTES_STATUS =
  exports.USER_STATUS =
  exports.ROLE =
    void 0;

/* START USER  */
var ROLE = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  CUSTOMER: "CUSTOMER",
};
exports.ROLE = ROLE;
var USER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};
/* END USER  */

/* Trạng thái hoạt động tuyến, chuyến, xe */

exports.USER_STATUS = USER_STATUS;
var ROUTES_STATUS = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
};
exports.ROUTES_STATUS = ROUTES_STATUS;
var TRIP_STATUS = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
};
exports.TRIP_STATUS = TRIP_STATUS;
var BUSES_STATUS = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
};
/* END */

exports.BUSES_STATUS = BUSES_STATUS;
var PROMOTIONT_STATUS = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
};
exports.PROMOTIONT_STATUS = PROMOTIONT_STATUS;
var SEAT_STATUS = {
  EMPTY: "EMPTY",
  SOLD: "SOLD",
};
exports.SEAT_STATUS = SEAT_STATUS;
var PAYMENT_METHOD = {
  OFFLINEPAYMENT: "OFFLINEPAYMENT",
  ZALOPAY: "ZALOPAY",
  PENDING: "PENDING",
};
exports.PAYMENT_METHOD = PAYMENT_METHOD;
var TICKET_STATUS = {
  PAYMENTPENDING: "PAYMENTPENDING",
  PENDING: "PENDING",
  // chờ xử lý
  INITIAL: "INITIAL",
  PAID: "PAID",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  CANCELED: "CANCELED",
};
/* Trường giá trị giảm giá  */

exports.TICKET_STATUS = TICKET_STATUS;
var DISCOUNT_TYPE = {
  AMOUNT: "AMOUNT",
  PERCENT: "PERCENT",
};
exports.DISCOUNT_TYPE = DISCOUNT_TYPE;
var NOTIFICATION_TYPE = {
  PAYMENT_REMIND: "PAYMENT_REMIND",
  // nhắc thanh toán vé
  TICKET_BOOK_SUCCESS: "TICKET_BOOK_SUCCESS",
  // thanh toán thành công
  TICKET_BOOK_FAILED: "TICKET_BOOK_FAILED",
  // thanh toán thất bại
  TICKET_CANCELED: "TICKET_CANCELED", // vé bị huỷ
};
exports.NOTIFICATION_TYPE = NOTIFICATION_TYPE;
var PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
};
exports.PAGINATION = PAGINATION;
