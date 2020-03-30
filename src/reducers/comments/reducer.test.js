import { ADD_COMMENT, EDIT_COMMENT, FILTER_COMMENTS, SET_SEARCH } from '../../modules/comments/actions/types';
import commentReducer from './reducer';

describe('Comments Reducer', () => {
  test('Should return default state', () => {
    const initialState = { comments: [], search: {} };
    const newState = commentReducer(undefined, {});
    expect(newState).toEqual(initialState);
  });

  test('Should return new state for "[ADD COMMENT]"', () => {
    const state = { comments: [{ id: 1, title: 'Test title', name: 'Test name', comment: 'Test comment' }], search: {} };
    const newState = commentReducer(state, {
      type: ADD_COMMENT,
      payload: state.comments,
    });
    expect(newState).toEqual(state);
  });

  test('Should return new state for "[ADD_COMMENT]"', () => {
    const state = { comments: [{ id: 1, title: 'Test title', name: 'Test name', comment: 'Test comment' }], search: {} };
    const newState = commentReducer(state, {
      type: ADD_COMMENT,
      payload: state.comments,
    });
    expect(newState).toEqual(state);
  });

  test('Should return new state for "[EDIT_COMMENT]"', () => {
    const state = { comments: [{ id: 1, title: 'Test title', name: 'Test name', comment: 'Test comment' }], search: {} };
    const newState = commentReducer(state, {
      type: EDIT_COMMENT,
      payload: state.comments,
    });
    expect(newState).toEqual(state);
  });

  test('Should return new state for "[FILTER_COMMENTS]"', () => {
    const state = {
      comments: [{ id: 1, title: 'Test title', name: 'Test name', comment: 'Test comment' }],
      search: {},
      filterCommentCriteria: { search: 'name', text: 'eliseo' },
    };
    const newState = commentReducer(state, {
      type: FILTER_COMMENTS,
      payload: state.filterCommentCriteria,
    });
    expect(newState).toEqual(state);
  });

  test('Should return new state for "[SET_SEARCH]"', () => {
    const state = { comments: [{ id: 1, title: 'Test title', name: 'Test name', comment: 'Test comment' }], search: { search: 'name', text: 'eliseo' } };
    const newState = commentReducer(state, {
      type: SET_SEARCH,
      payload: state.search,
    });
    expect(newState).toEqual(state);
  });
});
