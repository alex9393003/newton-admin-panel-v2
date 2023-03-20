import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Note } from "./entity/Note"
import { Appointment } from "./entity/Appointment"
import { Patient } from "./entity/Patient"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "dev_root",
    password: "",
    database: "newton",
    synchronize: true,
    logging: false,
    entities: [
        User,
        Note,
        Appointment,
        Patient
    ],
    migrations: [],
    subscribers: [],
})