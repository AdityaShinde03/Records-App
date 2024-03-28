import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  const setNewOrder = (newOrder) => {
    setOrder(newOrder)
  };

  const addNewOrder = (newOrder) => {
    setOrder((prev) => [...prev.reverse(), newOrder]);
  };

  return (
    <OrderContext.Provider value={{ order, addNewOrder, setNewOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
