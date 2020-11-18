interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface exerciseValues {
    target: number,
    arr: Array<number>
}

export const calculateExercises = (arr: Array<number>, targetValue: number): Result => {
    const periodLength = arr.length;
    const trainingDays = arr.filter(d => d !== 0).length;
    const average = arr.reduce(function (prev, cur) { return prev + cur; }, 0) / periodLength;
    const success = average >= targetValue ? true : false;
    const target = targetValue;

    const rate = average / target * 100;
    let rating;
    let description;

    if (rate >= 100) {
        rating = 3;
        description = 'very good';
    } else if (rate >= 70) {
        rating = 2;
        description = 'not bad';
    } else if (rate < 70) {
        rating = 1;
        description = 'theres room for improvement';
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating || 0,
        ratingDescription: description || "no description",
        target: target,
        average: average
    };
};

const parseExerciseArguments = (args: Array<string>): exerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments were given');

    const slicedArr = args.map(Number).slice(3);
    if (!isNaN(Number(args[2])) && !slicedArr.some(isNaN)) {
        return {
            target: Number(args[2]),
            arr: args.map(Number).slice(3)
        };
    } else {
        throw new Error('Provided values were not numbers');
    }
};

try {
    const { target, arr } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(arr, target));
} catch (e) {
    console.log('Something went wrong, error message: invalid parameters');
}