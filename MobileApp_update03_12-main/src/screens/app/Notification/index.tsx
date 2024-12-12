import {
  Image,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { styles } from "./style";
import { FlashList } from "@shopify/flash-list";
import Header from "../../../components/headerApp";
import { useEffect, useState } from "react";
import { getNotifications } from "../../../services/Notification/notificationApi";

interface Notification {
  date: string;
  status: string;
  route: string;
  time: string;
  seats: string;
  success: boolean;
}

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Hiển thị loading ban đầu

  const renderItem = ({ item }: { item: Notification }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.date}>{item.date}</Text>
      <View
        style={[
          styles.notificationBox,
          item.success ? styles.successBox : styles.failedBox,
        ]}
      >
        <Image
          source={
            item.success
              ? require("../../../assets/pass.png")
              : require("../../../assets/false.png")
          }
          style={styles.icon}
        />
        <View style={styles.infoContainer}>
          <Text style={item.success ? styles.successText : styles.failedText}>
            {item.status}
          </Text>
          {/* Uncomment nếu cần hiển thị thêm thông tin */}
          {/* 
          <Text style={styles.route}>Tuyến: {item.route}</Text>
          <Text style={styles.time}>Thời gian: {item.time}</Text>
          <Text style={styles.seats}>Ghế: {item.seats}</Text> 
          */}
        </View>
      </View>
    </View>
  );

  const fetchNotifications = async () => {
    try {
      const ticketData = await getNotifications();
      console.log("Stored Tickets:", ticketData);

      // Map tickets to notifications
      const tickets: Notification[] =
        ticketData?.data?.map((item: any) => {
          const ticket = item.ticket;
          const statusMapping = {
            TICKET_BOOK_SUCCESS: "Đặt vé thành công",
            TICKET_BOOK_FAILED: "Đặt vé thất bại",
            TICKET_CANCELED: "Vé đã bị hủy",
          };

          return {
            date: new Date(item.createdAt).toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            status: statusMapping[item.type] || "Không xác định",
            route: `${ticket?.boardingPoint || "Chưa xác định"} - ${
              ticket?.dropOffPoint || "Chưa xác định"
            }`,
            time: ticket
              ? new Date(ticket.createdAt).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A",
            seats: ticket?.seatNumber?.join(", ") || "N/A",
            success: item.type === "TICKET_BOOK_SUCCESS",
          };
        }) || [];

      // Chỉ cập nhật nếu dữ liệu thay đổi
      if (JSON.stringify(notifications) !== JSON.stringify(tickets)) {
        setNotifications(tickets);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false); // Dừng loading sau lần fetch đầu tiên
    }
  };

  useEffect(() => {
    fetchNotifications(); // Lấy dữ liệu lần đầu

    const intervalId = setInterval(() => {
      fetchNotifications(); // Gọi lại API mỗi 10 giây
    }, 10000); // 10 giây

    return () => {
      clearInterval(intervalId); // Dọn dẹp interval khi unmount
    };
  }, [notifications]); // Theo dõi notifications để cập nhật nếu cần

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Thông báo" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlashList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={50}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
