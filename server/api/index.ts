import 'reflect-metadata';
import { initDataSource } from '~/server/typeorm/initDataSource';

initDataSource()
  .then(() => {
    console.log('established a connection with the database');
    const config = useRuntimeConfig();
    console.log('DB_HOST is ', config.public.DB_HOST);
    console.log('server running on port ', config.public.PORT || 3000);
  })
  .catch((error) => console.log(error));
