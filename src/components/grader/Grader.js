import React, { useState, useEffect } from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import MaterialIcon from '@material/react-material-icon';
import { Steps } from 'rsuite';
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { Alert } from 'antd';

// internal dependencies
import AssignmentForm from '../assignmentForm/AssignmentForm';
import { Temperatures, Volumes } from '../../constants/unitsMeasures';
import { unitsType } from '../../utils/conversionEvaluator';

// styles
import './Grader.scss';

function Grader({ activeIndexP = 0 }) {
    const [activeIndex, setActiveIndex] = useState(activeIndexP);

    const defaultStepsStatus = ['', '', '', ''];
    const [stepsStatus, setStepsStatus] = useState(defaultStepsStatus);

    const defaultGraderMessage = {
        message: 'Grades Result',
        description: 'Enter data to grade student',
        type: 'info'
    };
    const [graderMessage, setGraderMessage] = useState(defaultGraderMessage);

    // refresh message on tab changes
    useEffect(() => {
        setGraderMessage(defaultGraderMessage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

    // updating step component
    function updateStep(index, value) {
        const nextStatus = [...stepsStatus];
        // possible values: ["finish","wait","process","error"].
        nextStatus[index] = !!value ? 'finish' : 'error';
        setStepsStatus(nextStatus);
    }

    function generateAssignmentForm(unit) {
        const unitsList = unit === unitsType.temp ? Temperatures : Volumes;

        return (
            <AssignmentForm
                units={unitsList}
                unitType={unit}
                onUpdates={updateStep}
                onReset={() => setGraderMessage(defaultGraderMessage)}
                onGradeUpdate={graderMessage => setGraderMessage(graderMessage)}
            />
        );
    }

    function generateSteps() {
        return (
            <Steps vertical className="steps-list">
                {stepsStatus.map((status, index) => (
                    <Steps.Item status={status} key={index} />
                ))}
            </Steps>
        );
    }

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

            <Grid>
                <Row>
                    <Cell className="steps" desktopColumns={2} phoneColumns={1} tabletColumns={1}>
                        {generateSteps()}
                    </Cell>
                    <Cell desktopColumns={10} phoneColumns={3} tabletColumns={7}>
                        {activeIndex === 0 && (
                            <div>
                                <h4>Grading Temperatures</h4>
                                {generateAssignmentForm(unitsType.temp)}
                            </div>
                        )}

                        {activeIndex === 1 && (
                            <div>
                                <h4>Grading Volumes</h4>
                                {generateAssignmentForm(unitsType.vol)}
                            </div>
                        )}
                    </Cell>
                </Row>
            </Grid>

            <Alert {...graderMessage} showIcon />
        </div>
    );
}

export default Grader;
