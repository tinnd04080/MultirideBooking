import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./style";
import Header from "../../components/header";
import profileApi from "../../services/updateUser/updateAPI";

const EditProfileScreen = () => {
  const [initialValues, setInitialValues] = useState({
    phoneNumber: "",
    fullName: "",
    cccd: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Refs để tự động focus vào trường có lỗi
  const fullNameInputRef = useRef<TextInput>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const cccdInputRef = useRef<TextInput>(null);

  // Schema validate
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^\d{10,11}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại không được để trống"),
    fullName: Yup.string()
      .required("Họ tên không được để trống")
      .min(2, "Họ tên quá ngắn"),
    cccd: Yup.string()
      .matches(/^\d{9,12}$/, "CCCD không hợp lệ")
      .required("CCCD không được để trống"),
  });

  // Lấy dữ liệu profile
  const fetchProfile = async () => {
    try {
      const profile = await profileApi.getProfile();
      setInitialValues({
        phoneNumber: profile.phoneNumber || "",
        fullName: profile.fullName || "",
        cccd: profile.cccd || "",
      });
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Không thể tải thông tin người dùng. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Xử lý lỗi và focus vào trường lỗi
  const handleErrorFocus = (errors: any) => {
    if (errors.fullName) {
      fullNameInputRef.current?.focus();
    } else if (errors.phoneNumber) {
      phoneNumberInputRef.current?.focus();
    } else if (errors.cccd) {
      cccdInputRef.current?.focus();
    }
  };

  // Xử lý submit
  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);

      // Cập nhật thông tin
      await profileApi.updateProfile({
        phoneNumber: values.phoneNumber,
        fullName: values.fullName,
        cccd: values.cccd,
      });

      Alert.alert(
        "Cập nhật thành công",
        "Thông tin và mật khẩu đã được cập nhật."
      );
    } catch (error) {
      Alert.alert(
        "Có lỗi xảy ra",
        "Không thể cập nhật thông tin. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title="Cập Nhật Thông Tin" />
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors }) => {
            handleSubmit(values);
            handleErrorFocus(setErrors);
          }}
          enableReinitialize
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              {/* Họ tên */}
              <Text style={styles.label}>Họ tên</Text>
              <TextInput
                ref={fullNameInputRef}
                style={styles.input}
                placeholder="Nhập họ tên"
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              {/* Số điện thoại */}
              <Text style={styles.label}>Số điện thoại</Text>
              <TextInput
                ref={phoneNumberInputRef}
                style={styles.input}
                placeholder="Nhập số điện thoại"
                keyboardType="numeric"
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
                maxLength={10}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}

              {/* CCCD */}
              <Text style={styles.label}>CCCD</Text>
              <TextInput
                ref={cccdInputRef}
                style={styles.input}
                placeholder="Nhập CCCD"
                keyboardType="numeric"
                onChangeText={handleChange("cccd")}
                onBlur={handleBlur("cccd")}
                value={values.cccd}
                maxLength={12}
              />
              {touched.cccd && errors.cccd && (
                <Text style={styles.errorText}>{errors.cccd}</Text>
              )}
              {/* Nút lưu */}
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Lưu Thay Đổi</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
