import React from 'react';
import PropTypes from 'prop-types';
import Card from '@tds/core-card';
import Box from '@tds/core-box';
import Heading from '@tds/core-heading';
import Text from '@tds/core-text';

const Comment = (props) => {
    const { commentDetails } = props;

    if(commentDetails){
        return (
                <Card data-test="wrapperComment" variant="branded" onClick={() => props.history.push(`/edit/${commentDetails.id}`)}>
                    <Box between={3} vertical={2}>
                        <Heading data-test="titleComment" level="h3">{commentDetails.title}</Heading>
                        <Text data-test="textComment">
                            {commentDetails.comment}
                        </Text>
                        <Text data-test="nameComment">{`By: ${commentDetails.name}`}</Text>
                    </Box>
                </Card>
        );
    } else {
        return <div data-test="wrapperComment">{null}</div>;
    }
    
   
}

Comment.propTypes = {
    history: PropTypes.array,
    commentDetails: PropTypes.object
}

Comment.defaultProps = {
    commentDetails: null,
    history:[]
}

export default Comment;