import React, { createContext, useContext, useState } from "react";

type OrderContextType = {
  orderFormState: {
    quantity: number;
    totalPrice: number;
    productPrice: number;
    productName: string;
  };
  setOrderFormState: React.Dispatch<
    React.SetStateAction<{
      quantity: number;
      totalPrice: number;
      productPrice: number;
      productName: string;
    }>
  >;
};

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orderFormState, setOrderFormState] = useState({
    quantity: 1,
    totalPrice: 0,
    productPrice: 0,
    productName: "",
  });

  return (
    <OrderContext.Provider
      value={{
        orderFormState,
        setOrderFormState,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context)
    throw new Error("useOrder must be used within an OrderProvider");
  return context;
};
