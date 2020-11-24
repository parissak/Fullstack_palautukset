import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnosis } from "../types";
import { useStateValue, setPatient, setDiagnoses, addEntry } from "../state";
import { Container, List, ListItem, Segment, Button } from "semantic-ui-react";
import GenIcon from "./GenIcon";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";


const PatientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient, diagnoses }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: updatePatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            dispatch(addEntry(updatePatient));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setPatient(patient));
            } catch (e) {
                console.error(e);
            }
        };
        fetchPatient();
    }, [dispatch, id]);

    React.useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                dispatch(setDiagnoses(diagnosesFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        fetchDiagnoses();
    }, [dispatch]);

    if (!patient) {
        return <p>patient not found</p>;
    }

    return (
        <div>
            <PatientInfo patient={patient} />
            <Entries patient={patient} diagnoses={diagnoses} />
            <br></br>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div >
    );
};

const PatientInfo: React.FC<{ patient: Patient }> = ({ patient }) => {
    return (
        <Container textAlign="left">
            <h2>{patient.name} <span> <GenIcon genderIcon={patient.gender} /> </span> </h2>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
        </Container>
    );
};

const Entries: React.FC<{ patient: Patient; diagnoses: Diagnosis[] | undefined }> = ({ patient, diagnoses }) => {
    return (
        <List>
            <h3>entries</h3>
            {patient.entries.map((entry: Entry) => (
                <ListItem key={entry.id}>
                    <EntryDetails entry={entry} diagnoses={diagnoses} />
                </ListItem>
            ))}
        </List>
    );
};

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] | undefined }> = ({ entry, diagnoses }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
        default:
            return assertNever(entry);
    }
};

const HealthCheckEntry: React.FC<{ entry: Entry; diagnoses: Diagnosis[] | undefined }> = ({ entry, diagnoses }) => {
    return (
        <EntryCard entry={entry} diagnoses={diagnoses} icon='doctor' />
    );
};

const HospitalEntry: React.FC<{ entry: Entry; diagnoses: Diagnosis[] | undefined }> = ({ entry, diagnoses }) => {
    return (
        <EntryCard entry={entry} diagnoses={diagnoses} icon='hospital' />
    );
};

const OccupationalHealthcareEntry: React.FC<{ entry: Entry; diagnoses: Diagnosis[] | undefined }> = ({ entry, diagnoses }) => {
    return (
        <EntryCard entry={entry} diagnoses={diagnoses} icon='stethoscope' />
    );
};


const EntryCard: React.FC<{ entry: Entry; diagnoses: Diagnosis[] | undefined; icon: string }> = ({ entry, diagnoses, icon }) => {
    let sickLeave;

    if (entry.type === "OccupationalHealthcare" && entry.sickLeave) {
        sickLeave = `Sickleave: ${entry.sickLeave.startDate} - ${entry.sickLeave.startDate}`;
    }

    return (
        <Segment>
            <h3>
                <span> {entry.date} </span>
                <span> {entry.type === "OccupationalHealthcare" && entry.employerName} </span>
                <span> {<GenIcon entryIcon={icon} />} </span>
            </h3>
            <div> {entry.description} </div>
            <div> {sickLeave} </div>
            <div> {entry.type === "Hospital" && `Discharge for ${entry.discharge.date}: ${entry.discharge.criteria}`} </div>
            <div> {entry.type === "HealthCheck" && <GenIcon healthRating={entry.healthCheckRating} />} </div>
            <List bulleted>
                {entry.diagnosisCodes?.map((code: string) => (
                    <ListItem key={code}>
                        {/* code */}
                        <span> {code} </span>
                        {/* equivalent description */}
                        <span>{diagnoses?.find(d => d.code === code)?.name} </span>
                    </ListItem>
                ))}
            </List>
        </Segment>
    );
};

export default PatientPage;