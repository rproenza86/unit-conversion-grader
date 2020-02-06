import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { fireEvent } from '@testing-library/react';

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

describe('Grader component integration tests', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);

        act(() => {
            ReactDOM.render(<Grader />, container);
        });
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    it('should have Temperature tab as default', () => {
        const sectionTitle = container.querySelector('h4');
        expect(sectionTitle.textContent).toBe('Grading Temperatures');
    });

    it('should change tab content on tab click', () => {
        const volumesTab = container.querySelector('.volumes-tab');

        // Test second render and effect
        act(() => {
            volumesTab.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        const sectionTitle = container.querySelector('h4');
        expect(sectionTitle.textContent).toBe('Grading Volumes');
    });

    it('should update step on form item change', () => {
        // initial state check
        const step1 = container.querySelector('.rs-steps-item-icon');
        expect(step1.classList[1]).toBe('rs-steps-item-icon-process');

        const inputField = container.querySelector('input');

        fireEvent.change(inputField, { target: { value: '23' } });
        expect(inputField.value).toBe('23');
        expect(step1.classList[1]).toBe('rs-steps-item-icon-finish');
    });

    it('should reset the form', () => {
        const inputField = container.querySelector('input');
        fireEvent.change(inputField, { target: { value: '23' } });
        expect(inputField.value).toBe('23');

        const resetBtn = container.querySelector('.reset');
        // Test second render and effect
        act(() => {
            resetBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(inputField.value).toBe('');
    });
});
