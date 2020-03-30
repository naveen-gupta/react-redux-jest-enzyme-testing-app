import { ADD_COMMENT, EDIT_COMMENT, FILTER_COMMENTS, SET_SEARCH } from './types';

export const addComment = (data) => {
  return (dispatch, getState) => {
    let comments = getState().comments.comments || [];
    comments.push(data);
    dispatch({
      type: ADD_COMMENT,
      payload: comments,
    });
  };
};

export const editComment = (data) => {
  return (dispatch, getState) => {
    let comments = getState().comments.comments.filter((c) => c.id !== data.id) || [];
    let payload = [data, ...comments];
    dispatch({
      type: EDIT_COMMENT,
      payload,
    });
  };
};

export const filterComments = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: FILTER_COMMENTS,
      payload: data,
    });
  };
};

export const setSearch = (search) => {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH,
      payload: search,
    });
  };
};
