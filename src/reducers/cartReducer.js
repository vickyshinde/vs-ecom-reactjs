const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { id, color, quantity, product } = action.payload;

      let cartProduct;

      cartProduct = {
        id: id + color,
        name: product.name,
        color,
        quantity,
        image: product.image[0].url,
        price: product.price,
        stock: product.stock
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    default:
      return state;
  }
};

export default cartReducer;
