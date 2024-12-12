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
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

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

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    if (!otpCode) {
      Alert.alert("Lỗi", "Vui lòng nhập mã OTP.");
      return;
    }

    const data = { email: email, otp: otpCode };

    try {
      const response = await authApi.verifyOtp(data);
      console.log("OTP xác minh thành công:", response.data);

      Alert.alert("Thông báo", "Xác minh OTP thành công.");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Lỗi xác minh OTP:", error);
      Alert.alert("Lỗi", "OTP không hợp lệ, vui lòng thử lại.");
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResendEnabled(false);
      setResendCountdown(60);

      const response = await authApi.sendOtp(email);
      console.log("OTP đã được gửi lại:", response.data);

      Alert.alert("Thông báo", "Mã OTP đã được gửi lại email của bạn.");
    } catch (error) {
      console.error("Lỗi gửi lại OTP:", error);
      Alert.alert("Lỗi", "Không thể gửi lại mã OTP, vui lòng thử lại sau.");
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔒 Xác Minh OTP</Text>
      <Text style={styles.subtitle}>
        Mã OTP đã được gửi đến email của bạn:{" "}
        <Text style={styles.email}>{email}</Text>
      </Text>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder="•"
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            autoFocus={index === 0}
          />
        ))}
      </View>
      <Button
        title="Xác Minh"
        onPress={handleVerifyOtp}
        style={styles.verifyButton}
      />
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>
          {isResendEnabled
            ? "Không nhận được mã OTP?"
            : `Chờ ${resendCountdown} giây để gửi lại mã.`}
        </Text>
        {isResendEnabled && (
          <Button
            title="🔄 Gửi Lại OTP"
            onPress={handleResendOtp}
            style={styles.resendButton}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default OtpScreen;
