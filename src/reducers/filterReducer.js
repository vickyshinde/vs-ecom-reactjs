const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE":
      let userSortValue = document.getElementById("sort");
      let sortValue = userSortValue.options[userSortValue.selectedIndex].value;
      console.log(
        "🚀 ~ file: filterReducer.js:25 ~ filterReducer ~ sortValue:",
        sortValue
      );
      return {
        ...state,
        sorting_value: sortValue,
      };

    case "SORTING_PRODUCTS":
      let newSortProducts;
      let tempSortProdcuts = [...action.payload];

      if (state.sorting_value === "lowest") {
        const sortingProducts = (a, b) => {
          return a.price - b.price;
        }
        newSortProducts = tempSortProdcuts.sort(sortingProducts);
      }

      if (state.sorting_value === "highest") {
        const sortingProducts = (a, b) => {
          return b.price - a.price;
        }
        newSortProducts = tempSortProdcuts.sort(sortingProducts);
      }

      if (state.sorting_value === "a-z") {
        newSortProducts = tempSortProdcuts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      if (state.sorting_value === "z-a") {
        newSortProducts = tempSortProdcuts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return {
        ...state,
        filter_products: newSortProducts,
      };

    default:
      return state;
  }
};

export default filterReducer;
