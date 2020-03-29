import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlexGrid from '@tds/core-flex-grid';

import FilterComments from '../FilterComments/index.jsx';
import Comment from '../Comment/index.jsx';

const CommentList = (props) => {
    const { comments, filterCommentCriteria } = props;
    let commentList = null;
    const noCommentsFoundMessage = 'No comments found.';

    const sortByModifiedAt = (a, b) => {
        return b['modified_at'] - a['modified_at'];
    }
    
    if (comments.length > 0) {
        if (filterCommentCriteria) {
            let filteredComments = comments.filter(c => { return c[filterCommentCriteria['search']].toLowerCase().includes(filterCommentCriteria['text'].toLowerCase()) });
            if (filteredComments.length > 0)
                commentList = filteredComments.sort(sortByModifiedAt).map(c => <Comment {...props} commentDetails={c} />);
            else
                commentList = noCommentsFoundMessage;
        } else {
            commentList = comments.sort(sortByModifiedAt).map(c => <Comment {...props} commentDetails={c} />);
        }

    } else {
        commentList = noCommentsFoundMessage;
    }

    return (
        <Fragment>
            <FilterComments />
            <FlexGrid>
                <FlexGrid.Row>
                    <FlexGrid.Col>
                        {commentList}
                    </FlexGrid.Col>
                </FlexGrid.Row>
            </FlexGrid>
        </Fragment>);
}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
    filterCommentCriteria: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
}

CommentList.defaultProps = {
    comments: [],
    filterCommentCriteria: null
}

function mapStateToProps(state, ownProps) {
    return {
        comments: state.comments,
        filterCommentCriteria: state.filterCommentCriteria
    }
}

export default connect(mapStateToProps, null)(CommentList);




