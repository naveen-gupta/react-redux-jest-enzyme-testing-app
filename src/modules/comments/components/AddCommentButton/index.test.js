import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { findByTestAtrr } from '../../../../utils';
import AddCommentButton from './index.jsx';

const setUp = (props={}) => {
    const component = shallow(<AddCommentButton {...props} />);
    return component;
};

function renderWithRouter(
    ui,
    {route = '/', history = createMemoryHistory({initialEntries: [route]})} = {},
  ) {
    return {
      ...render(<Router history={history}>{ui}</Router>),
      // adding `history` to the returned utilities to allow us
      // to reference it in our tests (just try to avoid using
      // this to test implementation details).
      history,
    }
  }

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

    test('rendering a component that uses withRouter', () => {
        const route = "/";
        renderWithRouter(<AddCommentButton />, {route});
        console.log(screen)
        expect(screen.getByTestId('btnAddComment')).textContent('Add Comment');
      })

});