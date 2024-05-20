import React, { createContext, useState } from "react";

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [tripCosts, setTripCosts] = useState({ toll: 0, fuel: 0 });

  return (
    <DateContext.Provider value={{ dates, setDates, tripCosts, setTripCosts }}>
      {children}
    </DateContext.Provider>
  );
};
