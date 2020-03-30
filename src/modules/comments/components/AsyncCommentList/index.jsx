import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlexGrid from '@tds/core-flex-grid';
import Spinner from '@tds/core-spinner';
import Box from '@tds/core-box';

import Comment from '../Comment/index.jsx';
import FilterComments from '../FilterComments';
import { GET_COMMENTS_URL } from '../../../../common/constants';

const AsyncCommentList = props => {
	const { filterCommentCriteria } = props;
	let commentList = [];

	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState([]);

	const noCommentsFoundLabel = 'No comments found..';

	useEffect(() => {
		if (isLoading)
			fetch(GET_COMMENTS_URL)
				.then(response => {
					setIsLoading(false);
					return response.json();
				})
				.then(comments => {
					setComments(
						comments.map(c => {
							c.title = c.name;
							c.comment = c.body;
							c.name = c.email;
							return c;
						})
					);
					return true;
				});
	});

	if (comments.length > 0) {
		if (filterCommentCriteria) {
			let filteredComments = comments.filter(c => {
				return c[filterCommentCriteria['search']].toLowerCase().includes(filterCommentCriteria['text'].toLowerCase());
			});
			if (filteredComments.length > 0) commentList = filteredComments.map(fC => <Comment commentDetails={fC} />);
			else commentList = noCommentsFoundLabel;
		} else {
			commentList = comments.map(c => <Comment commentDetails={c} />);
		}
	} else {
		if (isLoading) commentList = noCommentsFoundLabel;
		else commentList = <Spinner spinning label="Loading comments" />;
	}
	return (
		<Fragment>
			<FilterComments />
			<FlexGrid>
				<FlexGrid.Row>
					<FlexGrid.Col>
						<Box between={3}>{commentList}</Box>
					</FlexGrid.Col>
				</FlexGrid.Row>
			</FlexGrid>
		</Fragment>
	);
};

AsyncCommentList.propTypes = {
	history: PropTypes.object.isRequired,
	filterCommentCriteria: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
	children: PropTypes.instanceOf(React.Component),
};

AsyncCommentList.defaultProps = {
	filterCommentCriteria: null,
};

function mapStateToProps(state, ownProps) {
	return {
		filterCommentCriteria: state.filterCommentCriteria,
	};
}

export default connect(
	mapStateToProps,
	null
)(AsyncCommentList);
