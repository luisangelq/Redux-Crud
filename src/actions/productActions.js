//Son las funciones que modifican el state, consultas etc.
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_PRODUCTS_DOWNLOAD,
  SUCCESS_PRODUCTS_DOWNLOAD,
  ERROR_PRODUCTS_DOWNLOAD,
} from "../types";
import Swal from "sweetalert2";
import axiosClient from "../config/axios";

//create new products
export function createNewActionProduct(product) {
  return async (dispatch) => {
    dispatch(addProduct());

    try {
      //put in API
      await axiosClient.post("/products", product);
      //if everything its ok, update state
      setTimeout(() => {
        dispatch(addProductSuccess(product));

        Swal.fire(
          "Correct",
          "The product has been added successfully",
          "success"
        );
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        console.log(error);
        dispatch(addProductError(true));

        Swal.fire({
          icon: "error",
          title: "There Was An Error",
          text: "There Was An Error, Try Again",
        });
      }, 2000);
    }
  };
}

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true,
});

const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

const addProductError = (stateError) => ({
  type: ADD_PRODUCT_ERROR,
  payload: stateError,
});

//FUNC to download products
export function getProductsAction() {
  return async (dispatch) => {
    dispatch(downloadProducts());

    try {
      const response = await axiosClient.get("/products");
      setTimeout(() => {
        dispatch(downloadProductsSuccess(response.data));
      }, 1500);
    } catch (error) {
      console.log(error);
      dispatch(downloadProductsError());
      Swal.fire({
        icon: "error",
        title: "There Was An Error",
        text: "There Was An Error, Try Again",
      });
    }
  };
}

const downloadProducts = () => ({
  type: START_PRODUCTS_DOWNLOAD,
  payload: true,
});

const downloadProductsSuccess = (response) => ({
  type: SUCCESS_PRODUCTS_DOWNLOAD,
  payload: response,
});

const downloadProductsError = () => ({
  type: ERROR_PRODUCTS_DOWNLOAD,
  payload: true,
});
