import 'reflect-metadata';
// import { getAllUsers } from '~~/typeorm/repositories/UserRepository';
import { AppDataSource } from '~~/typeorm/connection';
// import { User } from '~~/typeorm/entity/User';

AppDataSource.initialize().then(async () => {
    console.log('SERVER IS RUNNING WITH TYPEORM');
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
