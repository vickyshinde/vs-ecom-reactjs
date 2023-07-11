const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElem) => curElem.price);
      // console.log(
      //   "🚀 ~ file: filterReducer.js:5 ~ filterReducer ~ priceArr:",
      //   priceArr
      // );

      // 1st way
      // console.log(Math.max.apply(null, priceArr));

      // 2nd way
      /* let maxPrice = priceArr.reduce((initialValue, curElem) => {
        return Math.max(initialValue, curElem);
      }, 0);
      console.log(
        "🚀 ~ file: filterReducer.js:16 ~ maxPrice ~ maxPrice:",
        maxPrice
      ); */

      //3rd way
      let maxPrice = Math.max(...priceArr);
      // console.log(
      //   "🚀 ~ file: filterReducer.js:24 ~ filterReducer ~ maxPrice:",
      //   maxPrice
      // );

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
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
      // let userSortValue = document.getElementById("sort");
      // let sortValue = userSortValue.options[userSortValue.selectedIndex].value;
      // console.log(
      //   "🚀 ~ file: filterReducer.js:25 ~ filterReducer ~ sortValue:",
      //   sortValue
      // );
      return {
        ...state,
        // sorting_value: sortValue,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      //traditional way
      /* let newSortProducts;
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
      } */

      let newSortProducts;
      const { filter_products, sorting_value } = state;
      let tempSortProdcuts = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }
        if (sorting_value === "highest") {
          return b.price - a.price;
        }
        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }
        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      newSortProducts = tempSortProdcuts.sort(sortingProducts);
      return {
        ...state,
        filter_products: newSortProducts,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { text, category, company, color, price } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          // return curElem.name.toLowerCase().startsWith(text);
          return curElem.name.toLowerCase().includes(text);
        });
      }

      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.category === category;
        });
      }

      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.company.toLowerCase() === company.toLowerCase();
        });
      }

      if (color !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.colors.includes(color);
        });
      }

      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.price === price;
        });
      } else {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.price <= price;
        });
      }

      return {
        ...state,
        filter_products: tempFilterProduct,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filter,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          maxPrice: state.filters.maxPrice,
          price: state.filters.maxPrice,
          minPrice: 0,
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
