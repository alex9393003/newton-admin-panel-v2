import { Patient } from '../entity/Patient';
import { Note } from '../entity/Note';
import { FindOneOptions, FindManyOptions } from 'typeorm';
import { initDataSource } from "../initDataSource";


const AppDataSource = initDataSource();

//patient must exist for a note to be added so we don't need to add new patients here
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

export const getAllNotes = async () => {
  try {
    const query = AppDataSource
      .getRepository(Note)
      .createQueryBuilder('note');

    const [results, count] = await query.getManyAndCount();
    return results;
  } catch (error) {
    console.log(error);
    return error
  }
};

export const updateNote = async (noteId: string, payload: Partial<Note>) => {
    try {
      const notesRepository = AppDataSource.getRepository(Note);
      const result = await notesRepository.update(noteId, payload);
      if (result.affected === 0) {
        throw new Error(`Note with id ${noteId} not found`);
      }
      return await notesRepository.findOne({ where: { id: noteId } });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  export const deleteNote = async (noteId: string) => {
    try {
      const notesRepository = AppDataSource.getRepository(Note);
      const result = await notesRepository.delete(noteId);
      if (result.affected === 0) {
        throw new Error(`Note with id ${noteId} not found`);
      }
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  export const getNotesByPatientId = async (patientId: number) => {
    try {
      const notesRepository = AppDataSource.getRepository(Note);
      const notes = await notesRepository.find({ where: { patient: { id: patientId } } });
      return notes;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  export const getNoteById = async (noteId: string) => {
    try {
      const notesRepository = AppDataSource.getRepository(Note);
      const note = await notesRepository.findOne({ where: { id: noteId } });
      if (!note) {
        throw new Error(`Note with id ${noteId} not found`);
      }
      return note;
    } catch (error) {
      console.log(error);
      return error;
    }
  };