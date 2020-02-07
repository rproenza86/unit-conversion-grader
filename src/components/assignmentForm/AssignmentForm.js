import React, { useState, useEffect, useMemo } from "react";
import TextField, { HelperText, Input } from "@material/react-text-field";
import MaterialIcon from "@material/react-material-icon";
import Select, { Option } from "@material/react-select";
import Button from "@material/react-button";

// internal dependencies
import conversionEvaluator, {
  conversionToAnyEvaluator,
  evaluationTypes,
  unitsType
} from "../../utils/conversionEvaluator";

// styles
import "./AssignmentForm.scss";

function AssignmentForm({
  units,
  onUpdates,
  onGradeUpdate,
  unitType,
  onReset
}) {
  const [fromInputValue, setFromInputValue] = useState();
  const [inputUnitValue, setInputUnitValue] = useState();
  const [targetUnitValue, setTargetUnitValue] = useState();
  const [studentResponseValue, setStudentResponseValue] = useState();

  const generateUnitsOptions = () => {
    const options = units.map(unit => (
      <Option key={unit.value} value={unit.value}>
        {unit.label}
      </Option>
    ));

    options.unshift(<Option key={units.length} disabled></Option>);

    return options;
  };

  const onResetClick = () => {
    setFromInputValue();
    setStudentResponseValue();
    setInputUnitValue();
    setTargetUnitValue();
    onReset && onReset();
  };

  const updateFieldStatus = (index, value) =>
    onUpdates && onUpdates(index, value);

  useEffect(() => {
    evaluateOnChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputUnitValue, targetUnitValue, fromInputValue, studentResponseValue]);

  const evaluateSolution = () => {
    let evaluation;

    const evaluatorConfig = {
      unit: unitType,
      inputValue: Number(fromInputValue),
      inputValueUnit: inputUnitValue,
      conversionValueUnit: targetUnitValue,
      conversionValue: Number(studentResponseValue)
    };
    if (unitType === unitsType.any) {
      evaluation = conversionToAnyEvaluator(evaluatorConfig);
    } else {
      evaluation = conversionEvaluator(evaluatorConfig);
    }

    return evaluation;
  };

  /**
   * This performance optimization improve the computation from 6ms to 0.3ms
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const solutionEvaluation = useMemo(() => evaluateSolution(), [
    inputUnitValue,
    targetUnitValue,
    fromInputValue,
    studentResponseValue
  ]);

  const evaluateOnChange = () => {
    if (!onGradeUpdate) {
      return;
    }

    if (
      !fromInputValue ||
      !studentResponseValue ||
      !inputUnitValue ||
      !targetUnitValue
    ) {
      return;
    }

    const evaluation = solutionEvaluation;

    switch (evaluation) {
      case evaluationTypes.correct:
        onGradeUpdate({
          message: "Grades Result",
          description: "The student solution is correct",
          type: "success"
        });
        break;
      case evaluationTypes.incorrect:
        onGradeUpdate({
          message: "Grades Result",
          description: "The student solution is incorrect",
          type: "error"
        });
        break;
      case evaluationTypes.invalid:
        onGradeUpdate({
          message: "Grades Result",
          description: "The student solution is invalid",
          type: "warning"
        });
        break;

      default:
        break;
    }
  };

  return (
    <>
      <TextField
        label="Convert value"
        helperText={<HelperText>Value from to convert.</HelperText>}
        trailingIcon={
          <MaterialIcon role="button" icon="format_list_numbered" />
        }
      >
        <Input
          value={fromInputValue}
          onChange={e => {
            setFromInputValue(e.currentTarget.value);
            updateFieldStatus(0, e.currentTarget.value);
          }}
          type="number"
          id="inputValue"
        />
      </TextField>

      <Select
        label="Input Unit Measure"
        value={inputUnitValue}
        onChange={evt => {
          setInputUnitValue(evt.target.value);
          updateFieldStatus(1, evt.target.value);
        }}
        id="inputUnit"
      >
        {generateUnitsOptions()}
      </Select>

      <br />

      <Select
        label="Target Unit Measure"
        value={targetUnitValue}
        onChange={evt => {
          setTargetUnitValue(evt.target.value);
          updateFieldStatus(2, evt.target.value);
        }}
        id="targetUnit"
      >
        {generateUnitsOptions()}
      </Select>

      <br />

      <TextField
        label="Student Response"
        helperText={<HelperText>Student conversion answer.</HelperText>}
        trailingIcon={
          <MaterialIcon role="button" icon="format_list_numbered" />
        }
      >
        <Input
          value={studentResponseValue}
          onChange={e => {
            setStudentResponseValue(e.currentTarget.value);
            updateFieldStatus(3, e.currentTarget.value);
          }}
          type="number"
          id="targetValue"
        />
      </TextField>

      <Button
        className="mdc-button--raised mdc-button__icon reset"
        onClick={onResetClick}
      >
        Reset
      </Button>
    </>
  );
}

export default AssignmentForm;
