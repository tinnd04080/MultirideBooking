import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./style";
import Header from "../../components/header";
import { useNavigation } from "@react-navigation/native"; // Thêm import useNavigation
import { string } from "yup";
import { StackNavigationProp } from "@react-navigation/stack";

/* import dayjs from "dayjs"; // Sử dụng dayjs để làm việc với thời gian dễ dàng hơn */
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"; // Plugin để so sánh ngày giờ
import utc from "dayjs/plugin/utc"; // Plugin hỗ trợ UTC
import { Dropdown } from "react-native-element-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons"; // Sử dụng đúng cách với FontAwesome từ @expo/vector-icons
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

// Sử dụng các plugin
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);
// Định nghĩa kiểu cho props của màn hình TicketBookingScreen
interface TicketBookingScreenProps {
  route: {
    params: {
      trips: any[]; // Thêm trips vào kiểu dữ liệu của params
      selectedDay: Date;
      departure: string;
      destination: string;
    };
  };
}

// Định nghĩa kiểu cho các tham số của SeatSelectionScreen
interface SeatSelectionScreenParams {
  ticketPrice: number;
  selectedDay: Date;
  departure: string;
  destination: string;
}

// Định nghĩa kiểu cho stack navigation
export type RootStackParamList = {
  TicketBookingScreen: undefined;
  SeatSelectionScreen: { /* tripId: string */ trip: any };
  OtpScreen: { email: string };
  LoginScreen: undefined;
  ConfirmInformation: {
    // Cập nhật kiểu tham số cho màn hình ConfirmInformation
    selectedSeats: string[]; // Mảng các ghế đã chọn
    trip: any; // Hoặc thay 'any' bằng kiểu dữ liệu thực tế của trip
    seatCapacity: number; // Sức chứa ghế
  };
  CreateticketsScreen: {
    // Thông tin màn hình thành công
    ticket: {
      code: string; // Mã vé
      customerName: string; // Tên khách hàng
      customerPhone: string; // Số điện thoại khách hàng
      trip: {
        route: {
          startPoint: string; // Điểm bắt đầu
          endPoint: string; // Điểm kết thúc
        };
      };
      boardingPoint: string; // Điểm đón
      dropOffPoint: string; // Điểm trả
      seatNumber: string[]; // Danh sách ghế
      totalAmount: number; // Tổng tiền
      status: string; // Trạng thái vé
    };
  };
  Ticket: undefined;
  Home: undefined;
  TicketDetails: { ticketId: string }; // Chỉ truyền _id của vé
};

const TicketBookingScreen: React.FC<TicketBookingScreenProps> = ({ route }) => {
  const { trips, selectedDay } = route.params;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedSeatCapacity, setSelectedSeatCapacity] = useState<{
    label: string;
    value: number | null;
  } | null>(null);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  console.log("Dữ liệu được lấy từ home:", trips);

  // Lọc và sắp xếp các chuyến xe
  // Lấy thời gian hiện tại
  const currentTime = dayjs(); // Sử dụng dayjs để làm việc với thời gian dễ dàng hơn
  const filteredAndSortedTrips = trips
    .filter((trip) => {
      // Lọc chỉ những chuyến đi có departureTime chưa qua
      const tripTime = dayjs(trip.departureTime); // Chuyển departureTime thành đối tượng dayjs
      return tripTime.isSameOrAfter(currentTime) && trip.status === "OPEN"; // Kiểm tra xem departureTime có lớn hơn hoặc bằng thời gian hiện tại và trạng thái là OPEN không
    })
    .sort((a, b) => {
      const timeA = dayjs(a.departureTime).valueOf(); // Sử dụng valueOf() thay vì getTime()
      const timeB = dayjs(b.departureTime).valueOf(); // Sử dụng valueOf() thay vì getTime()
      return timeA - timeB; // Sắp xếp theo thứ tự thời gian
    });
  const filteredBySeatCapacity = selectedSeatCapacity
    ? filteredAndSortedTrips.filter(
        (trip) => trip.bus.seatCapacity === selectedSeatCapacity
      )
    : filteredAndSortedTrips;

  // Dữ liệu cho Dropdown
  const seatOptions = [
    { label: "Tất cả số ghế", value: null },
    { label: "Xe 16 chỗ - ghế ngồi", value: 16 },
    { label: "Xe 24 chỗ - phòng Vip", value: 24 },
    { label: "36 chỗ - giường nằm ", value: 36 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ hiện tại
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút hiện tại
    const day = date.getDate().toString().padStart(2, "0"); // Ngày hiện tại
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng hiện tại
    const year = date.getFullYear(); // Năm hiện tại
    return `${hours}:${minutes}`; // Trả về ngày giờ đầy đủ
  };
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ hiện tại
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút hiện tại
    const day = date.getDate().toString().padStart(2, "0"); // Ngày hiện tại
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng hiện tại
    const year = date.getFullYear(); // Năm hiện tại
    return `${hours}:${minutes} - ${day}/${month}/${year}`; // Trả về ngày giờ đầy đủ
  };
  const handleSelectTrip = (/* tripId: string */ trip: any) => {
    navigation.navigate("SeatSelectionScreen", { trip });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Chọn tuyến xe" />
      <View style={styles.dateDisplayContainer}>
        <Text style={styles.routeDisplayText}>
          Tuyến xe: {trips[0].route.startProvince}
          {" đến "}
          {trips[0].route.endProvince}
        </Text>
        <Text style={styles.currentDateText}>
          Ngày khởi hành:{" "}
          {new Date(trips[0].departureTime).toLocaleDateString("vi-VN")}
        </Text>
        <Dropdown
          renderRightIcon={() => (
            <FontAwesome5 name="chevron-down" size={15} color="#F8FAFC" />
          )}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={seatOptions}
          labelField="label"
          valueField="value"
          placeholder="Lọc theo loại xe"
          value={selectedSeatCapacity}
          onChange={(item) => setSelectedSeatCapacity(item.value)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={selectedDay}
            mode="date"
            display="default"
            minimumDate={new Date()}
            // onChange={handleDateChange}
          />
        )}
        {/* </View> */}
      </View>

      <FlatList
        data={filteredBySeatCapacity}
        renderItem={({ item }) => (
          <View style={styles.ticket}>
            {/* Phần 1: Thông tin thời gian khởi hành, thời gian dự kiến đến và loại xe */}
            <View style={styles.ticketInfoTop}>
              {/* Khối chiều ngang 1 chứa các biểu tượng và đường kẻ dọc */}
              <View style={styles.iconContainer}>
                {/* Sử dụng icon */}
                <FontAwesome5 name="bus" size={20} color="#006A67" />
                <View style={styles.dividerTop} />
                <FontAwesome5 name="map-marker-alt" size={23} color="#F87A53" />
              </View>

              {/* Khối chiều ngang 2 chứa thông tin thời gian */}
              <View style={styles.timeContainer}>
                <View style={styles.ticketInfo1}>
                  <Text style={styles.District}>
                    {item.route.startDistrict}
                  </Text>
                  <Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 15,
                        color: "#006A67",
                      }}
                    >
                      Giờ khởi hành: {""}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 17,
                        color: "#006A67",
                      }}
                    >
                      {formatTime(item.departureTime)}
                    </Text>
                  </Text>
                </View>
                <View style={styles.ticketInfo}>
                  <Text style={styles.District}>
                    {item.route.startDistrict}
                  </Text>
                  <Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 15,
                        color: "#D96542",
                      }}
                    >
                      Dự kiến đến:{" "}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 17,
                        color: "#D96542",
                      }}
                    >
                      {formatDateTime(item.arrivalTime)}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            {/* Đường kẻ giữa hai phần */}
            <View style={styles.divider}></View>

            {/* Phần 2: Chia thành 2 phần theo chiều ngang */}
            <View style={styles.ticketInfoBottom}>
              {/* Phần 2.1: Ghế trống */}
              <View style={styles.seatContainer}>
                {/* Thông tin loại xe */}

                <Text style={styles.availableSeats}>
                  {item.bus ? item.bus.busTypeName : "Không có thông tin xe"}
                </Text>
                <Text style={styles.availableSeatsb}>
                  Xe {item.bus.seatCapacity} chỗ / trống{" "}
                  <Text style={{ color: "#D70000" }}>
                    {item.availableSeats}
                  </Text>{" "}
                  chỗ
                </Text>
              </View>

              {/* Phần 2.2: Giá vé */}
              <View style={styles.priceContainer}>
                <Text style={styles.ticketPriceTitle}>Giá vé:</Text>
                <Text style={styles.ticketPriceNumber}>
                  {formatCurrency(item.price)}Đ
                </Text>
              </View>
            </View>

            {/* Thông tin ID chuyến và nút chọn chuyến */}
            {/* <Text style={styles.totalSeats}>id chuyến xe: {item._id}</Text> */}
            <TouchableOpacity
              style={styles.selectTripButton}
              onPress={() => handleSelectTrip(item)}
            >
              <Text style={styles.selectTripButtonText}>Chọn Chuyến</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.ticketContainer}
      />
    </SafeAreaView>
  );
};

export default TicketBookingScreen;
