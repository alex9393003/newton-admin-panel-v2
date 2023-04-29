import { getAppDataSource } from "./connection";


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