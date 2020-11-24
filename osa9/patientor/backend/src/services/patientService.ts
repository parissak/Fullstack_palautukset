import patients from '../../data/patients';

import { Patient, NonSensitivePatientEntries, NewPatientEntry, Entry } from '../types';

const getEntries = (): Patient[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntries[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addEntry = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: String(Math.floor(Math.random() * Math.floor(1000))) + "-f723-11e9-8f0b-362b9e155667",
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntryToPatient = (entry: Entry, patient: Patient): Patient => {
    patient.entries.push(entry);
    return patient;
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addEntry,
    addEntryToPatient
};