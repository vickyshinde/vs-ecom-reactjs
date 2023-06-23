const ProductsReducer = (state, action) => {
  // console.log("🚀 ~ file: productReducer.js:2 ~ ProductsReducer ~ state:", state)
  /* if(action.type === 'SET_LOADING') {
    return {
      ...state,
      isLoading: true
    }
  }
  
  if(action.type === 'API_ERROR') {
    return {
      ...state,
      isLoading: false,
      isError: true
    }
  } */

  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SET_PRODUCT_DATA":
      const featureData = action.payload.filter((curElem) => {
        return curElem.featured === true;
      });

      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featureProducts: featureData,
      };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isLoading: false,
        singleProduct: action.payload,
      };
    default:
      return state;
  }
};

export default ProductsReducer;
