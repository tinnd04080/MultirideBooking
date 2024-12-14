import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { styles } from "./style";
import { getTickets } from "./api";
import Header from "../../../../components/header/index";
import { useNavigation } from "@react-navigation/native"; // Thêm import useNavigation
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../App";
import { Dropdown } from "react-native-element-dropdown";
import { useFocusEffect } from "@react-navigation/native"; // Thêm import useFocusEffect
import {
  formatCurrency,
  formatTime,
  formatTimeDate,
  formatDate,
  getStatusTextTicket,
} from "../../../../utils/formatUtils";
interface Tickets {
  _id: string;
  time: string;
  date: string;
  route: string;
  code: string;
  status: string;
  totalAmount: string;
  seatNumber: string;
  createdAt: string;
  trip: {
    departureTime: string; // Trip là một đối tượng có thuộc tính departureTime
  };
  busRoute: {
    startProvince: string;
    endProvince: string;
  };
}

const MyTicketsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Khởi tạo currentPage với giá trị mặc định
  const [totalPage, setTotalPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [filteredTickets, setFilteredTickets] = useState<Tickets[]>([]);
  const [refreshing, setRefreshing] = useState(false); // Trạng thái để hiển thị loading khi kéo xuống

  const fetchTickets = async (page: number) => {
    try {
      setLoading(true);
      const response = await getTickets(page); // Gọi API để lấy dữ liệu vé
      const { data, totalPage } = response;

      // Sắp xếp danh sách vé theo thứ tự từ mới nhất đến cũ nhất dựa vào trường `createdAt`
      const sortedTickets = data.sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA; // Sắp xếp theo thứ tự giảm dần (mới nhất ở đầu)
      });

      setTickets(page === 1 ? sortedTickets : [...tickets, ...sortedTickets]); // Nếu là trang 1, thay thế tất cả dữ liệu, nếu không thì nối thêm
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
  /* Chuyển màn h */
  const handleSelectTrip = (/* tripId: string */ trip: any) => {
    navigation.navigate("Home");
  };
  const handleSelectTicket = (ticket: Tickets) => {
    navigation.navigate("TicketDetails", { ticketId: ticket._id }); // Truyền _id (hoặc 'code' nếu đó là _id)
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
        <View style={styles.firstView}>
          {/* View chứa "Xuất phát" và thời gian */}
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.date}> Xuất bến</Text>
            <Text style={styles.time}>
              {formatTime(item.trip.departureTime)}
            </Text>
            <Text style={styles.date}>
              Ngày {formatDate(item.trip.departureTime)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            {/* Phần trạng thái */}
            <View style={[styles.statusContainer, getStatusStyle(item.status)]}>
              <Text style={styles.statusText}>
                {getStatusTextTicket(item.status)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.secondView}>
          <View>
            <Text style={styles.route}>
              Mã vé: <Text style={styles.code}>{item.code}</Text>{" "}
            </Text>
            <Text style={styles.route}>
              {item.busRoute.startProvince} - {item.busRoute.endProvince}
            </Text>
          </View>
          <View style={styles.rightSection}>
            <Text style={styles.textTotalAmount}>Giá vé:</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.price}>
                {formatCurrency(item.totalAmount)} đ
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.line} />
        <Text style={styles.createdAt}>
          Thời điểm phát hành vé: {formatTimeDate(item.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
    /*    </View> */
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Vé của tôi" />
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

          <Text style={styles.descriptionText}>
            Hãy bắt đầu đặt vé ngay để trải nghiệm những chuyến đi thú vị!
          </Text>

          <TouchableOpacity onPress={handleSelectTrip} style={styles.button}>
            <Text style={styles.buttonText}>Tìm chuyến đi ngay</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredTickets} // Sử dụng filteredTickets thay vì tickets
          /* data={tickets} */
          onRefresh={handleRefresh} // Gọi khi kéo xuống
          refreshing={refreshing} // Hiển thị trạng thái loading khi kéo xuống
          renderItem={renderItem}
          keyExtractor={(item) => item.code} // Sử dụng mã vé làm key
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

export default MyTicketsScreen;
