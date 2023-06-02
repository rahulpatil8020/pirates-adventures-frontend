import { AUTH, ADD_USER_ADVENTURE, GET_USER } from "../constants/actionTypes";
import * as api from "../api/index";

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch({
      type: AUTH,
      payload: data,
    });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({
      type: AUTH,
      payload: data,
    });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const addUserAdventure = (userId, adventureId) => async (dispatch) => {
  try {
    const { data } = await api.addUserAdventure(userId, adventureId);
    dispatch({
      type: ADD_USER_ADVENTURE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);

    dispatch({
      type: GET_USER,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
