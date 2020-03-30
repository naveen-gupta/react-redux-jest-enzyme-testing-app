import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@tds/core-button';
import Box from '@tds/core-box';
import DimpleDivider from '@tds/core-dimple-divider';

const AddCommentButton = props => {
	const _redirectToAdd = () => {
		props.history.push('/add');
	};

	return (
		<Fragment>
			<DimpleDivider data-test="dimDivAddCommentBeforeContent"/>
			<Box data-test="boxAddComment">
				<Button data-test="btnAddComment" onClick={_redirectToAdd}>
					Add Comment
				</Button>
			</Box>
			<DimpleDivider data-test="dimDivAddCommentAfterContent"/>
		</Fragment>
	);
};

AddCommentButton.propTypes = {
	history: PropTypes.object,
};

export default AddCommentButton;
