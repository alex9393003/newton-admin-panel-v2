import { getAppDataSource } from "./connection";


export async function initDataSource() {
  const config = useRuntimeConfig();
  const formattedPort = parseInt(config.public.DB_PORT);
  const dataSourceConfig = {
    host: config.public.DB_HOST,
    port: formattedPort,
    username: config.public.DB_USERNAME,
    password: config.public.DB_PASSWORD,
    database: config.public.DB_DATABASE,
    // entities: [
    //   // "dist/server/**/*.entity{.ts,.js}",
    //   `server/typeorm/entity/**/*{.ts,.js}`
    // ]
  };


  return getAppDataSource(dataSourceConfig);
}