import React, { createContext, useState, useContext } from "react";

// Create the context
export const PornContext = createContext();

// Custom hook to access the context
export const usePornContext = () => {
  return useContext(PornContext);
};

// Provider component that wraps the app and provides context
export const PornProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <PornContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children} {/* This allows child components to access the context */}
    </PornContext.Provider>
  );
};
