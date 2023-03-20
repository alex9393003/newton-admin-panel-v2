import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
// import { Note } from "./entity/Note"
// import { Appointment } from "./entity/Appointment"
// import { Patient } from "./entity/Patient"

// This is basically the same thing as creating the typeORM connection and exporting 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "dev_root",
    password: "",
    database: "newton",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

// AppDataSource.initialize().then(async () => {
//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)
//     console.log("Inserting a new patient into the database...")

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

//     // testing 
//     const myUsers = await getAllUsers();
//     console.log(myUsers);

// }).catch(error => console.log(error))



// import { createConnection } from 'typeorm'

// createConnection({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'your-username',
//   password: 'your-password',
//   database: 'your-database',
//   entities: [
//     // list your TypeORM entities here
//   ],
//   synchronize: true, // set to false in production
// }).then(() => {
//   console.log('Database connection established')
// }).catch((err) => {
//   console.error('Database connection error:', err)
// })