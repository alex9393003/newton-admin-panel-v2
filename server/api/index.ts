import 'reflect-metadata';
import { initDataSource } from '~/server/typeorm/database';

const AppDataSource = initDataSource()
console.log('in my server/api index.ts file and the AppDataSource is ');

AppDataSource.initialize().then(async () => {
    console.log('in my server/api index.ts file and AFTER INITIALIZED the AppDataSource is ');
    console.log('established a connection with the database');
    const config = useRuntimeConfig()
    console.log('DB_HOST is ', config.public.DB_HOST);
    console.log('server running on port ', config.public.PORT || 3000);

}).catch(error => console.log(error))
