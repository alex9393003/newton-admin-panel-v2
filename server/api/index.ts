import 'reflect-metadata';
// import { getAllUsers } from '~~/typeorm/repositories/UserRepository';
import { AppDataSource } from '~~/typeorm/connection';
import { addNewNote, updateNote } from '~/typeorm/repositories/NoteRepository';
import { Note } from '~/typeorm/entity/Note';
// import { User } from '~~/typeorm/entity/User';

AppDataSource.initialize().then(async () => {
    console.log('SERVER IS RUNNING WITH TYPEORM');
    const notePayload: any = {
        visitDate: new Date(),
        visitTime: new Date(),
        heightFeet: 5,
        heightInches: 10,
        temperature: 13,
        respiration: 16,
        systolic: 120,
        diastolic: 80,
        physiotherapy: 1,
        roomAssignment: 101,
        physio: 1,
        tx: 1,
        otherNotes: "Some other notes",
      };
      
      const patientId = 2; // Replace this with the actual patient ID
      
      const res : any = await addNewNote(notePayload, patientId);
      console.log('response is ', res);
      const res2 = await updateNote(res.id, { otherNotes: 'Some other notes 2' });
      console.log('response 2 is ', res2);

}).catch(error => console.log(error))
