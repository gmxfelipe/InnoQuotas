import * as SecureStore from "expo-secure-store";

// USERS
export const USER_LOGIN = "USER_LOGIN";

export const authenticateUser = (email, password, isSignUp) => {
  return async (dispatch) => {
    let command = "signInWithPassword";
    if (isSignUp) {
      command = "signUp";
    }

    const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:${command}?key=AIzaSyCRkVJiC064BBLA0wbqwUBqarU0mM2q4hw`;

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    const result = await response.json();

    if (result.error) {
      console.log(result.error);
    }
    const { idToken, localId, expiresIn } = result;
    const expiryTime = new Date();
    expiryTime.setSeconds(expiryTime.getSeconds() + expiresIn);
    const authInfo = JSON.stringify({
      email,
      idToken,
      localId,
      expiryTime: expiryTime.toString(),
    });
    await SecureStore.setItemAsync("credentials", authInfo);

    dispatch({
      type: USER_LOGIN,
      token: idToken,
      userId: localId,
      expiryTime,
      email,
    });
  };
};

export const autoLogin = (token, userId, expiryTime, email) => {
  return {
    type: USER_LOGIN,
    token,
    userId,
    expiryTime,
    email,
  };
};

export const USER_LOGOUT = "USER_LOGOUT";

export const logout = () => async (dispatch) => {
  await SecureStore.deleteItemAsync("credentials");
  dispatch({
    type: USER_LOGOUT,
  });
};

const url = "https://fiec-2020.firebaseio.com/";

// GRAPHICS
export const SET_GRAPHICS = "SET_GRAPHICS";

export const loadGraphics = (userId) => async (dispatch) => {
  const response = await fetch(
    `http://18.230.76.67:5000/orca`
  );
  const graphicsData = await response.json();
  dispatch({
    type: SET_GRAPHICS,
    graphicsData,
  });
};

// BUDGETS
export const SET_BUDGETS = "SET_BUDGETS";

export const loadBudgets = (userId) => async (dispatch) => {
  const response = await fetch(
    `http://18.230.76.67:5000/orca`
  );
  const budgetsData = await response.json();

  dispatch({
    type: SET_BUDGETS,
    budgetsData,
  });
};

export const ADD_BUDGETS = "ADD_BUDGETS";

export const addBudgets = (infoBudgets, userId) => async (dispatch) => {
  await fetch(`http://18.230.76.67:5000/orca`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(infoBudgets),
  });
  dispatch({
    type: ADD_BUDGETS,
    infoBudgets,
  });
};

export const EDIT_BUDGETS = "EDIT_BUDGETS";

export const editBudgets = (id, infoBudgets, userId) => async (dispatch) => {
  await fetch(`http://18.230.76.67:5000/orca/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(infoBudgets),
  });
  dispatch({
    type: EDIT_BUDGETS,
    infoBudgets,
  });
};

export const DELETE_BUDGET = "DELETE_BUDGET";

export const deleteBudget = (id, userId) => async (dispatch) => {
  await fetch(`http://18.230.76.67:5000/orca/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  dispatch({
    type: DELETE_BUDGET,
  });
};
