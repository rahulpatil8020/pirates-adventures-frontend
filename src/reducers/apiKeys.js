import { GET_GOOGLE_API_KEY } from "../constants/actionTypes";

const adventurePostsReducer = (apiKeys = {}, action) => {
  switch (action.type) {
    case GET_GOOGLE_API_KEY:
      return { ...apiKeys, googleMapsAPIKey: action.payload };

    default:
      return apiKeys;
  }
};

export default adventurePostsReducer;
