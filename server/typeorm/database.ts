import "reflect-metadata";
import { DataSource } from "typeorm";
import { Patient } from '~/server/typeorm/entity/Patient';
import { User } from '~/server/typeorm/entity/User';
import { Note } from '~/server/typeorm/entity/Note';
import { Entry } from '~/server/typeorm/entity/Entry';


let AppDataSource: DataSource | null = null;

export function initDataSource() {
  const config = useRuntimeConfig();
  const formattedPort = parseInt(config.public.DB_PORT);
  const dataSourceConfig = {
    host: config.public.DB_HOST,
    port: formattedPort,
    username: config.public.DB_USERNAME,
    password: config.public.DB_PASSWORD,
    database: config.public.DB_DATABASE,
  };


  return getAppDataSource(dataSourceConfig);
}

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
      // entities: [entitiesPath],
      entities: [Patient, User, Note, Entry],
      migrations: [],
      subscribers: [],
    });
  }
  
  console.log('options are ', AppDataSource.options);

  return AppDataSource;
}