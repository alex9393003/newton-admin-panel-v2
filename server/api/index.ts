import 'reflect-metadata';
import { initDataSource } from '~/server/typeorm/initDataSource';

const AppDataSource = initDataSource()
console.log('in my server/api index.ts file and the AppDataSource is ');

AppDataSource.initialize().then(async () => {
    console.log('in my server/api index.ts file and AFTER INITIALIZED the AppDataSource is ');
    console.log('established a connection with the database');
    const config = useRuntimeConfig()
    console.log('DB_HOST is ', config.public.DB_HOST);
    console.log('server running on port ', config.public.PORT || 3000);

    
    // const notePayload: any = {
    //     visitDate: new Date(),
    //     visitTime: new Date(),
    //     heightFeet: 5,
    //     heightInches: 10,
    //     temperature: 13,
    //     respiration: 16,
    //     systolic: 120,
    //     diastolic: 80,
    //     physiotherapy: 1,
    //     roomAssignment: 101,
    //     physio: 1,
    //     tx: 1,
    //     otherNotes: "Some other notes",
    //   };
      
      // const patientId = 3; // Replace this with the actual patient ID
      
      // const res : any = await addNewNote(notePayload, patientId);
    //   console.log('response is ', res);
    // //   const res2 : any = await updateNote(res.id, { otherNotes: 'Some other notes 2' });
    // //   console.log('response 2 is ', res2);
    //     // const res3 = await deleteNote(res2.id);
    //     // console.log('response 3 is ', res3);
    // const notesForPatient = await getNotesByPatientId(3);
    // const newEntryData: any = {
    //     category: 'spinal',
    //     region: 'upper-cerv',
    //     side: 'l',
    //     sublux: true,
    //     muscleSpasm: true,
    //     triggerPoints: true,
    //     tenderness: false,
    //     numbness: true,
    //     edema: true,
    //     swelling: true,
    //     reducedMotion: true,
    //     positioning: 'some positioning',
    //     coldPack: false,
    //     hotPack: true,
    //     electStim: true,
    //     traction: true,
    //     massage: true,
    //     technique: 'some technique',
    //     manipulation: true
    //   };

}).catch(error => console.log(error))
