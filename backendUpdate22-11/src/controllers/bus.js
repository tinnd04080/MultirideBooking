import { PAGINATION } from "../constants/index.js";
import Bus from "../models/bus.js";
import Trip from "../models/trips.js";

const BusController = {

  /* Hàm tạo xe. Cập nhật ngày 01/12 */
  createBus: async (req, res) => {
    try {
      // Lấy thông tin từ body request
      const { busTypeName, seatCapacity, priceFactor, licensePlate, status } =
        req.body;

      // Kiểm tra nếu biển số đã tồn tại
      const existingBus = await Bus.findOne({ licensePlate });
      if (existingBus) {
        return res.status(400).json({ message: "Biển số xe đã tồn tại" });
      }

      // Tạo mới một xe bus với trường status, nếu không có thì mặc định là OPEN
      const bus = await new Bus({
        busTypeName,
        seatCapacity,
        priceFactor,
        licensePlate,
        status: status || BUSES_STATUS.OPEN, // Nếu không có status, sử dụng mặc định là OPEN
      }).save();

      res.json(bus);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // Hàm lấy danh sách các bus với phân trang
  getBuses: async (req, res) => {
    try {
      const { page = PAGINATION.PAGE, limit = PAGINATION.LIMIT } = req.query;

      // Lấy danh sách xe bus với phân trang
      const buses = await Bus.find()
        .sort("-createdAt")
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

      const count = await Bus.countDocuments();
      const totalPage = Math.ceil(count / limit);
      const currentPage = Number(page);

      res.json({
        data: buses,
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

  // Hàm lấy thông tin chi tiết một bus theo id
  getBus: async (req, res) => {
    try {
      const { id } = req.params;

      const bus = await Bus.findById(id).exec();

      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }

      res.json(bus);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  updateBus: async (req, res) => {
    try {
      const { id } = req.params;
      const { busTypeName, seatCapacity, priceFactor, licensePlate, status } =
        req.body;

      // Kiểm tra nếu status là 'CLOSED', thực hiện kiểm tra tình trạng chuyến xe
      if (status === "CLOSED") {
        // Truy vấn tất cả các chuyến xe liên quan đến bus này có status = "OPEN"
        const tripUsingBus = await Trip.findOne({ bus: id, status: "OPEN" });
        console.log(tripUsingBus);

        // Nếu tìm thấy chuyến xe nào có status là "OPEN", không cho phép chuyển bus thành "CLOSED"
        if (tripUsingBus) {
          return res.status(400).json({
            message:
              "Xe đang hoạt động trong một chuyến xe. Không thể chuyển đổi trạng thái",
          });
        }
      }

      // Cập nhật thông tin xe bus, bao gồm trường status nếu có
      const bus = await Bus.findByIdAndUpdate(
        id,
        {
          busTypeName,
          seatCapacity,
          priceFactor,
          licensePlate,
          status, // Cập nhật trường status
        },
        { new: true }
      ).exec();

      // Kiểm tra nếu không tìm thấy bus
      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }

      // Trả về thông tin bus đã cập nhật
      res.json(bus);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  removeBus: async (req, res) => {
    try {
      const { id } = req.params;

      const bus = await Bus.findByIdAndDelete(id).exec();

      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }

      res.json({ message: "Bus removed successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },
};

export default BusController;
