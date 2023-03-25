import { AppDataSource } from '../connection';
import { Patient } from '../entity/Patient';

export const getAllPatients = async () => {
  try {
    const query = AppDataSource
      .getRepository(Patient)
      .createQueryBuilder('patient');

    const [results, count] = await query.getManyAndCount();
    console.log('results are ', results, ' count is', count)
    return results;

  } catch (error) {
    console.log(error);
    return error
  }
};
