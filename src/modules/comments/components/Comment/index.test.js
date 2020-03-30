import React from 'react';
import { shallow, mount } from 'enzyme';

import { findByTestAtrr } from '../../../../utils';
import Comment from './index.jsx';

const setUp = (props = {}) => {
	const component = shallow(<Comment {...props} />);
	return component;
};

describe('Comment Component', () => {
	let component;
	beforeEach(() => {
		component = setUp();
	});

	test('Should render without errors', () => {
		const wrapper = findByTestAtrr(component, 'wrapperComment');
		expect(wrapper.length).toBe(1);
	});

	describe('Have props', () => {
		let wrapper;
		const props = {
			commentDetails: {
				id: 1,
				title: 'Test title',
				name: 'Test name',
				comment: 'Test comment',
			},
			history: [],
    };
    
		beforeEach(() => {
			wrapper = setUp({...props});
		});

		test('Should render without errors', () => {
			const component = findByTestAtrr(wrapper, 'wrapperComment');
			expect(component.length).toBe(1);
    });
    
    test('Should render a comment with title "Test title"', () => {
      const titleComment = findByTestAtrr(wrapper, 'titleComment');
      expect(titleComment.containsMatchingElement("Test title")).toBeTruthy();
    });
    
    test('Should render a comment with name "Test name"', () => {
      const nameComment = findByTestAtrr(wrapper, 'nameComment');
      expect(nameComment.containsMatchingElement("By: Test name")).toBeTruthy();
    });

    test('Should render a comment with text "Test comment"', () => {
      const textComment = findByTestAtrr(wrapper, 'textComment');
      expect(textComment.containsMatchingElement("Test comment")).toBeTruthy();
    });

		test('Checking snapshot with providing props', () => {
			const wrap = mount(<Comment {...props} />);
			expect(wrap).toMatchSnapshot();
    });
    
  });
  
  describe('Does not have props', () => {
		let wrapper;
    
		beforeEach(() => {
			wrapper = setUp();
		});

		test('Should render without errors', () => {
			const component = findByTestAtrr(wrapper, 'wrapperComment');
			expect(component.length).toBe(1);
		});

		test('Checking snapshot without providing props', () => {
			const wrap = mount(<Comment />);
			expect(wrap).toMatchSnapshot();
		});
	});
});
