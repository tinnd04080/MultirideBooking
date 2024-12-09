import React from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./style";
import Header from "../../components/header";

const PrivacyPolicyScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title="Privacy Policy" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>1. Thu thập thông tin cá nhân</Text>
        <Text style={styles.paragraph}>
          Chúng tôi thu thập các thông tin như tên, địa chỉ email, số điện thoại
          và thông tin khác bạn cung cấp khi đăng ký hoặc sử dụng ứng dụng.
        </Text>

        <Text style={styles.sectionTitle}>2. Sử dụng thông tin</Text>
        <Text style={styles.paragraph}>
          Thông tin thu thập được sử dụng để cung cấp dịch vụ, cải thiện trải
          nghiệm người dùng và gửi các thông báo quan trọng liên quan đến tài
          khoản.
        </Text>

        <Text style={styles.sectionTitle}>3. Chia sẻ thông tin</Text>
        <Text style={styles.paragraph}>
          Chúng tôi cam kết không chia sẻ thông tin cá nhân của bạn với bên thứ
          ba, ngoại trừ khi có sự đồng ý của bạn hoặc theo yêu cầu của pháp
          luật.
        </Text>

        <Text style={styles.sectionTitle}>4. Bảo mật thông tin</Text>
        <Text style={styles.paragraph}>
          Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức cần thiết để bảo
          vệ thông tin cá nhân khỏi việc truy cập, thay đổi hoặc phá hủy trái
          phép.
        </Text>

        <Text style={styles.sectionTitle}>
          5. Cookies và công nghệ theo dõi
        </Text>
        <Text style={styles.paragraph}>
          Ứng dụng có thể sử dụng cookies để thu thập dữ liệu sử dụng, nhằm cải
          thiện trải nghiệm của bạn. Bạn có thể tùy chỉnh cài đặt cookies trong
          trình duyệt.
        </Text>

        <Text style={styles.sectionTitle}>6. Quyền của bạn</Text>
        <Text style={styles.paragraph}>
          Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân
          của mình. Vui lòng liên hệ với chúng tôi qua email support@company.com
          để thực hiện.
        </Text>

        <Text style={styles.sectionTitle}>7. Thay đổi chính sách</Text>
        <Text style={styles.paragraph}>
          Chúng tôi có thể thay đổi Chính Sách và Quyền Riêng Tư bất kỳ lúc nào.
          Các thay đổi sẽ được cập nhật trên ứng dụng.
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;
