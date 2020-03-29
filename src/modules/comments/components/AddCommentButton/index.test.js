import React from 'react';
import { shallow } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { findByTestAtrr } from '../../../../utils';
import AddCommentButton from './index.jsx';

const setUp = (props={}) => {
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

    test('rendering a component that uses withRouter', () => {
        const history = createMemoryHistory();
        const route = '/';
        history.push(route)
        const { getByTestId } = render(
          <Router history={history}>
            <AddCommentButton />
          </Router>
        );
        expect(getByTestId('boxAddComment')).toHaveTextContent(route);
      })

});