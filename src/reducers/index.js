import { ADD_COMMENT, EDIT_COMMENT, FILTER_COMMENTS } from '../modules/comments/actions/types';

const initialState = {showAddCommentForm: false, comments: [], listFetched: false}
export default function rootReducer(state=initialState, action) {
    switch (action.type) {

        case ADD_COMMENT:        
            return Object.assign({}, state, {comments: action.payload});

        case EDIT_COMMENT:            
            return Object.assign({}, state, {comments: action.payload});

        case FILTER_COMMENTS: 
            return Object.assign({}, state, {filterCommentCriteria: action.payload});

        default:
            return state;
    }
   
}