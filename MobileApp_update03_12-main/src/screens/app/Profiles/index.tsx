import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../../../components/headerApp";
import profileApi from "../../../services/updateUser/updateAPI";

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current; // Khởi tạo giá trị xoay

  const [initialValues, setInitialValues] = useState({
    fullname: "",
  });

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Huỷ",
        onPress: () => console.log("Huỷ bỏ đăng xuất"),
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: () => {
          // Bắt đầu xoay màn hình
          setIsLoggingOut(true);
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 3000, // Thời gian xoay 3 giây
            useNativeDriver: true,
          }).start(() => {
            // Sau khi xoay xong, điều hướng về màn hình đăng nhập
            navigation.navigate("LoginScreen");
          });
        },
      },
    ]);
  };

  const fetchProfile = async () => {
    try {
      const profile = await profileApi.getProfile();
      setInitialValues({
        fullname: profile.fullname || "",
      });
    } catch (error) {
      Alert.alert("Lỗi!");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Tính toán giá trị xoay cho màn hình
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Tạo hiệu ứng xoay 360 độ
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Profile" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Animated.Image
            source={require("../../../assets/logoSplash.png")}
            style={[styles.avatar, { transform: [{ rotate: spin }] }]}
          />
          <Text style={styles.title}>{initialValues.fullname}</Text>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>Quản lý</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("EditProfileScreen")}
        >
          <Icon name="pencil-outline" size={24} color="#333" />
          <Text style={styles.itemText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("BookingHistoryScreen")}
        >
          <Icon name="time" size={24} color="#333" />
          <Text style={styles.itemText}>Lịch Sử Chuyến Đi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("SafetyManualScreen")}
        >
          <Icon name="book" size={24} color="#333" />
          <Text style={styles.itemText}>Cẩm Nang An Toàn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("QAScreen")}
        >
          <Icon name="help-circle" size={24} color="#333" />
          <Text style={styles.itemText}>Q&A</Text>
        </TouchableOpacity>

        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>Bảo mật và Điều khoản</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("TermsAndConditionsScreen")}
        >
          <Icon name="document" size={24} color="#333" />
          <Text style={styles.itemText}>Điều khoản và điều kiện</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("PrivacyPolicyScreen")}
        >
          <Icon name="shield" size={24} color="#333" />
          <Text style={styles.itemText}>Chính Sách Quyền Riêng Tư</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("ChangePassWord")}
        >
          <Icon name="lock" size={24} color="#333" />
          <Text style={styles.itemText}>Đổi Mật Khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Đăng Xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
