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
  const [loading, setLoading] = useState<boolean>(false);

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
          <Text style={styles.route}>Tuyến: {item.route}</Text>
          <Text style={styles.time}>Thời gian: {item.time}</Text>
          <Text style={styles.seats}>Ghế: {item.seats}</Text>
        </View>
      </View>
    </View>
  );

  const fetchNotifications = async () => {
    setLoading(true);
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

      setNotifications(tickets);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchNotifications(); // Fetch notifications every 5 seconds
    }, 5000); // Update every 5 seconds

    return () => {
      clearInterval(intervalId); // Clear interval when component unmounts
    };
  }, []);

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
