import { SHOW_ALERT, HIDE_ALERT } from "../types";

//Each reducer have their own state
const initialState = {
  alert: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
        return {
            ...state,
            alert: action.payload
        }
    case HIDE_ALERT:
        return {
            ...state,
            alert: action.payload
        }
    default:
      return state;
  }
}
