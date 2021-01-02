//Each Reducer have their own state
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
  SUCCESS_EDIT_PRODUCT,
  ERROR_EDIT_PRODUCT
} from "../types";

const initialState = {
  products: [],
  error: false,
  loading: false,
  deleteId: null,
  editProduct: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case START_PRODUCTS_DOWNLOAD:
    case ADD_PRODUCT:
      return {
        ...state,
        loading: action.payload,
        error: false,
        delete: null
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload]
      };
    case ERROR_DELETE_PRODUCT:
    case ERROR_PRODUCTS_DOWNLOAD:
    case ADD_PRODUCT_ERROR:
    case ERROR_EDIT_PRODUCT:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SUCCESS_PRODUCTS_DOWNLOAD:
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload,
      };
    case GET_DELETE_PRODUCT:
      return {
        ...state,
        deleteId: action.payload
      }
    case SUCCESS_DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== state.deleteId),
        deleteId: null

      }
    case GET_EDIT_PRODUCT:
      return {
        ...state,
        editProduct: action.payload
      }
    case SUCCESS_EDIT_PRODUCT:
      return {
        ...state,
        editProduct: null,
        products: state.products.map(
          product => product.id === action.payload.id ? product = action.payload : product
        )
      }
    default:
      return state;
  }
}
