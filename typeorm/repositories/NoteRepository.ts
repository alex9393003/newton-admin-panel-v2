import { AppDataSource } from '../connection';
import { Patient } from '../entity/Patient';
import { Note } from '../entity/Note';
import { FindOneOptions, FindManyOptions } from 'typeorm';

// updatePatient: Updates a patient with the given id and payload.
// deletePatient: Deletes a patient with the given id.
// getPatient: Retrieves a patient with the given id.
// getPatients: Retrieves patients based on the given filter.
// addNewPatient: Adds a new patient with the given payload.

// UpdatePatient
export const updatePatient = async (id: number, payload: Partial<Patient>) => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    const patient = await patientRepository.findOne({ where: { id } });

    if (!patient) throw new Error('Patient not found');

    await patientRepository.update(id, payload);
    const updatedPatient = await patientRepository.findOne({ where: { id } });
    return updatedPatient;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// async function saveNoteWithPatient(notePayload: any, patientId: any) {
//     const patientRepository = AppDataSource.getRepository(Patient);
//     const noteRepository = AppDataSource.getRepository(Note);
  
//     // Fetch the patient from the database
//     const patient = await patientRepository.findOne(patientId);
  
//     if (!patient) {
//       throw new Error(`Patient with id ${patientId} not found`);
//     }
  
//     // Create a new Note instance and set the patient
//     const newNote = noteRepository.create(notePayload);
//     newNote.patient = patient;
  
//     // Save the new note to the database
//     await noteRepository.save(newNote);
//   }

// DeletePatient
export const deletePatient = async (id: number) => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    const result = await patientRepository.delete(id);
    return result.affected;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GetPatient
export const getPatient = async (id: number) => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    const patient = await patientRepository.findOne({ where: { id } });
    if (!patient) throw new Error('Patient not found');
    return patient;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GetPatients
export const getPatients = async (filter: FindManyOptions<Patient>) => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    const patients = await patientRepository.find(filter);
    return patients;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// // AddNewNote
// export const addNewNote = async (payload: Note) => {
//   try {
//     const notesRepository = AppDataSource.getRepository(Note);
//     const newNote = notesRepository.create(payload);
//     const savedNote = await notesRepository.save(newNote);
//     return savedNote;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };

export const addNewNote = async (payload: Note, patientId: number) => {
    try {
      const notesRepository = AppDataSource.getRepository(Note);
      const patientsRepository = AppDataSource.getRepository(Patient);
  
      // Fetch the patient from the database
      const patient = await patientsRepository.findOne({ where: { id: patientId } });
  
      if (!patient) {
        throw new Error(`Patient with id ${patientId} not found`);
      }
  
      const newNote = notesRepository.create(payload);
      newNote.patient = patient; // Associate the note with the fetched patient
      const savedNote = await notesRepository.save(newNote);
      return savedNote;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

export const getAllPatients = async () => {
  try {
    const query = AppDataSource
      .getRepository(Patient)
      .createQueryBuilder('patient');

    const [results, count] = await query.getManyAndCount();
    return results;

  } catch (error) {
    console.log(error);
    return error
  }
};

// export const saveNewNote = async (
//     payload: any
//   ) => {
//     try {
//       console.log('saving patient');
//       const patientRepository = AppDataSource.getRepository(Patient);
//       const response = patientRepository.save(payload);
//       return response;
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
//   };
