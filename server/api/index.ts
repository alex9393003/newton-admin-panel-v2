import 'reflect-metadata';
// import { getAllUsers } from '~~/typeorm/repositories/UserRepository';
import { AppDataSource } from '~~/typeorm/connection';
import { addNewNote } from '~/typeorm/repositories/NoteRepository';
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
      
      await addNewNote(notePayload, patientId);
    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)
    // console.log("Inserting a new patient into the database...")

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

    // console.log("Here you can setup and run express / fastify / any other framework.")

    // testing 
    // const myUsers = await getAllUsers();
    // console.log(myUsers);

}).catch(error => console.log(error))
