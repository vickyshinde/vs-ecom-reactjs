import { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/cartReducer";

const CartContext = createContext();
const initialState = {
  cart: [],
  total_item: '',
  total_amount: '',
  shipping_fee: 500
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, quantity, product) => {
    alert("hi");
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
