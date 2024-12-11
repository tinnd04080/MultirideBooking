import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  getTicket,
  updatePaymentMethod,
} from "../../screens/CreateticketsScreen/showticket";
import { Image } from "react-native"; // Đảm bảo nhập đúng Image từ react-native
import Header from "../../components/header";
import { styles, pickerSelectStyles } from "./style";
import { payment } from "../../../src/data/data";
import RNPickerSelect from "react-native-picker-select";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import { Linking } from "react-native"; // Đảm bảo nhập đúng
import PaymentComponent from "../../components/payment"; // Sử dụng export theo tên
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"; // Import StackNavigationProp
import { RootStackParamList } from "../../screens/App.TicketBookingScreen/index";

type ItemType = {
  label: string; // Nếu `label` là chuỗi
  value: string | number; // Nếu `value` có thể là chuỗi hoặc số
  icon?: any;
};
const SuccessScreen = ({ route }: any) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { ticket } = route.params;
  const idticket = ticket._id; //"674064e71ba977f5828b3b04"
  const [ticketData, setTicketData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // State cho RefreshControl
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string>(""); // Đảm bảo giá trị mặc định không phải là null
  const [isCanceled, setIsCanceled] = useState(false); // Thêm state theo dõi tình trạng vé bị hủy

  const [timeLeft, setTimeLeft] = useState(600); // Đếm ngược từ 600 giây (10 phút)
  const token = "your-auth-token";
  /*  console.log("Dữ liệu trả về", ticketData); */

  /* Hàm lấy dữ liệu từ backend (Hàm quan trọng)  -- để lại*/
  /* const fetchTicket = async () => {
    try {
      setLoading(true);
      const data = await getTicket(idticket, token);
      setTicketData(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError("Không thể tải thông tin vé.");
      setLoading(false);
    }
  };

  // Xử lý khi kéo để làm mới
  const onRefresh = useCallback(async () => {
    setRefreshing(true); // Bật trạng thái refreshing
    setTicketData(null); // Reset lại dữ liệu vé
    setError(null); // Reset lỗi

    try {
      // Gọi lại API để tải lại thông tin vé
      const data = await getTicket(idticket, token);
      setTicketData(data); // Cập nhật dữ liệu vé mới
      setError(null); // Reset lỗi nếu có
    } catch (err) {
      setError("Không thể tải lại thông tin vé."); // Hiển thị thông báo lỗi nếu không tải được dữ liệu
    } finally {
      setRefreshing(false); // Tắt trạng thái refreshing
    }
  }, [idticket, token]);

  useEffect(() => {
    fetchTicket();

    // Thiết lập timer đếm ngược 10 phút (600 giây)
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer); // Dừng đếm ngược khi hết thời gian
          onRefresh(); // Gọi lại để làm mới trang sau khi hết 10 phút
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Cập nhật mỗi giây

    // Cleanup khi component unmount
    return () => clearInterval(timer);
  }, [onRefresh]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!ticketData) {
    return <View style={styles.center}></View>;
  } */
  // Hàm gọi API để lấy thông tin vé
  const fetchTicket = useCallback(async () => {
    try {
      const data = await getTicket(idticket, token); // Gọi API getTicket
      setTicketData(data); // Lưu thông tin vé vào state
      setError(null); // Reset lỗi nếu có
      // Kiểm tra nếu vé bị hủy
      console.log(data);

      if (data?.status === "CANCELED") {
        Alert.alert(
          "Thông báo",
          "Hết thời gian giữ vé, Vé đã bị hủy. Vui lòng tạo lại vé mới",
          [
            {
              text: "Về màn hình vé",
              onPress: () => {
                navigation.navigate("Ticket"); // Chuyển sang màn hình Ticket khi người dùng bấm OK
              },
            },
          ]
        );
      }
    } catch (err) {
      setError("Không thể tải thông tin vé."); // Hiển thị lỗi nếu có
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  }, [idticket, token, navigation]);

  // useEffect để gọi API 20 giây một lần
  useEffect(() => {
    // Nếu vé đã bị hủy thì không gọi lại API nữa
    if (isCanceled) return;
    // Gọi API lần đầu khi component mount
    fetchTicket();

    // Thiết lập interval để gọi lại API mỗi 20 giây
    const interval = setInterval(() => {
      fetchTicket();
    }, 10000); // 20 giây

    // Cleanup interval khi component unmount
    return () => {
      clearInterval(interval); // Dừng gọi API 20 giây
    };
  }, [fetchTicket, isCanceled, idticket, token, navigation]);

  // Giao diện khi đang loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Giao diện khi gặp lỗi
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  // Giao diện khi chưa có dữ liệu vé
  if (!ticketData) {
    return <View style={styles.center}></View>;
  }

  // Các hàm định dạng
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  const formatLicensePlate = (licensePlate: string) => {
    // Biểu thức chính quy để chia biển số thành các phần
    const regex = /^(\d{2})([a-zA-Z])(\d{3})(\d{2})$/;
    const regexFourDigit = /^(\d{2})([a-zA-Z])(\d{4})$/; // Đối với biển số có 4 chữ số

    const match = licensePlate.match(regex);
    const matchFourDigit = licensePlate.match(regexFourDigit);

    if (match) {
      // Định dạng cho trường hợp biển số có 3 chữ số sau
      return `${match[1]}${match[2].toUpperCase()}-${match[3]}.${match[4]}`;
    } else if (matchFourDigit) {
      // Định dạng cho trường hợp biển số có 4 chữ số sau
      return `${matchFourDigit[1]}${matchFourDigit[2].toUpperCase()}-${
        matchFourDigit[3]
      }`;
    }

    // Nếu không khớp với bất kỳ định dạng nào, trả về biển số gốc
    return licensePlate;
  };
  // Hàm xử lý hiển thị tình trạng vé
  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "CHƯA XÁC NHẬN THANH TOÁN";
      case "PAID":
        return "ĐÃ THANH TOÁN";
      case "PAYMENTPENDING":
        return "CHỜ THANH TOÁN";
      case "CANCELED":
        return "VÉ BỊ HỦY";
      case "PAYMENT_FAILED":
        return "THANH TOÁN THẤT BẠI";
      default:
        return "Tình trạng không xác định";
    }
  };
  const getpaymentMethodText = (paymentMethod: string) => {
    switch (paymentMethod) {
      case "OFFLINEPAYMENT":
        return "TẠI BẾN - XE";
      case "ZALOPAY":
        return "ZALO PAY";
      default:
        return "Tình trạng không xác định";
    }
  };

  // Hàm xử lý màu sắc của tình trạng vé
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "#00796b"; // Màu xanh dương cho đã thanh toán
      case "PENDING":
        return "#FFB200"; // Màu cam cho chưa thanh toán
      case "PAYMENTPENDING":
        return "#EB5B00"; // Màu cam cho chưa thanh toán
      case "CANCELED":
        return "#d32f2f"; // Màu đỏ cho bị hủy
      case "PAYMENT_FAILED":
        return "#f44336"; // Màu đỏ cho thất bại thanh toán
      default:
        return "#000000"; // Màu đen mặc định
    }
  };
  /* Biến tính toán */
  const originalPrice = ticketData.seatNumber.length * ticketData.trip.price;
  const discount =
    ticketData?.promotion?.discountAmount &&
    ticketData?.seatNumber?.length &&
    ticketData?.trip?.price
      ? (ticketData.promotion.discountAmount / 100) *
        (ticketData.seatNumber.length * ticketData.trip.price)
      : 0; // Giá trị mặc định nếu không có đủ thông tin

  /* start các hàm của chọn phương thức thanh toán */

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} /* onRefresh={onRefresh} */ />
      }
    >
      <Header title="Xuất vé và thanh toán" />
      <View style={styles.ticketBox}>
        {/* Tiêu đề chính */}
        <Text style={styles.mainTitle}>Chi tiết vé được đặt</Text>

        {/* Phần 1: Thông tin về nhà xe */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin chuyến đi</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mã vé:</Text>
            <Text style={styles.lableMaVe}>{ticketData.code}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Chuyến xe:</Text>
            <Text style={styles.value}>
              {ticketData.trip.route.startProvince} -
              {ticketData.trip.route.endProvince}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Điểm xuất phát:</Text>
            <Text style={styles.value}>{ticketData.boardingPoint}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Điểm đến:</Text>
            <Text style={styles.value}>{ticketData.dropOffPoint}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Thời gian xuất phát:</Text>
            <Text style={styles.value}>
              {formatDateTime(ticketData.trip.departureTime)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Thời gian dự kiến đến:</Text>
            <Text style={styles.value}>
              {formatDateTime(ticketData.trip.arrivalTime)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Vị trí ghế:</Text>
            <View style={styles.numberSeat}>
              {ticketData.seatNumber.map((seat: any, index: any) => (
                <View key={index} style={styles.selectedSeatBox}>
                  <Text style={styles.selectedSeatText}>{seat}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Sử dụng mã giảm giá:</Text>
            <View style={styles.numberSeat}>
              <Text style={styles.discount}>
                {ticketData?.promotion?.code ?? "Không có"}
              </Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Biển số xe:</Text>
            <Text style={styles.value}>
              {formatLicensePlate(ticketData.bus.licensePlate)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tình trạng vé:</Text>
            <Text
              style={[
                styles.value2,
                { color: getStatusColor(ticketData.status) },
              ]}
            >
              {getStatusText(ticketData.status)}
            </Text>
          </View>
        </View>

        {/* Đoạn đường gạch nét đứt với logo */}
        <View style={styles.dashedLineContainer}>
          <Image
            source={require("../../../assets/logo1_DaTachNen2.png")} // Thay thế bằng đường dẫn tới logo của bạn
            style={styles.watermarkLogo}
          />
          <View style={styles.dashedLine}></View>
        </View>

        {/* Phần 2: Thông tin khách hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Tên khách hàng:</Text>
            <Text style={styles.value}>{ticketData.customerName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Số điện thoại:</Text>
            <Text style={styles.value}>{ticketData.customerPhone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Ghi chú:</Text>
            <Text style={styles.value}>{ticketData.note || "Không có"}</Text>
          </View>
        </View>

        {/* Phần 3: Chi phí chuyến xe */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi phí chuyến xe</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Tạm tính ban đầu:</Text>
              <Text style={styles.value}>
                {`${formatCurrency(originalPrice)} VNĐ`}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Giảm giá:</Text>
              <Text style={styles.value}>
                - {`${formatCurrency(discount)} VNĐ`}
              </Text>
            </View>
            <Text style={styles.labelTolal}>Tổng tiền:</Text>
            <Text style={styles.valueHighlight}>
              {formatCurrency(ticketData.totalAmount)} VNĐ
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phương thức thanh toán:</Text>
              <Text style={styles.value}>
                {getpaymentMethodText(ticketData.paymentMethod) || "Không có"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* <View style={styles.viewtwo}>
        <View style={styles.containerTime}>
          <View style={styles.sectionTime}>
            <Text style={styles.lableTime}>Thời gian giữ vé còn lại </Text>
            <Text style={styles.countdownText}>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          </View>
        </View>
        <View style={styles.sectionPay}>
          <Text style={styles.sectionTitlePay}>Phương thức thanh toán: </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={payment}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Chọn phương thức thanh toán"
            value={value}
            onChange={(item) => {
              setValue(item.value);
              console.log("Người dùng đã chọn:", item);
            }}
            renderLeftIcon={() =>
              // Hiển thị icon khi có giá trị được chọn
              selectedIcon ? (
                <Image style={styles.selectedIcon} source={selectedIcon} />
              ) : null
            }
            renderItem={renderItem}
          />
        </View> */}
      {/* Phần 4: Đếm ngược */}
      {/* <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handlePaymentUpdate} // Gọi hàm gửi dữ liệu lên API khi nhấn nút
          >
            <Text style={styles.buttonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View> */}
      {/* </View> */}
      <PaymentComponent dataTickes={ticket} />
    </ScrollView>
  );
};

export default SuccessScreen;
