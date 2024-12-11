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
import { getOnTicket, Ticket } from "../TicketDetail/api"; // Đảm bảo import API đúng
/* import Header from "../../../../components/header/index"; */
import CustomHeader from "../../../../components/HeaderTicketDetails/index";
import { useNavigation } from "@react-navigation/native"; // Import hook từ React Navigation
import { styles } from "./style";
import { Image } from "react-native"; // Đảm bảo nhập đúng Image từ react-native
import PaymentComponent from "../../../../components/payment/index"; // Sử dụng export theo tên
interface TicketDetailsProps {
  route: { params: { ticketId: string } };
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ route }) => {
  const navigation = useNavigation(); // Lấy đối tượng navigation từ context
  const { ticketId } = route.params; // Lấy ticketId từ route.params
  const [ticketData, setTicketData] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false); // State cho RefreshControl

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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const data = await getOnTicket(ticketId); // Gọi API để lấy thông tin vé
        setTicketData(data); // Lưu dữ liệu vào state
        console.log(data);
      } catch (err) {
        setError("Error fetching ticket data");
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, [ticketId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!ticketData) {
    return <Text>No ticket data found.</Text>;
  }

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
      {/*  <Header title="Chi tiết vé" /> */}
      <CustomHeader
        title="Chi tiết vé"
        navigation={navigation}
        backTo="Ticket"
      />
      <View style={styles.ticketBox}>
        {/* Tiêu đề chính */}
        <Text style={styles.mainTitle}>Chi tiết vé</Text>

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
              {ticketData.trip.route.startProvince} -{" "}
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
            source={require("../../../../assets/logoSplash.png")} // Thay thế bằng đường dẫn tới logo của bạn
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
              {formatCurrency(ticketData.totalAmount)} VND
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phương thức thanh toán:</Text>
              <Text style={styles.value}>
                {getpaymentMethodText(ticketData.paymentMethod) || "Không có"}
              </Text>
            </View>
          </View>
        </View>
        {ticketData.status === "PENDING" && (
          <PaymentComponent dataTickes={ticketData} />
        )}
      </View>
    </ScrollView>
  );
};

export default TicketDetails;
