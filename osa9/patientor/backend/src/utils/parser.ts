/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { NewPatientEntry, Gender } from '../types';

const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
    };

    return newEntry;
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + String(name));
    }
    return name;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + String(date));
    }
    return date;
};

const parseGender = (gender: any): string => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + String(gender));
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + String(occupation));
    }
    return occupation;
};

const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + String(ssn));
    }
    return ssn;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export default toNewPatientEntry;