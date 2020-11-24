/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import diagnoses from '../../data/diagnoses';
import { HealthCheckRating, EntryTypes, Entry } from '../types';

const toNewEntry = (object: any): any => {
    const newEntry = parseEntry(object);
    return newEntry;
};

const parseEntry = (entry: any): Entry => {
    if (!entry.type || !isEntry(entry.type)) {
        throw new Error(`Incorrect or missing type of entry ${String(entry.type)}`);
    }

    const obj = {
        id: entry.id, date:
        parseDate(entry.date), specialist:
        parseString(entry.specialist),
        description: parseString(entry.description),
        diagnosisCodes: parseCodes(entry.diagnosisCodes)
    };

    switch (entry.type) {
        case "HealthCheck":
            return {
                ...obj,
                type: entry.type,
                healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
            };

        case "Hospital":
            return {
                ...obj,
                type: entry.type,
                discharge: parseDischarge(entry.discharge)
            };
        case "OccupationalHealthcare":
            return {
                ...obj,
                type: entry.type,
                sickLeave: parseSickLeave(entry.sickLeave),
                employerName: parseString(entry.employerName)
            };
        default:
            return entry;
    }
};

const parseDischarge = (discharge: { date: string, criteria: string }) => {
    if (!discharge) {
        throw new Error(`Incorrect or missing discharge ${String(discharge)}`);
    }
    parseDate(discharge.date);
    parseString(discharge.criteria);
    return discharge;
};

const parseSickLeave = (sickLeave: { startDate: string, endDate: string } | undefined) => {
    if (!sickLeave) {
        return undefined;
    }

    parseDate(sickLeave.startDate);
    parseDate(sickLeave.endDate);
    return sickLeave;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!rating || !isRatingEntry(rating)) {
        throw new Error(`Incorrect or missing health rating ${String(rating)}`);
    }
    return rating;
};

const parseCodes = (codes: any): Array<string> => {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
    codes.map((c: string) => {
        if (!(typeof c === 'string')) {
            throw new Error(`Incorrect type of diagnosis code: ${typeof c}`);
        }
        if (!diagnoses.find(d => d.code === c)) {
            throw new Error(`Incorrect diagnosis code ${String(c)}`);
        }
    });
    return codes;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + String(date));
    }
    return date;
};

const parseString = (stringObj: any): string => {
    if (!stringObj || !isString(stringObj)) {
        throw new Error(`Incorrect or missing field input ${String(stringObj)}`);
    }
    return stringObj;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isEntry = (type: any): type is EntryTypes => {
    return Object.values(EntryTypes).includes(type);
};

const isRatingEntry = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export default toNewEntry;