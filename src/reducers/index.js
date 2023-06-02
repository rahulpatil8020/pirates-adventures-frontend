import { combineReducers } from "redux";
import authReducer from "./auth";
import adventurePostsReducer from "./adventurePosts";
import feedPostsReducer from "./feedPosts";
import apiKeysReducer from "./apiKeys";
import chatRoomsReducer from "./chatRoom";
const reducers = combineReducers({
  authReducer,
  adventurePostsReducer,
  feedPostsReducer,
  apiKeysReducer,
  chatRoomsReducer,
});

export default reducers;
