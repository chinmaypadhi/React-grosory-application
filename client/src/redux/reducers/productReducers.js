import * as actionTypes from "../constants/productConstants";

export const getVegProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_VEGPRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case actionTypes.GET_VEGPRODUCTS_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      };

    case actionTypes.GET_VEGPRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getGrocProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_GROCPRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case actionTypes.GET_GROCPRODUCTS_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      };

    case actionTypes.GET_GROCPRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_RESET:
      return {
        product: {},
      };
    default:
      return state;
  }
};
