import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./style";
import Header from "../../components/header";

const QAScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const qaData = [
    {
      question: "Làm thế nào để đặt vé xe?",
      answer:
        "Bạn có thể đặt vé qua ứng dụng hoặc liên hệ trực tiếp qua số điện thoại của nhà xe.",
    },
    {
      question: "Tôi có thể hủy vé đã đặt không?",
      answer:
        "Không, nếu bạn muốn huỷ vé bạn phải liên hệ với nhân viên nhà xe. Lưu ý rằng hủy vé trước giờ xe chạy 24h sẽ được hoàn tiền.",
    },
    {
      question: "Nhà xe có chính sách giảm giá không?",
      answer:
        "Chúng tôi có chính sách giảm giá cho học sinh, sinh viên và người cao tuổi. Vui lòng xuất trình giấy tờ khi đặt vé.",
    },
    {
      question: "Nếu tôi quên đồ trên xe, tôi phải làm gì?",
      answer:
        "Bạn nên liên hệ ngay với nhà xe để nhận hỗ trợ, cung cấp thông tin chi tiết về hành lý bị thất lạc.",
    },
    {
      question: "Tôi có thể thanh toán qua những phương thức nào?",
      answer:
        "Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, thanh toán tại quầy và ví điện tử.",
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Q&A" />
      <ScrollView contentContainerStyle={styles.container}>
        {qaData.map((item, index) => (
          <View key={index} style={styles.qaCard}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.question}>{item.question}</Text>
              <Icon
                name={expandedIndex === index ? "angle-up" : "angle-down"}
                size={20}
                color="#1E90FF"
              />
            </TouchableOpacity>
            {expandedIndex === index && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default QAScreen;
