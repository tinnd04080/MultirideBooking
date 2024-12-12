import dayjs from "dayjs";
import { PAGINATION } from "../constants/index.js";
import BusRoutes from "../models/busRoutes.js";
import Trip from "../models/trips.js";

const BusRouteController = {
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
  createBusRoutes: async (req, res) => {
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

      // Kiểm tra xem tuyến xe đã tồn tại hay chưa
      const existingRoute = await BusRoutes.findOne({
        startProvince,
        endProvince,
      });

      if (existingRoute) {
        return res.status(400).json({
          message: "Tuyến xe đã tồn tại. Vui lòng tạo lại",
        });
      }

      // Nếu không tồn tại, tiếp tục tạo mới tuyến xe
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
  },

  getBusRoutes: async (req, res) => {
    try {
      const {
        page = PAGINATION.PAGE,
        limit = PAGINATION.LIMIT,
        startProvince,
        startDistrict,
        endProvince,
        endDistrict,
        status,
        duration,
      } = req.query;

      const queryObj = {};

      startProvince && (queryObj.startProvince = startProvince);
      startDistrict && (queryObj.startDistrict = startDistrict);
      endProvince && (queryObj.endProvince = endProvince);
      endDistrict && (queryObj.endDistrict = endDistrict);
      status && (queryObj.status = status);
      if (duration) {
        queryObj.duration = {
          $gte: dayjs(duration).startOf("day").toDate(),
          $lte: dayjs(duration).endOf("day").toDate(),
        };
      }

      const busRoutes = await BusRoutes.find(queryObj)
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

      const count = await BusRoutes.countDocuments();

      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      res.json({
        data: busRoutes,
        totalPage,
        currentPage,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  getBusRoute: async (req, res) => {
    try {
      const { id } = req.params;

      const busRoute = await BusRoutes.findById(id);

      res.json(busRoute);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
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
  updateBusRoute: async (req, res) => {
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

      // Kiểm tra nếu trạng thái muốn thay đổi là 'CLOSED'
      if (status === "CLOSED") {
        // Kiểm tra xem có chuyến xe nào với busRouteId này và có status là 'OPEN'
        const activeTrip = await Trip.findOne({ route: id, status: "OPEN" });

        if (activeTrip) {
          // Nếu có chuyến xe đang hoạt động với status 'OPEN', không cho phép thay đổi status
          return res.status(400).json({
            message:
              "Hiện đang có chuyến xe đang hoạt động. Không thể hủy tuyến.",
          });
        }
      }

      // Cập nhật BusRoute nếu không có chuyến xe đang hoạt động hoặc trạng thái của chuyến xe là 'CLOSED'
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

      // Trả về BusRoute đã được cập nhật
      res.json(busRoute);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removeBusRoute: async (req, res) => {
    try {
      const { id } = req.params;

      const busRoute = await BusRoutes.findByIdAndDelete(id);

      res.json(busRoute);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default BusRouteController;
