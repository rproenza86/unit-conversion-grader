import React from 'react';
import { shallow, mount } from 'enzyme';

import { Volumes } from '../../../constants/unitsMeasures';

import AssignmentForm from '../AssignmentForm';

describe('AssignmentForm component', () => {
    it('should renders without crashing', () => {
        shallow(<AssignmentForm units={Volumes} />);
    });
    it('should inputs with null values', () => {
        const wrapper = mount(<AssignmentForm units={Volumes} />);

        expect(
            wrapper
                .find('input')
                .at(0)
                .prop('value')
        ).toEqual('');
        expect(
            wrapper
                .find('input')
                .at(1)
                .prop('value')
        ).toEqual('');
    });
    it('should inputs with null values', () => {
        const wrapper = mount(<AssignmentForm units={Volumes} />);

        wrapper
            .find('input')
            .at(0)
            .simulate('change', { target: { value: 50 } });
        wrapper
            .find('input')
            .at(1)
            .simulate('change', { target: { value: 60 } });

        wrapper.find('button').simulate('click');

        expect(
            wrapper
                .find('input')
                .at(0)
                .prop('value')
        ).toEqual('');
        expect(
            wrapper
                .find('input')
                .at(1)
                .prop('value')
        ).toEqual('');
    });
    it('should select with default values', () => {
        const wrapper = mount(<AssignmentForm units={Volumes} />);

        expect(
            wrapper
                .find('select')
                .at(0)
                .prop('value')
        ).toEqual('');
        expect(
            wrapper
                .find('select')
                .at(1)
                .prop('value')
        ).toEqual('');
    });
    it('should update select values on changes', () => {
        const wrapper = mount(<AssignmentForm units={Volumes} />);

        const updateValue = Volumes[3].value;

        wrapper
            .find('select')
            .at(0)
            .simulate('change', { target: { value: updateValue } });
        expect(
            wrapper
                .find('select')
                .at(0)
                .prop('value')
        ).toEqual(updateValue);

        wrapper
            .find('select')
            .at(1)
            .simulate('change', { target: { value: updateValue } });
        expect(
            wrapper
                .find('select')
                .at(1)
                .prop('value')
        ).toEqual(updateValue);
    });
});
