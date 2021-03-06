import React, { useState, useEffect } from "react";
import Tab from "@material/react-tab";
import TabBar from "@material/react-tab-bar";
import MaterialIcon from "@material/react-material-icon";
import { Steps } from "rsuite";
import { Cell, Grid, Row } from "@material/react-layout-grid";
import { Alert } from "antd";
import Switch from "@material/react-switch";

// internal dependencies
import AssignmentForm from "../assignmentForm/AssignmentForm";
import { Temperatures, Volumes } from "../../constants/unitsMeasures";
import { unitsType } from "../../utils/conversionEvaluator";

// styles
import "./Grader.scss";

function Grader({ activeIndexP = 0 }) {
  const [activeIndex, setActiveIndex] = useState(activeIndexP);
  const [isErrorProneEnable, setIsErrorProneEnable] = useState(false);

  const defaultStepsStatus = ["", "", "", ""];
  const [stepsStatus, setStepsStatus] = useState(defaultStepsStatus);

  const defaultGraderMessage = {
    message: "Grades Result",
    description: "Enter data to grade student",
    type: "info"
  };
  const [graderMessage, setGraderMessage] = useState(defaultGraderMessage);

  // refresh message on tab changes
  useEffect(() => {
    resetGrader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isErrorProneEnable]);

  // updating step component
  function updateStep(index, value) {
    const nextStatus = [...stepsStatus];
    // possible values: ["finish","wait","process","error"].
    nextStatus[index] = !!value ? "finish" : "error";
    setStepsStatus(nextStatus);
  }

  function resetGrader() {
    setGraderMessage(defaultGraderMessage);
    setStepsStatus(defaultStepsStatus);
  }

  function generateAssignmentForm(unit) {
    let unitsList;

    switch (unit) {
      case unitsType.temp:
        unitsList = Temperatures;
        break;
      case unitsType.vol:
        unitsList = Volumes;
        break;

      default:
        unitsList = [...Temperatures, ...Volumes];
        break;
    }

    return (
      <AssignmentForm
        units={unitsList}
        unitType={unit}
        onUpdates={updateStep}
        onReset={resetGrader}
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
      {!isErrorProneEnable && (
        <TabBar
          activeIndex={activeIndex}
          handleActiveIndexUpdate={setActiveIndex}
        >
          <Tab className="temperatures-tab">
            <MaterialIcon icon="timeline" />
            <span className="mdc-tab__text-label">Temperatures</span>
          </Tab>
          <Tab className="volumes-tab">
            <MaterialIcon icon="filter_frames" />
            <span className="mdc-tab__text-label">Volumes</span>
          </Tab>
        </TabBar>
      )}

      <Grid>
        <Row>
          <Cell
            className="steps"
            desktopColumns={2}
            phoneColumns={1}
            tabletColumns={1}
          >
            {generateSteps()}

            <Switch
              nativeControlId="error-prone"
              checked={isErrorProneEnable}
              onChange={e => setIsErrorProneEnable(e.target.checked)}
            />
            <label htmlFor="error-prone" className="switch-label">
              Error Prone Mode
            </label>
          </Cell>
          <Cell desktopColumns={10} phoneColumns={3} tabletColumns={7}>
            {!isErrorProneEnable && activeIndex === 0 && (
              <div>
                <h4>Grading Temperatures</h4>
                {generateAssignmentForm(unitsType.temp)}
              </div>
            )}

            {!isErrorProneEnable && activeIndex === 1 && (
              <div>
                <h4>Grading Volumes</h4>
                {generateAssignmentForm(unitsType.vol)}
              </div>
            )}

            {isErrorProneEnable && (
              <div>
                <h4>Grading Any Unit</h4>
                {generateAssignmentForm(unitsType.any)}
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
