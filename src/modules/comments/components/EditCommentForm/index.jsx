import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@tds/core-box';
import Input from '@tds/core-input';
import ButtonGroup from '@tds/core-button-group';
import TextArea from '@tds/core-text-area';

import * as CommentActions from '../../actions/commentActions';

const EditCommentForm = (props) => {

    let [currentComment, setCurrentComment] = useState(null);
    let [comment, setComment] = useState(null);
    let [error, setError] = useState(null);

    useEffect(() => {
        const comments = props.comments;
        const currentCommentId = props.match.params.id;
        const current_Comment = currentCommentId ? comments.filter(c => c.id.toString() === currentCommentId)[0]: null;
        if(comments.length === 0){
            props.history.push("/");
        } 
        else if(!currentComment && !comment){
            setComment(current_Comment.comment);
            setCurrentComment(current_Comment);
        }   
            
    });

    // Submitting form data
    const _onSubmit = () => {
        let errors = {};
        errors = comment ? errors : { ...errors, ...{ comment: 'Please provide the comment' } };
        const data = {
            id: currentComment.id,
            name: currentComment.name,
            title: currentComment.title,
            comment,
            last_modified: (new Date()).getTime()
        }
        if (comment) {
            props.editComment(data);
            props.filterComments(null);
            props.history.push('/list');
        } else {
            setError(errors);
        }
    }

    const _onCancel = () => {
        props.history.push('/list');
    }

    return (        
        <Box between={2}>
            <Input label="Name"
                value={currentComment ? currentComment.name: ""}
                disabled
                />
            <Input label="Title"
                value={currentComment ? currentComment.title: ""}
                disabled
                />
            <TextArea label="Comment"
                placeholder="Enter comment"
                value={comment}
                onChange={(evt) => setComment(evt.target.value)}
                feedback={error ? error.hasOwnProperty('comment') ? "error" : "success" : ""}
                error={
                    error && error.hasOwnProperty('comment') ?
                        <React.Fragment>
                             Please provide the comment.
                        </React.Fragment> : ''
                } />
            <ButtonGroup name="button" label="">
                <ButtonGroup.Item value="cancel" onClick={_onCancel}>Cancel</ButtonGroup.Item>
                <ButtonGroup.Item value="submit" onClick={_onSubmit}>Submit</ButtonGroup.Item>
            </ButtonGroup>
        </Box>
    );
}

EditCommentForm.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    editComment: PropTypes.func.isRequired,
    filterComments: PropTypes.func.isRequired
}

EditCommentForm.defaultProps = {
    comments: []
}

function mapStateToProps(state, ownProps) {
    return {
        comments: state.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        editComment: (data) => dispatch(CommentActions.editComment(data)),
        filterComments: (data) => dispatch(CommentActions.filterComments(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentForm);
