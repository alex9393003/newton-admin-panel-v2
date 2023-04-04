import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Note } from "./entity/Note"
import { Patient } from "./entity/Patient"
import { Entry } from "./entity/Entry"

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
        Entry,
        Patient
    ],
    migrations: [],
    subscribers: [],
})