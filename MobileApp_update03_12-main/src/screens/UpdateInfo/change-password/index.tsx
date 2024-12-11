import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import profileApi from "../../../services/updateUser/updateAPI";
import { styles } from "./style";
import Header from "../../../components/header";
import { Formik } from "formik";

const ChangePassWord = () => {
  const [initialValues, setInitialValues] = useState({
    password: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const passwordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Mật khẩu không được để trống"),
    newPassword: Yup.string()
      .required("Mật khẩu mới không được để trống")
      .min(6, "Mật khẩu mới quá ngắn (tối thiểu 6 ký tự)"),
  });

  const handleErrorFocus = (errors: any) => {
    if (errors.password) {
      passwordInputRef.current?.focus();
    } else if (errors.newPassword) {
      newPasswordInputRef.current?.focus();
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);

      await profileApi.changePassword({
        password: values.password,
        newPassword: values.newPassword,
      });

      Alert.alert("Cập nhật thành công", "Mật khẩu đã được cập nhật");
    } catch (error) {
      Alert.alert(
        "Có lỗi xảy ra",
        "Không thể cập nhật thông tin. Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Đổi mật khẩu" />
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
              {/*Mật khẩu cũ*/}
              <Text style={styles.label}>Mật khẩu cũ</Text>
              <TextInput
                ref={passwordInputRef}
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

              {/*Mật khẩu mới*/}
              <Text style={styles.label}>Mật khẩu mới</Text>
              <TextInput
                ref={newPasswordInputRef}
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

              {/*Nút Lưu */}
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

export default ChangePassWord;
