import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlexGrid from '@tds/core-flex-grid';

import FilterComments from '../FilterComments/index.jsx';
import Comment from '../Comment/index.jsx';

const CommentList = (props) => {
    const { comments, filterCommentCriteria } = props;
    
    if(comments.length > 0 && filterCommentCriteria){

    }

    return (
        <Fragment>
            <FilterComments />
            <FlexGrid>
                <FlexGrid.Row>
                    {comments.length > 0 ? filterCommentCriteria ? comments.filter(c => { return c[filterCommentCriteria['search']].toLowerCase().includes(filterCommentCriteria['text'].toLowerCase()) }).sort((a, b) => b.modified_at - a.modified_at).map(c =>
                        <Comment {...props} c={c} />) : comments.sort((a, b) => b.modified_at - a.modified_at).map(c =>
                            <Comment {...props} c={c} />) : <FlexGrid.Col>No comments found.</FlexGrid.Col>}
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




