import { ADD_COMMENT, EDIT_COMMENT, FILTER_COMMENTS, SET_SEARCH } from '../modules/comments/actions/types';

const initialState = { comments: [], search: {} };

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return Object.assign({}, state, { comments: action.payload });

    case EDIT_COMMENT:
      return Object.assign({}, state, { comments: action.payload });

    case FILTER_COMMENTS:
      return Object.assign({}, state, {
        filterCommentCriteria: action.payload,
      });

    case SET_SEARCH:
      return Object.assign({}, state, { search: action.payload });

    default:
      return state;
  }
}
