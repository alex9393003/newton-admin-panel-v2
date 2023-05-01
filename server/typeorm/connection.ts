import "reflect-metadata";
import { DataSource } from "typeorm";
// import { User } from "./entity/User";
// import { Note } from "./entity/Note";
// import { Patient } from "./entity/Patient";
// import { Entry } from "./entity/Entry";
import { Patient } from '~/server/typeorm/entity/Patient';
import { User } from '~/server/typeorm/entity/User';
import { Note } from '~/server/typeorm/entity/Note';
import { Entry } from '~/server/typeorm/entity/Entry';
import { fileURLToPath } from 'url';
import path from 'path';

let AppDataSource: DataSource | null = null;

export function getAppDataSource(config: {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}): DataSource {
  if (!AppDataSource) {
    // const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // const config = useRuntimeConfig();
    // const isProduction = config.public.NODE_ENV === "production";
    // const fileExtension = isProduction ? "*.js" : "*.ts";
    // const entitiesPath = path.join(__dirname, 'typeorm', 'entity', fileExtension);
    

    AppDataSource = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: true,
      logging: false,
      // entities: [entitiesPath],
      entities: [Patient, User, Note, Entry],
      migrations: [],
      subscribers: [],
    });
  }
  
  console.log('in connection.ts file and the AppDataSource is ', AppDataSource);
  console.log('options are ', AppDataSource.options);
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  console.log('dirname for connection.ts file ', __dirname);
  console.log('from connection.ts Patient entity looks like ', Patient);

  return AppDataSource;
}