import React, { useState } from 'react';
import TextField, { HelperText, Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Select, { Option } from '@material/react-select';
import Button from '@material/react-button';

// styles
import '@material/react-text-field/dist/text-field.css';
import '@material/react-menu-surface/dist/menu-surface.css';
import '@material/react-list/dist/list.css';
import '@material/react-icon-button/dist/icon-button.css';
import '@material/react-button/dist/button.css';
import '@material/react-menu-surface/dist/menu-surface.css';
import '@material/react-menu/dist/menu.css';
import '@material/react-select/dist/select.css';
import './AssignmentForm.css';

function AssignmentForm({ units }) {
    const [fromInputValue, setFromInputValue] = useState();
    const [studentResponseValue, setStudentResponseValue] = useState();

    const defaultSelectValue = units[0].value;
    const [inputUnitValue, setInputUnitValue] = useState(defaultSelectValue);
    const [targetUnitValue, setTargetUnitValue] = useState(defaultSelectValue);

    const generateUnitsOptions = () =>
        units.map(unit => (
            <Option key={unit.value} value={unit.value}>
                {unit.label}
            </Option>
        ));

    const onResetClick = () => {
        setFromInputValue();
        setStudentResponseValue();
        setInputUnitValue(defaultSelectValue);
        setTargetUnitValue(defaultSelectValue);
    };

    return (
        <>
            <TextField
                label="Convert value"
                helperText={<HelperText>Value from to convert.</HelperText>}
                trailingIcon={<MaterialIcon role="button" icon="format_list_numbered" />}
            >
                <Input
                    value={fromInputValue}
                    onChange={e => setFromInputValue(e.currentTarget.value)}
                    type="number"
                />
            </TextField>

            <Select
                label="Input Unit Measure"
                value={inputUnitValue}
                onChange={evt => setInputUnitValue(evt.target.value)}
            >
                {generateUnitsOptions()}
            </Select>

            <br />

            <Select
                label="Target Unit Measure"
                value={targetUnitValue}
                onChange={evt => setTargetUnitValue(evt.target.value)}
            >
                {generateUnitsOptions()}
            </Select>

            <br />

            <TextField
                label="Student Response"
                helperText={<HelperText>Student conversion answer.</HelperText>}
                trailingIcon={<MaterialIcon role="button" icon="format_list_numbered" />}
            >
                <Input
                    value={studentResponseValue}
                    onChange={e => setStudentResponseValue(e.currentTarget.value)}
                    type="number"
                />
            </TextField>

            <Button className="mdc-button--raised mdc-button__icon" onClick={onResetClick}>
                Reset
            </Button>
        </>
    );
}

export default AssignmentForm;
