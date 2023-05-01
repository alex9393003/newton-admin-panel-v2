import { Patient } from '../entity/Patient';
import { FindManyOptions } from 'typeorm';
import { initDataSource } from '../database';

const AppDataSource = initDataSource();

// SaveNewPatient
export const saveNewPatient = async (
  payload: Partial<Patient>
): Promise<{ success: boolean; patient?: Patient; error?: string }> => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);

    // Check if a user with the same email already exists
    const existingPatient = await patientRepository.findOne({ where: { email: payload.email } });
    if (existingPatient) {
      throw new Error('User with this email already exists');
    }

    const newPatient = patientRepository.create(payload);
    const savedPatient = await patientRepository.save(newPatient);
    return { success: true, patient: savedPatient };
  } catch (error: any) {
    console.log(error);
    return { success: false, error: (error as Error).message };
  }
};

// UpdatePatient
export const updatePatient = async (id: number, payload: Partial<Patient>) => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    const patient = await patientRepository.findOne({ where: { id } });

    if (!patient) throw new Error('Patient not found');

    // Update the patient data
    Object.assign(patient, payload);

    // Save the updated patient data using the save() method
    await patientRepository.save(patient);

    const updatedPatient = await patientRepository.findOne({ where: { id } });
    return updatedPatient;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// DeletePatient
export const deletePatient = async (id: number) => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    const result = await patientRepository.delete(id);
    return result.affected;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GetPatient
export const getPatient = async (id: number) => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    const patient = await patientRepository.findOne({ where: { id } });
    if (!patient) throw new Error('Patient not found');
    return patient;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GetPatients
export const getPatients = async (filter: FindManyOptions<Patient>) => {
  try {
    const patientRepository = AppDataSource.getRepository(Patient);
    const patients = await patientRepository.find(filter);
    return patients;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//GetAllPatients
export const getAllPatients = async () => {
  try {
    console.log("in get all patients");
    console.log('my appdatasource entitymetadatas are ', AppDataSource.entityMetadatas);
    console.log('entities are ', AppDataSource.options.entities);
    const query = AppDataSource
      .getRepository(Patient)
      .createQueryBuilder('patient');



    const [results, count] = await query.getManyAndCount();
    console.log('results from this function are ', results);
    return results;

  } catch (error) {
    console.log(error);
    return error
  }
};


