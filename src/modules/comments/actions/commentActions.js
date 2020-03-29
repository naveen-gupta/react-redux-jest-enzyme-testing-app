import { ADD_COMMENT, EDIT_COMMENT, FILTER_COMMENTS } from './types';


export const addComment = (data) => {
    return (dispatch, getState) => {
        let comments = getState().comments || [];
        comments.push(data);
        dispatch({
            type: ADD_COMMENT,
            payload: comments
        });        
    };
}

export const editComment = (data) => {   
    return (dispatch, getState) => {
        let comments = getState().comments.filter(c => c.id !== data.id) || [];
        let payload=[data, ...comments];
        dispatch({
            type: EDIT_COMMENT,
            payload
        });        
    };
}


export const filterComments = (data) => {   
    return (dispatch, getState) => {
        dispatch({
            type: FILTER_COMMENTS,
            payload: data
        });        
    };
}


