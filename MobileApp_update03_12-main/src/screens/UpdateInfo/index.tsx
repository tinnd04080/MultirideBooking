import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./style";
import Header from "../../components/header";
import profileApi from "../../services/updateUser/updateAPI";

const EditProfileScreen = () => {
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Tên người dùng không được để trống")
      .min(2, "Tên người dùng quá ngắn"),
    phoneNumber: Yup.string()
      .matches(/^\d{10,11}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại không được để trống"),
    fullName: Yup.string()
      .required("Họ tên không được để trống")
      .min(2, "Họ tên quá ngắn"),
    cccd: Yup.string()
      .matches(/^\d{9,12}$/, "CCCD không hợp lệ")
      .required("CCCD không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
    newPassword: Yup.string()
      .required("Mật khẩu mới không được để trống")
      .min(6, "Mật khẩu mới quá ngắn (tối thiểu 6 ký tự)"),
  });

  const initialValues = {
    userName: "",
    phoneNumber: "",
    fullName: "",
    cccd: "",
    password: "",
    newPassword: "",
  };

  const handleSubmit = async (values: any) => {
    try {
      // Gọi API cập nhật thông tin người dùng
      const profileResponse = await profileApi.updateProfile({
        userName: values.userName,
        phoneNumber: values.phoneNumber,
        fullName: values.fullName,
        cccd: values.cccd,
      });

      // Gọi API thay đổi mật khẩu
      const passwordResponse = await profileApi.changePassword({
        password: values.password,
        newPassword: values.newPassword,
      });

      // Thông báo thành công
      Alert.alert(
        "Cập nhật thành công",
        "Thông tin và mật khẩu đã được cập nhật."
      );
    } catch (error) {
      // Thông báo lỗi
      Alert.alert(
        "Có lỗi xảy ra",
        "Không thể cập nhật thông tin, vui lòng thử lại."
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Cập Nhật Thông Tin" />
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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
              {/* Tên người dùng */}
              <Text style={styles.label}>Tên người dùng</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập tên người dùng"
                onChangeText={handleChange("userName")}
                onBlur={handleBlur("userName")}
                value={values.userName}
              />
              {touched.userName && errors.userName && (
                <Text style={styles.errorText}>{errors.userName}</Text>
              )}

              {/* Số điện thoại */}
              <Text style={styles.label}>Số điện thoại</Text>
              <TextInput
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

              {/* Họ tên */}
              <Text style={styles.label}>Họ tên</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập họ tên"
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}

              {/* CCCD */}
              <Text style={styles.label}>CCCD</Text>
              <TextInput
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

              {/* Mật khẩu */}
              <Text style={styles.label}>Mật khẩu cũ</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu cũ"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {/* Mật khẩu mới */}
              <Text style={styles.label}>Mật khẩu mới</Text>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu mới"
                secureTextEntry
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                value={values.newPassword}
              />
              {touched.newPassword && errors.newPassword && (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
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
