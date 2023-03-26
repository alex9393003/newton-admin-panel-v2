import { AppDataSource } from '../connection';
import { Patient } from '../entity/Patient';

export const getAllPatients = async () => {
  try {
    const query = AppDataSource
      .getRepository(Patient)
      .createQueryBuilder('patient');

    const [results, count] = await query.getManyAndCount();
    return results;

  } catch (error) {
    console.log(error);
    return error
  }
};

export const saveNewPatient = async (
    payload: any
  ) => {
    try {
      const patientRepository = AppDataSource.getRepository(Patient);
      const response = patientRepository.save(payload);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

