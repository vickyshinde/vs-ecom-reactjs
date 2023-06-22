// create a context

// provider

// consumer => useContext Hook

import { createContext, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

const API = "xxxx";

const AppProvider = ({ children }) => {
  
  const getProducts = async (url) => {
    const res = await axios.get(url);
    console.log("🚀 ~ file: productContext.js:18 ~ getProducts ~ res:", res);

    const products = res.data;
    console.log("🚀 ~ file: productContext.js:21 ~ getProducts ~ products:", products)
  }

  useEffect(() => {
    getProducts(API);
  }, [])

  return (
    <AppContext.Provider value={{ myName: "Vicky Shinde" }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook
const useProductContext = () => {
  return useContext(AppContext);
}

export { AppProvider, AppContext, useProductContext };
