import {
  CREATE_FEEDPOST,
  UPDATE_FEEDPOST,
  DELETE_FEEDPOST,
  GET_ALL_FEEDPOST,
  GET_ONE_FEEDPOST,
  LIKE_FEEDPOST,
} from "../constants/actionTypes";

const feedPostsReducer = (feedPost = [], action) => {
  switch (action.type) {
    case CREATE_FEEDPOST:
      return [...feedPost, action.payload];
    case UPDATE_FEEDPOST:
      return feedPost.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE_FEEDPOST:
      return feedPost.filter((post) => post._id !== action.payload);
    case GET_ALL_FEEDPOST:
      return action.payload;
    case GET_ONE_FEEDPOST:
      return action.payload;
    case LIKE_FEEDPOST:
      return feedPost.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return feedPost;
  }
};
export default feedPostsReducer;
