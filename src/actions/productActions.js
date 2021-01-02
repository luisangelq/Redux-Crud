//Son las funciones que modifican el state, consultas etc.
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_PRODUCTS_DOWNLOAD,
  SUCCESS_PRODUCTS_DOWNLOAD,
  ERROR_PRODUCTS_DOWNLOAD,
  GET_DELETE_PRODUCT,
  SUCCESS_DELETE_PRODUCT,
  ERROR_DELETE_PRODUCT,
  GET_EDIT_PRODUCT,
  START_EDIT_PRODUCT,
  SUCCESS_EDIT_PRODUCT,
  ERROR_EDIT_PRODUCT
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
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        console.log(error);
        dispatch(addProductError(true));

        Swal.fire({
          icon: "error",
          title: "There Was An Error",
          text: "There Was An Error, Try Again",
        });
      }, 1000);
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
      }, 1000);
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


//Select and delete product
export function deleteProductAction (id) {
  return async (dispatch) => {
    dispatch(deleteProduct(id))

    try {
      await axiosClient.delete(`/products/${id}`)
      dispatch(successDeleteProduct())

      //if delete
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )

    } catch (error) {
      console.log(error);
      dispatch(errorDeleteProduct())
      Swal.fire({
        icon: "error",
        title: "There Was An Error",
        text: "There Was An Error, Try Again",
      });
    }
    console.log(id);
  }
}

const deleteProduct = (id) => ({
  type: GET_DELETE_PRODUCT,
  payload: id
})

const successDeleteProduct = () => ({
  type: SUCCESS_DELETE_PRODUCT,
  
})

const errorDeleteProduct = () => ({
  type: ERROR_DELETE_PRODUCT,
  payload: true
})


//Put product on edition 
export function getEditProductAction(product) {
  return (dispatch) => {
    dispatch( getEditProduct(product))
    
  }
}
const getEditProduct = (product) => ({
  type: GET_EDIT_PRODUCT,
  payload: product
})

//Edit registry to API and state
export function editProductAction(product) {
  return async (dispatch) => {
    dispatch( editProduct(product))

    try {
      await axiosClient.put(`/products/${product.id}`, product);
        dispatch( editProductSuccess(product));

        Swal.fire(
          "Correct",
          "The product has been edit successfully",
          "success"
        );

    } catch (error) {
      console.log(error);
      dispatch(editProductError())
      Swal.fire({
        icon: "error",
        title: "There Was An Error",
        text: "There Was An Error, Try Again",
      });
    }
  }
}
const editProduct = () => ({
  type: START_EDIT_PRODUCT,
})

const editProductSuccess = (product) => ({
  type: SUCCESS_EDIT_PRODUCT,
  payload: product
})

const editProductError = () => ({
  type: ERROR_EDIT_PRODUCT,
  payload: true
})