import { getAppDataSource } from "./connection";


export function initDataSource() {
  console.log('inside of the initDataSource function');
  const config = useRuntimeConfig();
  console.log('inside of the initDataSource function and the config is ');
  const formattedPort = parseInt(config.public.DB_PORT);
  const dataSourceConfig = {
    host: config.public.DB_HOST,
    port: formattedPort,
    username: config.public.DB_USERNAME,
    password: config.public.DB_PASSWORD,
    database: config.public.DB_DATABASE,
  };

  console.log('inside the initDataSource function and the dataSourceConfig Im about to return  is ');

  return getAppDataSource(dataSourceConfig);
}