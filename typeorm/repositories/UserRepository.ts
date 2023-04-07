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

// SaveNewUser
export const saveNewUser = async (
  payload: Partial<User>
): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    const userRepository = AppDataSource.getRepository(User);

    // Check if a user with the same email already exists
    const existingUser = await userRepository.findOne({ where: { email: payload.email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser = userRepository.create(payload);
    const savedUser = await userRepository.save(newUser);
    return { success: true, user: savedUser };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: (error as Error).message };
  }
};

// UpdateUser
export const updateUser = async (id: number, payload: Partial<User>) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) throw new Error('User not found');

    await userRepository.update(id, payload);
    const updatedUser = await userRepository.findOne({ where: { id } });
    return updatedUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// DeleteUser
export const deleteUser = async (id: number) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const result = await userRepository.delete(id);
    return result.affected;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GetUser
export const getUser = async (id: number) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};
