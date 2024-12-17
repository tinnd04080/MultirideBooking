import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
  Alert,
} from "react-native";
import { styles, pickerSelectStyles } from "./style";
import { provinces, popularRoutes } from "../../../data/data";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import tripApi from "../../../services/Trips/tripApi";
interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [trips, setTrips] = useState<any[]>([]);
  const [departure, setDeparture] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Helper function: format date to dd-mm-yyyy
  const formatDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };
  // Handle date selection
  const handleConfirmDate = (date: Date) => {
    // Tạo đối tượng Date mới với múi giờ UTC
    const adjustedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    console.log("UTC Adjusted Date:", adjustedDate); // Log ra giá trị chuẩn
    setDepartureDate(adjustedDate); // Cập nhật state
    setDatePickerVisible(false); // Đóng DateTimePicker
  };

  // Handle search button press
  const handleSearch = async () => {
    try {
      const response = await tripApi.getTripsByRoute(
        departure,
        destination,
        departureDate
      );
      console.log(departureDate);

      if (response && response.trips) {
        // In dữ liệu đã lấy được từ API ra console
        /* console.log("Trips data fetched:", response.trips); */
        navigation.navigate("TicketBookingScreen", {
          trips: response.trips,
          selectedDay: departureDate,
          departure: departure,
          destination: destination,
        });
      } else {
        Alert.alert("Không tìm thấy chuyến đi phù hợp.");
      }
    } catch (error: any) {
      // Log thông báo lỗi chi tiết từ server
      if (error.response) {
        /*  console.error("Error response:", error.response.data); */
        Alert.alert(
          "Vui lòng thao tác lại",
          error.response.data.message || "Có lỗi xảy ra."
        );
      } else if (error.request) {
        /*  console.error("No response received:", error.request); */
        Alert.alert("Không thể kết nối đến server");
      } else {
        /*  console.error("Unexpected error:", error.message); */
        Alert.alert("Lỗi không xác định", error.message);
      }
    }
  };

  const filterProvinces = (selectedProvince: string): string[] => {
    return provinces.filter((province) => province !== selectedProvince);
  };

  const handleItemClick = (item: any) => {
    const { title } = item;

    const cleanedTitle = title.replace(/\s*\(.*?\)\s*/g, "");

    // Split by " - " to separate departure and destination
    const [departure, destination] = cleanedTitle.split(" - ");
    setDeparture(departure);
    setDestination(destination);
  };

  // Render header content
  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/image2.png")}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchCard}>
          {/* Departure picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Điểm khởi hành</Text>
            <RNPickerSelect
              onValueChange={(value) => setDeparture(value)}
              items={filterProvinces(destination).map((province) => ({
                label: province,
                value: province,
              }))}
              placeholder={{ label: "Chọn điểm khởi hành", value: null }}
              style={pickerSelectStyles}
              value={departure}
            />
          </View>

          {/* Destination picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Điểm đến</Text>
            <RNPickerSelect
              onValueChange={(value) => setDestination(value)}
              items={filterProvinces(departure).map((province) => ({
                label: province,
                value: province,
              }))}
              placeholder={{ label: "Chọn điểm đến", value: null }}
              style={pickerSelectStyles}
              value={destination}
            />
          </View>

          {/* Date picker */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ngày khởi hành</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setDatePickerVisible(true)}
            >
              <Text style={styles.inputText}>
                {`${departureDate.getDate()}/${
                  departureDate.getMonth() + 1
                }/${departureDate.getFullYear()}`}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Tìm chuyến đi</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Các tuyến phổ biến</Text>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader()}
        data={popularRoutes}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Animated.View style={[styles.routeCard, { opacity: fadeAnim }]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleItemClick(item)}
              style={styles.routeTouchable}
            >
              <Text style={styles.routeTitle}>{item.title}</Text>
              <Text style={styles.routePrice}>{item.price}</Text>
              <Text style={styles.routeDetails}>
                Khoảng cách: {item.details}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisible(false)}
        locale="vi_VN"
        minimumDate={new Date()}
      />
    </View>
  );
};

export default HomeScreen;
