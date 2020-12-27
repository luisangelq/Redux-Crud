//Each Reducer have their own state
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_PRODUCTS_DOWNLOAD,
  SUCCESS_PRODUCTS_DOWNLOAD,
  ERROR_PRODUCTS_DOWNLOAD,
} from "../types";

const initialState = {
  products: [],
  error: false,
  loading: false,
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
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload]
      };
    case ERROR_PRODUCTS_DOWNLOAD:
    case ADD_PRODUCT_ERROR:
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

    default:
      return state;
  }
}
