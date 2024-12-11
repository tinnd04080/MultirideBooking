import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import Button from "../../../components/Button/button";
import authApi from "../../../services/Auth/authApi";
import { styles } from "./style";

const OtpScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState("");
  const [resendCountdown, setResendCountdown] = useState(60); // 60 giây chờ để gửi lại mã OTP
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  // Xử lý đếm ngược thời gian cho nút "Gửi lại OTP"
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [resendCountdown]);

  // Xử lý khi người dùng nhấn nút "Xác Minh"
  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Lỗi", "Vui lòng nhập mã OTP.");
      return;
    }

    const data = { email: email, otp: otp };

    try {
      // Gọi API xác minh OTP
      const response = await authApi.verifyOtp(data);
      console.log("OTP xác minh thành công:", response.data);

      // Hiển thị thông báo và chuyển hướng người dùng
      Alert.alert("Thông báo", "Xác minh OTP thành công.");
      navigation.navigate("LoginScreen"); // Chuyển đến màn hình chính sau khi xác minh thành công
    } catch (error) {
      console.error("Lỗi xác minh OTP:", error);
      // Hiển thị thông báo lỗi nếu OTP không hợp lệ
      Alert.alert("Lỗi", "OTP không hợp lệ, vui lòng thử lại.");
    }
  };

  // Xử lý khi người dùng nhấn nút "Gửi lại OTP"
  const handleResendOtp = async () => {
    try {
      setIsResendEnabled(false);
      setResendCountdown(60); // Đặt lại thời gian đếm ngược

      // Gọi API gửi lại OTP
      const response = await authApi.sendOtp(email);
      console.log("OTP đã được gửi lại:", response.data);

      Alert.alert("Thông báo", "Mã OTP đã được gửi lại email của bạn.");
    } catch (error) {
      console.error("Lỗi gửi lại OTP:", error);
      Alert.alert("Lỗi", "Không thể gửi lại mã OTP, vui lòng thử lại sau.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Xác Minh OTP</Text>
      <Text style={styles.subtitle}>
        Vui lòng nhập mã OTP đã được gửi đến địa chỉ email: {email}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mã OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />
      </View>
      <Button title="Xác Minh" onPress={handleVerifyOtp} />
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>
          {isResendEnabled
            ? "Bạn không nhận được mã OTP?"
            : `Vui lòng chờ ${resendCountdown} giây để gửi lại OTP.`}
        </Text>
        {isResendEnabled && (
          <Button title="Gửi Lại OTP" onPress={handleResendOtp} />
        )}
      </View>
    </ScrollView>
  );
};

export default OtpScreen;
