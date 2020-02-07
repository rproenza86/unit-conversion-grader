import * as converter from "units-converter";

import { Volumes, Temperatures } from "../constants/unitsMeasures";

export const unitsType = {
  temp: "temperature",
  vol: "volume",
  any: "any"
};

export const evaluationTypes = {
  correct: "​Correct​",
  incorrect: "​Incorrect​",
  invalid: "​Invalid"
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

    if (
      roundToTenthsPlace(conversionValue) !==
      roundToTenthsPlace(conversionResult)
    ) {
      evaluation = evaluationTypes.incorrect;
    }
  } catch (error) {
    evaluation = evaluationTypes.invalid;
  }

  return evaluation;
}

function areRefSameUnit(refInputType, refOutputType, unitsObject) {
  let wasRef1Found = false;
  let wasRef2Found = false;
  let areRefsSameUnit = false;

  for (const unit of unitsObject) {
    if (!wasRef1Found) {
      wasRef1Found = unit.value === refInputType;
    }
    if (!wasRef2Found) {
      wasRef2Found = unit.value === refOutputType;
    }
    if (wasRef1Found && wasRef2Found) {
      break;
    }
  }

  if (wasRef1Found && wasRef2Found) {
    areRefsSameUnit = true;
  }

  return areRefsSameUnit;
}

function getUnitMeasureByReference(refInputType, refOutputType) {
  if (areRefSameUnit(refInputType, refOutputType, Temperatures)) {
    return unitsType.temp;
  }

  if (areRefSameUnit(refInputType, refOutputType, Volumes)) {
    return unitsType.vol;
  }

  return null;
}

export function conversionToAnyEvaluator({
  inputValue,
  inputValueUnit,
  conversionValueUnit,
  conversionValue
}) {
  let evaluation = evaluationTypes.invalid;
  const unit = getUnitMeasureByReference(inputValueUnit, conversionValueUnit);

  if (unit !== null) {
    evaluation = conversionEvaluator({
      unit,
      inputValue,
      inputValueUnit,
      conversionValueUnit,
      conversionValue
    });
  }

  return evaluation;
}
