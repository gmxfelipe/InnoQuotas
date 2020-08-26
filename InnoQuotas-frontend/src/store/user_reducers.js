// import { Cards } from "../models/Cards";

import {
  SET_GRAPHICS,
  SET_BUDGETS,
  ADD_BUDGETS,
  EDIT_BUDGETS,
  USER_LOGIN,
  USER_LOGOUT,
  DELETE_BUDGET,
} from "./user_actions";

const initialState = {
  infoGraphics: [],
  infoBudgets: [],
  token: null,
  userId: null,
  expiryTime: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // USERS
    case USER_LOGIN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.email,
      };
    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        expiryTime: null,
        email: null,
        infoBudgets: [],
        infoGraphics: [],
      };
    // GRAPHICS
    case SET_GRAPHICS:
      const graphicsData = action.graphicsData;
      return { ...state, infoGraphics: graphicsData };
    // BUDGETS
    case SET_BUDGETS:
      const budgetsData = action.budgetsData;
      return { ...state, infoBudgets: budgetsData };
    case ADD_BUDGETS:
      const newBudget = action.infoBudgets;
      return { ...state, infoBudgets: state.infoBudgets.concat(newBudget) };
    case EDIT_BUDGETS:
    case DELETE_BUDGET:
      return { ...state, infoBudgets: state.infoBudgets };

    default:
      return state;
  }
};
