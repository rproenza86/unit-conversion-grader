import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';

describe('Main App component', () => {
    it('should renders without crashing', () => {
        shallow(<App />);
    });
    it('should display render Grader component', () => {
        const component = shallow(<App />);
        const tree = component.getElement();
        expect(tree).toMatchSnapshot();
    });
});
