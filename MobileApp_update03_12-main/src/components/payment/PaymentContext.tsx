// PaymentContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface PaymentContextType {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  paymentStatus: string;
  setPaymentStatus: React.Dispatch<React.SetStateAction<string>>;
  ticketId: string;
  setTicketId: React.Dispatch<React.SetStateAction<string>>;
}

export const PaymentContext = createContext<PaymentContextType | undefined>(
  undefined
);

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
}) => {
  const [timeLeft, setTimeLeft] = useState(600); // Mặc định 600 giây (10 phút)
  const [paymentStatus, setPaymentStatus] = useState("PENDING"); // Trạng thái thanh toán mặc định là "PENDING"
  const [ticketId, setTicketId] = useState(""); // ID vé

  useEffect(() => {
    // Đếm ngược thời gian
    const timerId = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    // Dọn dẹp khi component bị unmount
    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <PaymentContext.Provider
      value={{
        timeLeft,
        setTimeLeft,
        paymentStatus,
        setPaymentStatus,
        ticketId,
        setTicketId,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
