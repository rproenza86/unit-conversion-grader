import * as converter from 'units-converter';

export const unitsType = {
    temp: 'temperature',
    vol: 'volume'
};

export const evaluationTypes = {
    correct: '​Correct​',
    incorrect: '​Incorrect​',
    invalid: '​Invalid'
};

const roundToTenthsPlace = number => Math.round(10 * number) / 10;

const checkForInvalidInput = ({ unit, inputValue, conversionValue }) => {
    let areValid = evaluationTypes.correct;

    if (unit !== unitsType.temp && unit !== unitsType.vol) {
        areValid = evaluationTypes.invalid;
    }

    const isNaN = number => Number.isNaN(parseFloat(number));
    if (isNaN(inputValue) || isNaN(conversionValue)) {
        areValid = evaluationTypes.invalid;
    }

    return areValid;
};

export default function conversionEvaluator({
    unit,
    inputValue,
    inputValueUnit,
    conversionValueUnit,
    conversionValue
}) {
    let evaluation = checkForInvalidInput({ unit, inputValue, conversionValue });

    if (evaluation === evaluationTypes.invalid) {
        return evaluation;
    }

    try {
        const conversionResult = converter[unit](inputValue)
            .from(inputValueUnit)
            .to(conversionValueUnit).value;

        if (roundToTenthsPlace(conversionValue) !== roundToTenthsPlace(conversionResult)) {
            evaluation = evaluationTypes.incorrect;
        }
    } catch (error) {
        evaluation = evaluationTypes.invalid;
    }

    return evaluation;
}
