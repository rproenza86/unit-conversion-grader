import React from 'react';
import TopAppBar, {
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle
} from '@material/react-top-app-bar';

// styles
import './Header.scss';

function Header() {
    return (
        <TopAppBar>
            <TopAppBarRow>
                <TopAppBarSection align="start">
                    <TopAppBarTitle>UNIT CONVERSIONS GRADER</TopAppBarTitle>
                </TopAppBarSection>
            </TopAppBarRow>
        </TopAppBar>
    );
}

export default Header;
