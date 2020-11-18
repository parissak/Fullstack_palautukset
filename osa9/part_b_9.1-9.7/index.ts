import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    try {
        const bmi = calculateBmi(height, weight);
        res.json({ weight: weight, height: height, bmi: bmi });
    } catch {
        res.json({ error: "malformatted parameters" });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const daily_exercises = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const target = req.body.target; 
 
    if (!target || !daily_exercises) {
        return (
            res.json({ error: "parameters missing" }));
    }

    if (!Array.isArray(daily_exercises) || isNaN(target) || daily_exercises.some(isNaN)) {
        return (
            res.json({ error: "malformatted parameters" }));
    }

    const obj = calculateExercises(daily_exercises, target);
    return (
        res.json(obj));
});

const port = 3003;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});