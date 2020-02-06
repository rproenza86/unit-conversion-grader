import React, { useState } from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import MaterialIcon from '@material/react-material-icon';

// styles
import '@material/react-tab-bar/dist/tab-bar.css';
import '@material/react-tab-scroller/dist/tab-scroller.css';
import '@material/react-tab/dist/tab.css';
import '@material/react-tab-indicator/dist/tab-indicator.css';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/elevation/dist/mdc.elevation.css';

import './Grader.css';

function Grader({ activeIndexP = 0 }) {
    const [activeIndex, setActiveIndex] = useState(activeIndexP);

    return (
        <div className="grader mdc-elevation--z12">
            <TabBar activeIndex={activeIndex} handleActiveIndexUpdate={setActiveIndex}>
                <Tab className="temperatures-tab">
                    <MaterialIcon icon="timeline" />
                    <span className="mdc-tab__text-label">Temperatures</span>
                </Tab>
                <Tab className="volumes-tab">
                    <MaterialIcon icon="filter_frames" />
                    <span className="mdc-tab__text-label">Volumes</span>
                </Tab>
            </TabBar>

            {activeIndex === 0 && (
                <div>
                    <h4>Grading Temperatures</h4>
                </div>
            )}

            {activeIndex === 1 && (
                <div>
                    <h4>Grading Volumes</h4>
                </div>
            )}
        </div>
    );
}

export default Grader;
