import conversionEvaluator, { unitsType, evaluationTypes } from '../conversionEvaluator';

describe('conversionEvaluator function', () => {
    const generateConfig = (
        unit,
        inputValue,
        inputValueUnit,
        conversionValueUnit,
        conversionValue
    ) => ({
        unit,
        inputValue,
        inputValueUnit,
        conversionValueUnit,
        conversionValue
    });

    describe('evaluating temperature conversions', () => {
        it('should evaluate as Correct when the students answers match the conversion evaluation', () => {
            const response = conversionEvaluator(
                generateConfig(unitsType.temp, 84.2, 'F', 'R', 543.94)
            );
            expect(response).toBe(evaluationTypes.correct);
        });

        it('should evaluate as Incorrect on wrong students answers', () => {
            const response = conversionEvaluator(
                generateConfig(unitsType.temp, 317.33, 'K', 'F', 111.554)
            );
            expect(response).toBe(evaluationTypes.incorrect);
        });

        it('should evaluate as Invalid on non numbers inputs', () => {
            const response = conversionEvaluator(
                generateConfig(unitsType.temp, 'dog', 'K', 'F', 111.554)
            );
            expect(response).toBe(evaluationTypes.invalid);
        });

        it('should evaluate as Invalid on different types of unit inputs', () => {
            const response = conversionEvaluator(
                generateConfig(unitsType.temp, 73.12, 'gal', 'K', 19.4)
            );
            expect(response).toBe(evaluationTypes.invalid);
        });
    });

    describe('evaluating volume conversions', () => {
        it('should evaluate as Correct when the students answers match the conversion evaluation', () => {
            const response = conversionEvaluator(
                generateConfig(unitsType.vol, 25.6, 'cup', 'l', 6.1)
            );
            expect(response).toBe(evaluationTypes.correct);
        });

        it('should evaluate as Incorrect on wrong students answers', () => {
            const response = conversionEvaluator(
                generateConfig(unitsType.vol, 25.6, 'cup', 'l', 16.1)
            );
            expect(response).toBe(evaluationTypes.incorrect);
        });

        it('should evaluate as Invalid on non numbers inputs', () => {
            const response = conversionEvaluator(
                generateConfig(unitsType.vol, 25.6, 'cup', 'l', 'dog')
            );
            expect(response).toBe(evaluationTypes.invalid);
        });

        it('should evaluate as Invalid on different types of unit inputs', () => {
            const response = conversionEvaluator(
                generateConfig(unitsType.vol, 73.12, 'gal', 'K', 19.4)
            );
            expect(response).toBe(evaluationTypes.invalid);
        });

        it('should evaluate as Invalid on missing unit of measure', () => {
            const response = conversionEvaluator(
                generateConfig(undefined, 73.12, 'gal', 'K', 19.4)
            );
            expect(response).toBe(evaluationTypes.invalid);
        });
    });
});
