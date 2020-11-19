import patients from '../../data/patients';

import { PatientEntry, NonSensitivePatientEntries, NewPatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntries[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: String(Math.floor(Math.random() * Math.floor(1000))) + "-f723-11e9-8f0b-362b9e155667",
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry
};