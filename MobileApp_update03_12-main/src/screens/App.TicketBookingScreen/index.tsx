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
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons từ Expo
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
        {/*   <TouchableOpacity
          style={styles.customButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.customButtonText}>Chọn ngày khác</Text>
        </TouchableOpacity> */}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDay}
          mode="date"
          display="default"
          minimumDate={new Date()}
          // onChange={handleDateChange}
        />
      )}

      <FlatList
        data={trips}
        renderItem={({ item }) => (
          <View style={styles.ticket}>
            {/* Phần 1: Thông tin thời gian khởi hành, thời gian dự kiến đến và loại xe */}
            <View style={styles.ticketInfoTop}>
              {/* Khối chiều ngang 1 chứa các biểu tượng và đường kẻ dọc */}
              <View style={styles.iconContainer}>
                <FontAwesome name="bus" size={20} color="#006A67" />
                <View style={styles.dividerTop} />
                <FontAwesome name="map-marker" size={23} color="#F87A53" />
              </View>

              {/* Khối chiều ngang 2 chứa thông tin thời gian */}
              <View style={styles.timeContainer}>
                {/* <Text style={styles.ticketInfo}>
                  <View></View>
                  <Text>Bến xe: {item.route.startDistrict}</Text>
                  <Text>Giờ khởi hành: {formatTime(item.departureTime)}</Text>
                </Text>
                <Text style={styles.ticketInfo}>
                  Giờ đến dự kiến: {formatDateTime(item.arrivalTime)}
                </Text> */}
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
                  Còn trống{" "}
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
