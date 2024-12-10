import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./style";
import Header from "../../components/header";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App.TicketBookingScreen";
import { getTickets } from "../app/Tickets/myTickets/api";
import { Dropdown } from "react-native-element-dropdown";

interface BookingHistoryItem {
  id: string;
  route: string;
  date: string;
  status: "completed" | "canceled" | "pending";
}

interface Tickets {
  _id: string;
  time: string;
  date: string;
  route: string;
  code: string;
  status: string;
  totalAmount: string;
  seatNumber: string;
  trip: {
    departureTime: string;
  };
  busRoute: {
    startProvince: string;
    endProvince: string;
  };
}

const BookingHistoryScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [filteredTickets, setFilteredTickets] = useState<Tickets[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  /* Lấy dữ liệu từ api */
  const fetchTickets = async (page: number) => {
    try {
      setLoading(true);
      const response = await getTickets(page);
      const { data, totalPage } = response;
      setTickets(page === 1 ? data : [...tickets, ...data]);
      setTotalPage(totalPage);
    } catch (error: any) {
      console.error("Error fetching tickets:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tickets khi màn hình được focus
  useFocusEffect(
    React.useCallback(() => {
      fetchTickets(1); // Tải lại dữ liệu từ trang 1
    }, [])
  );

  // Hàm xử lý kéo xuống để làm mới dữ liệu
  const handleRefresh = () => {
    setRefreshing(true);
    fetchTickets(1); // Tải lại dữ liệu từ trang 1
    setRefreshing(false);
  };

  // Lọc vé theo tình trạng
  useEffect(() => {
    if (selectedStatus === "ALL") {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter(
        (ticket) => ticket.status === selectedStatus
      );
      setFilteredTickets(filtered);
    }
  }, [selectedStatus, tickets]);
  const handleSelectTrip = (/* tripId: string */ trip: any) => {
    navigation.navigate("Home");
  };
  const handleSelectTicket = (ticket: Tickets) => {
    navigation.navigate("TicketDetails", { ticketId: ticket._id });
  };
  // Các hàm định dạng
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatCurrency = (amount: number | string) => {
    const numericAmount =
      typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(numericAmount);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PAID":
        return styles.paid;
      case "PAYMENTPENDING":
        return styles.pending;
      case "CANCELED":
        return styles.cancelled;
      default:
        return styles.default;
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case "PAID":
        return "Đã Thanh Toán";
      case "PAYMENTPENDING":
        return "Chờ Thanh Toán";
      case "CANCELED":
        return "Bị Hủy";
      case "PENDING":
        return "Chưa xác nhận thanh toán";
      default:
        return "Vé Lỗi";
    }
  };
  /* Lọc tình trạng ve */
  useEffect(() => {
    if (selectedStatus === "ALL") {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter(
        (ticket) => ticket.status === selectedStatus
      );
      setFilteredTickets(filtered);
    }
  }, [selectedStatus, tickets]);

  // Hàm hiển thị từng vé
  const renderItem = ({ item }: { item: Tickets }) => (
    /*  <View style={styles.ticketContainer}> */
    <TouchableOpacity
      style={styles.ticketContainer}
      onPress={() => handleSelectTicket(item)} // Gọi hàm khi bấm vào mục
    >
      <View style={styles.leftSection}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Text style={styles.time}>{formatTime(item.trip.departureTime)}</Text>
          <View style={[styles.statusContainer, getStatusStyle(item.status)]}>
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View>
            <Text style={styles.date}>
              Xuất phát: {formatDate(item.trip.departureTime)}
            </Text>
            <Text style={styles.route}>
              {item.busRoute.startProvince} - {item.busRoute.endProvince}
            </Text>
          </View>
          <View style={styles.rightSection}>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.code}>{item.code}</Text>
              <Text style={styles.price}>
                {formatCurrency(item.totalAmount)} đ
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    /*    </View> */
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Lịch sử đặt vé" />
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownText}>Lọc tình trạng vé:</Text>
        <Dropdown
          value={selectedStatus}
          data={[
            { label: "Tất cả vé", value: "ALL" },
            { label: "Đã thanh toán", value: "PAID" },
            { label: "Chờ thanh toán", value: "PAYMENTPENDING" },
            { label: "Bị hủy", value: "CANCELED" },
          ]}
          onChange={(item) => setSelectedStatus(item.value)}
          placeholder="Chọn tình trạng vé"
          style={styles.dropdown}
          labelField="label"
          valueField="value"
        />
      </View>
      {tickets.length === 0 ? (
        <View style={styles.noTicketsContainer}>
          <Text style={styles.noTicketsText}>Bạn chưa có vé nào</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTickets}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          style={{ marginHorizontal: 15 }}
          onEndReached={() => {
            if (currentPage < totalPage) setCurrentPage((prev) => prev + 1);
          }}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading ? <ActivityIndicator size="small" color="#0000ff" /> : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default BookingHistoryScreen;
