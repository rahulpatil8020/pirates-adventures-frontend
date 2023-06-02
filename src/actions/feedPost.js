import {
  CREATE_FEEDPOST,
  UPDATE_FEEDPOST,
  DELETE_FEEDPOST,
  GET_ALL_FEEDPOST,
  GET_ONE_FEEDPOST,
  LIKE_FEEDPOST,
} from "../constants/actionTypes";

import * as api from "../api/index";

export const getAllFeedPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getAllFeedPosts();

    dispatch({
      type: GET_ALL_FEEDPOST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFeedPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFeedPost(id);
    dispatch({
      type: GET_ONE_FEEDPOST,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createFeedPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createFeedPost(post);
    dispatch({
      type: CREATE_FEEDPOST,
      payload: data,
    });
    navigate("/feed");
  } catch (error) {
    console.log(error);
  }
};

export const updateFeedPost = (post, navigate) => async (dispatch) => {
  try {
    const { data } = await api.updateFeedPost(post._id, post);
    dispatch({
      type: UPDATE_FEEDPOST,
      payload: data,
    });
    navigate("/feed");
  } catch (error) {
    console.log(error);
  }
};

export const deleteFeedPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteFeedPost(id);
    dispatch({
      type: DELETE_FEEDPOST,
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeFeedPost = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.likeFeedPost(id, userId);
    dispatch({
      type: LIKE_FEEDPOST,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
