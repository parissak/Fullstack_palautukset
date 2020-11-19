
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/parser';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addEntry(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        res.sendStatus(400);
    }
});

export default router;