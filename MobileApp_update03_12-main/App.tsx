import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import SplashScreen from "./src/screens/auth/splash";
import LoginScreen from "./src/screens/auth/SignIn";
import RegistrationScreen from "./src/screens/auth/SignUp";
import HomeScreen from "./src/screens/app/Home";
import TicketScreen from "./src/screens/app/Tickets/myTickets/";
import TicketDetails from "./src/screens/app/Tickets/TicketDetail/index";
import NotificationScreen from "./src/screens/app/Notification";
import ProfileScreen from "./src/screens/app/Profiles";
import TicketBookingScreen from "./src/screens/App.TicketBookingScreen";
import SeatSelectionScreen from "./src/screens/SeatSelectionScreen/SeatSelectionScreen";
import OtpScreen from "./src/screens/auth/OTP";
import BankTransferScreen from "./src/screens/App.PaymentScreen/PaymentTransfer";
import ConfirmInformation from "./src/screens/ConfirmInformationScreen/ConfirmInformationScreen";
import CreateticketsScreen from "./src/screens/CreateticketsScreen/CreateticketsScreen";
import BookingHistoryScreen from "./src/screens/tripHistory";
import SafetyManualScreen from "./src/screens/SafetyManual";
import QAScreen from "./src/screens/QAScreen";
import PrivacyPolicyScreen from "./src/screens/PrivacyPolicy";
import TermsAndConditionsScreen from "./src/screens/Clause";
import EditProfileScreen from "./src/screens/UpdateInfo";
import ChangePassWord from "./src/screens/UpdateInfo/change-password";
// RootStackParamList.ts
export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  OtpScreen: { email: string }; // Ví dụ, truyền email vào màn hình OTP
  MainTabs: undefined;
  TicketBookingScreen: undefined;
  SeatSelectionScreen: { tripId: string }; // Thêm kiểu cho tham số tripId
  PickupDropoffScreen: undefined;
  PassengerInfoScreen: undefined;
  PaymentScreen: undefined;
  BankTransferScreen: undefined;
};

// BottomTabParamList.ts
export type BottomTabParamList = {
  Home: undefined;
  Ticket: undefined;
  Notification: undefined;
  Profile: undefined;
};
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Trang chủ":
              iconName = "home";
              break;
            case "Vé của tôi": //
              iconName = "confirmation-number";
              break;
            case "Thông báo":
              iconName = "notifications";
              break;
            case "Cá nhân":
              iconName = "person";
              break;
            default:
              iconName = "home";
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#005C78",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Vé của tôi" component={TicketScreen} />
      <Tab.Screen name="Thông báo" component={NotificationScreen} />
      <Tab.Screen name="Cá nhân" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen" //SplashScreen
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegistrationScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="TicketDetails" component={TicketDetails} />
        <Stack.Screen
          name="TicketBookingScreen"
          component={TicketBookingScreen}
        />
        <Stack.Screen
          name="SeatSelectionScreen"
          component={SeatSelectionScreen}
        />
        <Stack.Screen
          name="ConfirmInformation"
          component={ConfirmInformation} // Thêm màn hình ConfirmInformation vào đây
        />
        <Stack.Screen
          name="CreateticketsScreen"
          component={CreateticketsScreen}
        />
        <Stack.Screen
          name="BookingHistoryScreen"
          component={BookingHistoryScreen}
        />
        <Stack.Screen
          name="SafetyManualScreen"
          component={SafetyManualScreen}
        />
        <Stack.Screen name="QAScreen" component={QAScreen} />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
        />
        <Stack.Screen
          name="TermsAndConditionsScreen"
          component={TermsAndConditionsScreen}
        />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="ChangePassWord" component={ChangePassWord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
