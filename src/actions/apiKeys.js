import { GET_GOOGLE_API_KEY } from "../constants/actionTypes";
import * as api from "../api/index";

export const getGoogleMapsAPIKey = () => async (dispatch) => {
  try {
    const { data } = await api.getGoogleMapsAPIKey();
    dispatch({
      type: GET_GOOGLE_API_KEY,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
