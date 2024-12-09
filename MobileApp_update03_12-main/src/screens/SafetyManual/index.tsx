import { ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./style";
import Header from "../../components/header";

const SafetyManualScreen = () => {
  const safetyTips = [
    {
      title: "Chọn Nhà Xe Uy Tín",
      description:
        "Lựa chọn nhà xe có giấy phép hoạt động rõ ràng và được nhiều người đánh giá cao.",
      icon: "check-circle",
    },
    {
      title: "Đảm Bảo An Toàn Trên Xe",
      description:
        "Thắt dây an toàn khi ngồi, giữ đồ đạc gọn gàng, tránh vướng víu.",
      icon: "car",
    },
    {
      title: "Không Sử Dụng Điện Thoại Khi Xe Đang Chạy",
      description:
        "Giữ sự tập trung và tránh làm phiền người khác khi xe di chuyển.",
      icon: "phone",
    },
    {
      title: "Cẩn Trọng Khi Di Chuyển Trên Xe",
      description:
        "Không đứng lên hoặc di chuyển khi xe đang chạy, chỉ di chuyển khi xe đã dừng.",
      icon: "street-view",
    },
    {
      title: "Bảo Vệ Tài Sản Cá Nhân",
      description: "Giữ đồ đạc quan trọng trong túi xách hoặc khóa hành lý.",
      icon: "lock",
    },
    {
      title: "Kiểm Tra Giấy Tờ Và Vé Xe",
      description: "Kiểm tra lại vé và giấy tờ trước khi lên xe.",
      icon: "ticket",
    },
    {
      title: "Cảnh Giác Với Hành Vi Lạ",
      description:
        "Báo ngay cho tài xế hoặc nhân viên nếu phát hiện hành vi đáng ngờ.",
      icon: "eye",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Header title="Safety Manual" />
      <ScrollView contentContainerStyle={styles.container}>
        {safetyTips.map((tip, index) => (
          <View key={index} style={styles.card}>
            <Icon name={tip.icon} size={30} color="#1E90FF" />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{tip.title}</Text>
              <Text style={styles.description}>{tip.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SafetyManualScreen;
