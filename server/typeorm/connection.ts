import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Note } from "./entity/Note";
import { Patient } from "./entity/Patient";
import { Entry } from "./entity/Entry";

let AppDataSource: DataSource | null = null;

export function getAppDataSource(config: {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}): DataSource {
  // console.log('in my connection.ts file and about to check if not AppDataSource');
  if (!AppDataSource) {
    // console.log('in my connection.ts file and not appdatasource is true',);

    AppDataSource = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: true,
      logging: false,
      entities: [User, Note, Patient, Entry],
      migrations: [],
      subscribers: [],
    });
    // console.log('in my connection.ts file and new appdatasource is ', AppDataSource);

  }

  console.log('APP DATA SOURCE ENTITY METADATAS', AppDataSource.entityMetadatas)
  console.log('User is ', User);
  console.log('PATIENT IS ', Patient);
  console.log('NOTE IS ', Note);

  return AppDataSource;
}