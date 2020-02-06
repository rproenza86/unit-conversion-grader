import React from 'react';
import { shallow } from 'enzyme';

import Grader from '../Grader';

describe('Grader component', () => {
    it('should renders without crashing', () => {
        shallow(<Grader />);
    });
    it('should have the Temperatures tab', () => {
        const wrapper = shallow(<Grader />);
        expect(wrapper.find('.temperatures-tab > .mdc-tab__text-label').text()).toEqual(
            'Temperatures'
        );
    });
    it('should go the Volumes tab', () => {
        const wrapper = shallow(<Grader />);
        expect(wrapper.find('.volumes-tab > .mdc-tab__text-label').text()).toEqual('Volumes');
    });
    it('should go the the Temperatures section', () => {
        const wrapper = shallow(<Grader />);
        wrapper.find('.temperatures-tab').simulate('click');
        const sectionTitle = wrapper.find('h4').text();
        expect(sectionTitle).toEqual('Grading Temperatures');
    });
    it('should go the the Volumes section', () => {
        const wrapper = shallow(<Grader activeIndexP={1} />);
        const sectionTitle = wrapper.find('h4').text();
        expect(sectionTitle).toEqual('Grading Volumes');
    });
});
