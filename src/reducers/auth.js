import {
  AUTH,
  LOGOUT,
  GET_USER,
  ADD_USER_ADVENTURE,
} from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };
    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, authData: null };
    case GET_USER:
      return { ...state, authData: action?.payload };

    case ADD_USER_ADVENTURE: {
      console.log(state);
      return { ...state, authData: action?.payload };
    }
    default:
      return state;
  }
};

export default authReducer;
