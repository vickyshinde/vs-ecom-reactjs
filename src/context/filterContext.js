import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productContext";
import reducer from "../reducers/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all"
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  // sorting function
  //traditional way
  // const sorting = () => {
  //   dispatch({ type: "GET_SORT_VALUE" });
  // };

  const sorting = (event) => {
    // console.log(event.target.value);
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  // sort action
  useEffect(() => {
    //traditional way
    // dispatch({ type: "SORTING_PRODUCTS", payload: products });
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]);

  // update filter values
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, sorting, updateFilterValue }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
