import { AppDataSource } from '../connection';
import { Entry } from '../entity/Entry';
import { Note } from '../entity/Note';
import { FindOneOptions, FindManyOptions } from 'typeorm';

// export const addEntry = async (payload: Entry, noteId: string) => {
//     try {
//         const entryRepository = AppDataSource.getRepository(Entry);
//         const noteRepository = AppDataSource.getRepository(Note);

//         // Fetch the note from the database
//         const note = await noteRepository.findOne({ where: { id: noteId } });

//         if (!note) {
//             throw new Error(`Note with id ${noteId} not found`);
//         }

//         const newEntry = entryRepository.create(payload);
//         newEntry.note = note; // Associate the entry with the fetched note
//         const savedEntry = await entryRepository.save(newEntry);
//         return savedEntry;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };

export const addEntry = async (payload: Entry, noteId: string) => {
  try {
      const entryRepository = AppDataSource.getRepository(Entry);
      const noteRepository = AppDataSource.getRepository(Note);

      // Fetch the note from the database
      const note = await noteRepository.findOne({ where: { id: noteId } });

      if (!note) {
          throw new Error(`Note with id ${noteId} not found`);
      }

      // Check if an identical entry already exists for this note
      const existingEntry = await entryRepository.findOne({
          where: {
              note: { id: noteId },
              category: payload.category,
              region: payload.region,
              spinalLevel: payload.spinalLevel,
              extremityLevel: payload.extremityLevel,
              side: payload.side,
              sublux: payload.sublux,
              muscleSpasm: payload.muscleSpasm,
              triggerPoints: payload.triggerPoints,
              tenderness: payload.tenderness,
              numbness: payload.numbness,
              edema: payload.edema,
              swelling: payload.swelling,
              reducedMotion: payload.reducedMotion,
              positioning: payload.positioning,
              coldPack: payload.coldPack,
              hotPack: payload.hotPack,
              electStim: payload.electStim,
              traction: payload.traction,
              massage: payload.massage,
              technique: payload.technique,
              manipulation: payload.manipulation,
          },
      });

      if (existingEntry) {
          throw new Error(`An identical entry already exists for this note`);
      }

      const newEntry = entryRepository.create(payload);
      newEntry.note = note; // Associate the entry with the fetched note
      const savedEntry = await entryRepository.save(newEntry);
      return savedEntry;
  } catch (error) {
      console.log(error);
      return error;
  }
};

export const deleteEntry = async (entryId: string) => {
    try {
        const entryRepository = AppDataSource.getRepository(Entry);
        const result = await entryRepository.delete(entryId);
        if (result.affected === 0) {
            throw new Error(`Entry with id ${entryId} not found`);
        }
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const updateEntry = async (entryId: string, payload: Partial<Entry>) => {
    try {
        const entryRepository = AppDataSource.getRepository(Entry);
        const result = await entryRepository.update(entryId, payload);
        if (result.affected === 0) {
            throw new Error(`Entry with id ${entryId} not found`);
        }
        return await entryRepository.findOne({ where: { id: entryId } });
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getAllEntriesByNoteId = async (noteId: string) => {
    try {
        const entryRepository = AppDataSource.getRepository(Entry);
        const entries = await entryRepository.find({ where: { note: { id: noteId } } });
        return entries;
    } catch (error) {
        console.log(error);
        return error;
    }
};