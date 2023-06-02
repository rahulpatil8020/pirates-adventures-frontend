import {
  CREATE_ADVENTURE,
  UPDATE_ADVENTURE,
  DELETE_ADVENTURE,
  GET_ALL_ADVENTURES,
  GET_ONE_ADVENTURE,
  LIKE_ADVENTURE,
  ADD_ADVENTURE_PARTICIPANT,
} from "../constants/actionTypes";

const adventurePostsReducer = (adventurePosts = [], action) => {
  switch (action.type) {
    case CREATE_ADVENTURE:
      return [...adventurePosts, action.payload];

    case UPDATE_ADVENTURE:
      return adventurePosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case DELETE_ADVENTURE:
      return adventurePosts.filter((post) => post._id !== action.payload);
    case GET_ALL_ADVENTURES:
      return action.payload;

    case GET_ONE_ADVENTURE:
      return adventurePosts;

    case LIKE_ADVENTURE:
      return adventurePosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case ADD_ADVENTURE_PARTICIPANT:
      return adventurePosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    default:
      return adventurePosts;
  }
};

export default adventurePostsReducer;
