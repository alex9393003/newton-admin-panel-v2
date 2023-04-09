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
  if (!AppDataSource) {
    AppDataSource = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: true,
      logging: false,
      entities: [User, Note, Entry, Patient],
      migrations: [],
      subscribers: [],
    });
  }

  return AppDataSource;
}