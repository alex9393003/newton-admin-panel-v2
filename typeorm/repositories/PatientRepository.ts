// import { AppDataSource } from '../connection';
// import { Patient } from '../entity/Patient';

// export const getAllPatients = async () => {
//   try {
//     const query = AppDataSource
//       .getRepository(Patient)
//       .createQueryBuilder('patient');

//     const [results, count] = await query.getManyAndCount();
//     return results;

//   } catch (error) {
//     console.log(error);
//     return error
//   }
// };

// export const saveNewPatient = async (
//     payload: any
//   ) => {
//     try {
//       const patientRepository = AppDataSource.getRepository(Patient);
//       const response = patientRepository.save(payload);
//       return response;
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
//   };


import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Patient } from '../entity/Patient';

export class PatientRepository {
  static async saveNewPatient(req: Request, res: Response): Promise<Response> {
    try {
      const patientData = req.body;
      const patientRepository = getRepository(Patient);

      // Check if a patient with the provided email already exists
      const existingPatient = await patientRepository.findOne({ where: { email: patientData.email } });

      let patient: Patient;

      if (existingPatient) {
        // Update the existing patient record
        patient = patientRepository.merge(existingPatient, patientData);
      } else {
        // Create a new patient record
        patient = patientRepository.create(patientData);
      }

      // Save the patient record (either the new or the updated one)
      const savedPatient = await patientRepository.save(patient);

      return res.status(201).json(savedPatient);
    } catch (error) {
      console.error('Error while saving the patient:', error);
      return res.status(500).json({ message: 'Error while saving the patient' });
    }
  }
}