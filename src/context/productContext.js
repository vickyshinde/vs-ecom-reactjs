// create a context

// provider

// consumer => useContext Hook

import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/productReducer";

const AppContext = createContext();

const API = "xxxx";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      // console.log("🚀 ~ file: productContext.js:18 ~ getProducts ~ res:", res);

      const products = res.data;
      // console.log(
      //   "🚀 ~ file: productContext.js:21 ~ getProducts ~ products:",
      //   products
      // );
      dispatch({ type: "SET_PRODUCT_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

// custom hook
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
