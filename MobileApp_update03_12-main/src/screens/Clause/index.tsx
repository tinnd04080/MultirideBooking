import React from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./style";
import Header from "../../components/header";

const TermsAndConditionsScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Terms and Conditions" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>1. Giới thiệu</Text>
        <Text style={styles.paragraph}>
          Khi sử dụng ứng dụng của chúng tôi, bạn đồng ý tuân thủ các điều khoản
          và điều kiện dưới đây. Nếu bạn không đồng ý, vui lòng ngừng sử dụng
          ứng dụng.
        </Text>
        <Text style={styles.sectionTitle}>
          2. Quyền và Nghĩa Vụ của Người Dùng
        </Text>
        <Text style={styles.paragraph}>
          Người dùng phải cung cấp thông tin chính xác và không được sử dụng ứng
          dụng vào mục đích trái pháp luật. Bạn chịu trách nhiệm bảo mật thông
          tin tài khoản cá nhân của mình.
        </Text>
        <Text style={styles.sectionTitle}>
          3. Quyền và Nghĩa Vụ của Chúng Tôi
        </Text>
        <Text style={styles.paragraph}>
          Chúng tôi có quyền thay đổi hoặc chấm dứt cung cấp dịch vụ bất kỳ lúc
          nào mà không cần thông báo trước. Tuy nhiên, chúng tôi cam kết bảo vệ
          quyền lợi của người dùng theo quy định pháp luật.
        </Text>
        <Text style={styles.sectionTitle}>4. Hạn Chế Trách Nhiệm</Text>
        <Text style={styles.paragraph}>
          Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất hoặc thiệt hại nào
          phát sinh do việc sử dụng ứng dụng.
        </Text>
        <Text style={styles.sectionTitle}>5. Sửa Đổi Điều Khoản</Text>
        <Text style={styles.paragraph}>
          Chúng tôi có thể cập nhật điều khoản và điều kiện bất kỳ lúc nào. Các
          thay đổi sẽ được thông báo trên ứng dụng.
        </Text>
        <Text style={styles.sectionTitle}>6. Liên Hệ</Text>
        <Text style={styles.paragraph}>
          Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ chúng tôi qua email:
          datn18302@gmail.com.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditionsScreen;
