import React, { useEffect, useState } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { styles } from "./style";
import Header from "../../components/header";

interface BookingHistoryItem {
  id: string;
  route: string;
  date: string;
  status: "completed" | "canceled" | "pending";
}

const bookingData: BookingHistoryItem[] = [
  {
    id: "1",
    route: "Hà Nội - Hồ Chí Minh",
    date: "2024-12-01",
    status: "completed",
  },
  {
    id: "2",
    route: "Đà Nẵng - Quảng Ngãi",
    date: "2024-12-02",
    status: "canceled",
  },
  {
    id: "3",
    route: "Huế - Quảng Nam",
    date: "2024-12-03",
    status: "pending",
  },
];

const BookingHistoryScreen: React.FC = () => {
  const [bookings, setBookings] = useState<BookingHistoryItem[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setBookings(bookingData);
    }, 1000);
  }, []);

  const renderBookingItem = ({ item }: { item: BookingHistoryItem }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.routeText}>Tuyến: {item.route}</Text>
        <Text style={styles.dateText}>Ngày đặt: {item.date}</Text>
        <Text style={[styles.statusText, styles[item.status]]}>
          Trạng thái:{" "}
          {item.status === "completed"
            ? "Hoàn tất"
            : item.status === "canceled"
            ? "Đã hủy"
            : "Đang xử lý"}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Lịch sử đặt vé" />
      {bookings.length === 0 ? (
        <Text style={styles.emptyText}>Đang tải dữ liệu...</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default BookingHistoryScreen;
