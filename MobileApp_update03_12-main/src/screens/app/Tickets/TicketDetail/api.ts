// services/TicketService.ts
import axiosClient from "../../../../services/Api/axiosClient";
// Định nghĩa kiểu dữ liệu cho vé và các thông tin liên quan
export interface Trip {
  id: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  route: {
    startProvince: string;
    startDistrict: string;
    endProvince: string;
    endDistrict: string;
    duration: string;
    distance: number;
    pricePerKM: number;
  };
}

export interface Bus {
  id: string;
  busType: string;
  licensePlate: string;
  driver: string;
}

export interface Promotion {
  id: string;
  name: string;
  discount: number;
}

export interface Ticket {
  _id: string;
  user: {
    name: string;
  };
  trip: Trip;
  bus: Bus;
  promotion: Promotion | null;
  code?: string;
  boardingPoint?: string;
  dropOffPoint?: string;
  seatNumber: string[];
  status: string;
  paymentMethod: string;
  totalAmount: number;
  note: string;
  customerPhone: number;
  customerName: string;
}

// Hàm lấy thông tin vé theo ticketId
export const getOnTicket = async (ticketId: string): Promise<Ticket> => {
  try {
    const response = await axiosClient.get(`tickets/${ticketId}`);
    return response.data; // Trả về dữ liệu từ API
  } catch (error: any) {
    console.error("Error fetching ticket:", error.message);
    throw error;
  }
};
