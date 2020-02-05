import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';

import Footer from '../Footer';

describe('Footer component', () => {
    it('should renders the Copyright info', () => {
        const { getByText } = render(<Footer />);
        const appTitle = getByText(/Copyright/i);
        expect(appTitle).toBeInTheDocument();
    });
    it('should renders the author link', () => {
        const wrapper = shallow(<Footer />);
        const authorLink = <a href="http://raulproenza.page/"> Raul Proenza </a>;
        // expect(wrapper.contains(welcome)).toBe(true);
        expect(wrapper.contains(authorLink)).toEqual(true);
    });
});
