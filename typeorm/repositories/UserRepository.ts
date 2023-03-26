import { AppDataSource } from '../connection';
import { User } from '../entity/User';

export const getAllUsers = async () => {
  try {
    const query = AppDataSource
      .getRepository(User)
      .createQueryBuilder('user');

    const [results, count] = await query.getManyAndCount();
    console.log('results are ', results, ' count is', count)
    return results;

  } catch (error) {
    console.log(error);
    return error;
  }
};
