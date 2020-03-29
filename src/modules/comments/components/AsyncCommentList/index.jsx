import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlexGrid from '@tds/core-flex-grid';
import Spinner from '@tds/core-spinner';
import Box from '@tds/core-box';

import Comment from '../Comment/index.jsx';
import FilterComments from '../FilterComments';
import { GET_COMMENTS_URL } from '../../../../common/constants';

const AsyncCommentList = (props) => {

    const { filterCommentCriteria } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);

    const noCommentsFoundColStyle = { xs: 'center', md: 'center' };
    const noCommentsFoundLabel = "No comments found..";

    useEffect(() => {
        if (isLoading)
            fetch(GET_COMMENTS_URL)
                .then(response => { setIsLoading(false); return response.json(); })
                .then(comments => { setComments(comments.map(c => { c.title = c.name; c.comment = c.body; c.name = c.email; return c; })); return true; });
    });

    if (comments.length > 0) {
        if (filterCommentCriteria) {
            const filteredComments = comments.filter(c => c[filterCommentCriteria['search']].toLowerCase().includes(filterCommentCriteria['text'].toLowerCase()));
            if (filteredComments.length > 0) {
                return <RenderChild>{filteredComments.map(fC => <Comment commentDetails={fC} />)}</RenderChild>;
            } else {
                return (<RenderChild>
                    <FlexGrid.Col horizontalAlign={noCommentsFoundColStyle}>
                        {noCommentsFoundLabel}
                    </FlexGrid.Col>
                </RenderChild>);
            }
        }
        return (<RenderChild>{comments.map(c => <Comment commentDetails={c} />)}</RenderChild>);
    } else {
        if (isLoading)
            return (<RenderChild>
                <FlexGrid.Col horizontalAlign={noCommentsFoundColStyle}>
                    {noCommentsFoundLabel}
                </FlexGrid.Col>
            </RenderChild>);
        return (<RenderChild>
            <FlexGrid.Col horizontalAlign={noCommentsFoundColStyle}>
                <Spinner spinning label="Loading comments" />
            </FlexGrid.Col>
        </RenderChild>);
    }
}

const RenderChild = props => {
    return (
        <Fragment>
            <FilterComments />
            <FlexGrid>
                <FlexGrid.Row>
                    <Box between={3}>
                        {props.children}
                    </Box>
                </FlexGrid.Row>
            </FlexGrid>
        </Fragment>);
}

AsyncCommentList.propTypes = {
    history: PropTypes.object.isRequired,
    filterCommentCriteria: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    children: PropTypes.instanceOf(React.Component)
}

AsyncCommentList.defaultProps = {
    filterCommentCriteria: null
}

function mapStateToProps(state, ownProps) {
    return {
        filterCommentCriteria: state.filterCommentCriteria
    }
}

export default connect(mapStateToProps, null)(AsyncCommentList);




