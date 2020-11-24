
import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils/patientParser';
import toNewEntry from '../utils/entryParser';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
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

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
router.post('/:id/entries', (req, res) => {
    const patient = patientService.findById(req.params.id);
    if (!patient) {
        res.sendStatus(404).end();
    }

    if (patient) {
        try {
            const entryWithId = {
                id: String(Math.floor(Math.random() * Math.floor(1000))),
                ...req.body
            };
            const parsedEntry = toNewEntry(entryWithId);
            const updatedPatient = patientService.addEntryToPatient(parsedEntry, patient);
            res.json(updatedPatient);
        } catch (e) {
            console.log(e);
            res.sendStatus(400);
        }
    }
});

export default router;