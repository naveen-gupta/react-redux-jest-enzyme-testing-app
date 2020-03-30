import React from 'react';
import { shallow, mount } from 'enzyme';
import { findByTestAtrr } from '../../../../utils';
import AddCommentButton from './index.jsx';

const setUp = (props = {}) => {
  const component = shallow(<AddCommentButton {...props} />);
  return component;
};

describe('AddCommentButton Component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  test('Should render without errors', () => {
    const wrapper = findByTestAtrr(component, 'boxAddComment');
    expect(wrapper.length).toBe(1);
  });

  test('Should render a button', () => {
    const button = findByTestAtrr(component, 'btnAddComment');
    expect(button.length).toBe(1);
  });

  test('Should render a dimpleDivider before add comment content', () => {
    const dimDivAddCommentBeforeContent = findByTestAtrr(component, 'dimDivAddCommentBeforeContent');
    expect(dimDivAddCommentBeforeContent.length).toBe(1);
  });

  test('Should render a dimpleDivider after add comment content', () => {
    const dimDivAddCommentAfterContent = findByTestAtrr(component, 'dimDivAddCommentAfterContent');
    expect(dimDivAddCommentAfterContent.length).toBe(1);
  });

  test('Should render a button with content "Add Comment"', () => {
    const button = findByTestAtrr(component, 'btnAddComment');
    expect(button.containsMatchingElement('Add Comment')).toBeTruthy();
  });

  test('Checking snapshot', () => {
    const wrap = mount(<AddCommentButton />);
    expect(wrap).toMatchSnapshot();
  });
});
