import * as actionTypes from "../constants/productConstants";
import axios from "axios";

export const getVegProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_VEGPRODUCTS_REQUEST });

    const { data } = await axios.get("/api/v1/item/?category=vegetables");

    dispatch({
      type: actionTypes.GET_VEGPRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_VEGPRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getGrocProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_GROCPRODUCTS_REQUEST });

    const { data } = await axios.get("/api/v1/item/?category=grocery");

    dispatch({
      type: actionTypes.GET_GROCPRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_GROCPRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/item/${id}`);
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_PRODUCT_DETAILS_RESET,
  });
};
