import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from '@tds/core-card';
import Box from '@tds/core-box';
import Heading from '@tds/core-heading';
import Text from '@tds/core-text';

const Comment = (props) => {
    const { commentDetails } = props;
    
    return (
        <Fragment key={commentDetails.id}>
            <Card variant="branded" onClick={() => props.history.push(`/edit/${commentDetails.id}`)}>
                <Box between={3} vertical={2}>
                    <Heading level="h3">{commentDetails.title}</Heading>
                    <Text>
                        {commentDetails.comment}
                    </Text>
                    <Text>By: {commentDetails.name}</Text>
                </Box>
            </Card>
        </Fragment> 
    );
}

Comment.propTypes = {
    history: PropTypes.object.isRequired,
    commentDetails: PropTypes.object.isRequired
}

Comment.defaultProps = {
    filterCommentCriteria: null
}

export default Comment;