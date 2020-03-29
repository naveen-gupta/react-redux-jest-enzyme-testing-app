import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from '@tds/core-card';
import Box from '@tds/core-box';
import Heading from '@tds/core-heading';
import Text from '@tds/core-text';

const Comment = (props) => {
    const { c } = props;
    return (
        <Fragment key={c.id}>
            <Card variant="branded" onClick={() => props.history.push(`/edit/${c.id}`)}>
                <Box between={3} vertical={2}>
                    <Heading level="h3">{c.title}</Heading>
                    <Text>
                        {c.comment}
                    </Text>
                    <Text>By: {c.name}</Text>
                </Box>
            </Card>
        </Fragment> 
    );
}

Comment.propTypes = {
    history: PropTypes.object.isRequired,
    c: PropTypes.object.isRequired
}

Comment.defaultProps = {
    filterCommentCriteria: null
}

export default Comment;