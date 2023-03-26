import { AppDataSource } from '../connection';
import { Patient } from '../entity/Patient';
import { Request, Response, NextFunction } from 'express';

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

export const saveNewPatient = async (
    req: Request,
    // res: Response,
    // next: NextFunction,
  ) => {
    try {
        console.log('HO HEY')
        console.log('req body is ', req.body);
      const payload = req.body;
      const patientRepository = AppDataSource.getRepository(Patient);
      const response = patientRepository.save(payload);
      return response;

    } catch (error) {
      console.log(error);
      return error;
    }
  };

