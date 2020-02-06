import React from 'react';

// styles
import './Footer.scss';

function Footer() {
    return (
        <footer>
            &copy; {new Date().getFullYear()} Copyright:{' '}
            <a href="http://raulproenza.page/"> Raul Proenza </a>
        </footer>
    );
}

export default Footer;
