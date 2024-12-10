import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationProp } from "@react-navigation/native";

interface CustomHeaderProps {
  title: string; // Tiêu đề của Header
  navigation: NavigationProp<any>; // Đối tượng navigation từ React Navigation
  backTo?: string; // Tùy chọn: Tên màn hình để điều hướng khi bấm Back
  onRightButtonPress?: () => void; // Hành động tùy chọn khi bấm nút bên phải
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  navigation,
  backTo,
  onRightButtonPress,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        {/* Nút Back */}
        <TouchableOpacity
          onPress={() => {
            if (backTo) {
              navigation.navigate(backTo);
            } else {
              navigation.goBack();
            }
          }}
        >
          <Icon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <Text style={styles.headerTitle}>{title}</Text>

        {/* Nút bên phải (nếu có) */}
        {onRightButtonPress && (
          <TouchableOpacity
            onPress={onRightButtonPress}
            style={styles.rightButton}
          >
            <Icon name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: Platform.OS === "android" ? 30 : 0, // Dành cho Android để tránh camera
    height: Platform.OS === "android" ? 80 : 60, // Điều chỉnh chiều cao tuỳ thuộc vào nền tảng
    backgroundColor: "#fff",
    elevation: 2, // Đổ bóng cho header (Android)
  },
  rightButton: {
    paddingRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    flex: 1,
  },
});

export default CustomHeader;
