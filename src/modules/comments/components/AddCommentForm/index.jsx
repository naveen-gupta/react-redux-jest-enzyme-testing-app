import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@tds/core-box';
import Input from '@tds/core-input';
import ButtonGroup from '@tds/core-button-group';
import TextArea from '@tds/core-text-area';

import * as CommentActions from '../../actions/commentActions';
import { ERROR_MESSAGE } from '../../../../common/constants';

const AddCommentForm = (props) => {
  let [name, setName] = useState('');
  let [title, setTitle] = useState('');
  let [comment, setComment] = useState('');
  let [error, setError] = useState(null);

  const _onSubmit = () => {
    let errors = {};
    errors = name.length ? errors : { ...errors, ...{ name: ERROR_MESSAGE.ADD_COMMENT_FORM_NAME } };
    errors = title.length ? errors : { ...errors, ...{ title: ERROR_MESSAGE.ADD_COMMENT_FORM_TITLE } };
    errors = comment.length ? errors : { ...errors, ...{ comment: ERROR_MESSAGE.ADD_COMMENT_FORM_COMMENT } };
    const id = new Date().getTime();
    const last_modified = new Date().getTime();
    const data = {
      id,
      name,
      title,
      comment,
      last_modified,
    };
    if (name && comment && title) {
      props.addComment(data);
      props.filterComments(null);
      props.history.push('/list');
    } else {
      setError(errors);
    }
  };

  const _onCancel = () => {
    props.history.push('/');
  };

  return (
    <Box between={2}>
      <Input
        label="Name"
        placeholder="Enter name"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        feedback={error ? (error.hasOwnProperty('name') ? 'error' : 'success') : null}
        error={error && error.hasOwnProperty('name') ? <Fragment>{ERROR_MESSAGE.ADD_COMMENT_FORM_NAME}</Fragment> : ''}
      />
      <Input
        label="Title"
        placeholder="Enter title"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
        feedback={error ? (error.hasOwnProperty('title') ? 'error' : 'success') : null}
        error={error && error.hasOwnProperty('title') ? <Fragment>{ERROR_MESSAGE.ADD_COMMENT_FORM_TITLE}</Fragment> : ''}
      />
      <TextArea
        label="Comment"
        placeholder="Enter comment"
        value={comment}
        onChange={(evt) => setComment(evt.target.value)}
        feedback={error ? (error.hasOwnProperty('comment') ? 'error' : 'success') : null}
        error={error && error.hasOwnProperty('comment') ? <Fragment>{ERROR_MESSAGE.ADD_COMMENT_FORM_COMMENT}</Fragment> : ''}
      />
      <ButtonGroup name="button" label="">
        <ButtonGroup.Item value="cancel" onClick={_onCancel}>
          Cancel
        </ButtonGroup.Item>
        <ButtonGroup.Item value="submit" onClick={_onSubmit}>
          Add
        </ButtonGroup.Item>
      </ButtonGroup>
    </Box>
  );
};

AddCommentForm.propTypes = {
  history: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  addComment: PropTypes.func.isRequired,
  filterComments: PropTypes.func.isRequired,
};

AddCommentForm.defaultProps = {
  comments: [],
};

function mapStateToProps(state, ownProps) {
  return {
    comments: state.comments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (data) => dispatch(CommentActions.addComment(data)),
    filterComments: (data) => dispatch(CommentActions.filterComments(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCommentForm);
