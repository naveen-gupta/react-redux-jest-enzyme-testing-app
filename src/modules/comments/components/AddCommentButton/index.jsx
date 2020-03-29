import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@tds/core-button';
import Box from '@tds/core-box';

const AddCommentButton = (props) => {

    const _redirectToAdd = () => {
        props.history.push('/add');
    }

    return (
        <Box data-testid="boxAddComment">
            <Button data-testid="btnAddComment" onClick={_redirectToAdd}>Add Comment</Button>
        </Box>
    );
}

AddCommentButton.propTypes = {
    history: PropTypes.object
}


export default withRouter(AddCommentButton);