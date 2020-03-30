import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlexGrid from '@tds/core-flex-grid';
import Select from '@tds/core-select';
import Input from '@tds/core-input';
import Button from '@tds/core-button';
import Box from '@tds/core-box';

import * as CommentActions from '../../actions/commentActions';

const FilterComments = (props) => {
  let { search } = props;

  const _onChange = (evt) => {
    const searchText = {
      ...search,
      ...{ [evt.target.name]: evt.target.value },
    };
    props.setSearch(searchText);
  };

  const _filterComments = (search) => {
    if (search) props.filterComments(search);
    else {
      props.setSearch({});
      props.filterComments(search);
    }
  };

  return (
    <FlexGrid>
      <FlexGrid.Row>
        <FlexGrid.Col>
          <Box>
            <Select
              label="Search"
              placeholder="Please select..."
              name="search"
              options={[
                { text: 'Name', value: 'name' },
                { text: 'Title', value: 'title' },
                { text: 'Comment', value: 'comment' },
              ]}
              value={search.search || ''}
              onChange={_onChange}
            />
          </Box>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <Box>
            <Input label="Text" placeholder="Searching for..." name="text" value={search.text || ''} onChange={_onChange} />
          </Box>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <Box vertical={4}>
            <Button variant="secondary" onClick={() => _filterComments(search)}>
              Search
            </Button>
          </Box>
        </FlexGrid.Col>
        <FlexGrid.Col>
          <Box vertical={4}>
            <Button variant="secondary" onClick={() => _filterComments(null)}>
              Clear
            </Button>
          </Box>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  );
};

FilterComments.propTypes = {
  filterComments: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.object,
};

function mapStateToProps({ comments }) {
  return {
    search: comments.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    filterComments: (data) => dispatch(CommentActions.filterComments(data)),
    setSearch: (search) => dispatch(CommentActions.setSearch(search)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterComments);
