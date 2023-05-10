import { Patient } from '../entity/Patient';
import { Complaint } from '../entity/Complaint';
import { initDataSource } from '../database';

const AppDataSource = initDataSource();

export const addNewComplaint = async (payload: Complaint, patientId: number) => {
  try {
    console.log('payload is ', payload);
    console.log('patientId is ', patientId);
    const complaintsRepository = AppDataSource.getRepository(Complaint);
    const patientsRepository = AppDataSource.getRepository(Patient);

    // Fetch the patient from the database
    const patient = await patientsRepository.findOne({ where: { id: patientId } });

    if (!patient) {
      throw new Error(`Patient with id ${patientId} not found`);
    }

    const newComplaint = complaintsRepository.create(payload);
    newComplaint.patient = patient; // Associate the complaint with the fetched patient
    console.log('NEW COMPLAINT IS, ', newComplaint);
    const savedComplaint = await complaintsRepository.save(newComplaint);
    console.log('savedComplaint is ', savedComplaint);
    return savedComplaint;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllComplaints = async () => {
  try {
    const query = AppDataSource
      .getRepository(Complaint)
      .createQueryBuilder('complaint')
      .leftJoinAndSelect('complaint.patient', 'patient'); // Include the related Patient entity

    const results = await query.getMany();
    console.log('results from complaintRepo is ', results);
    return results;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateComplaint = async (complaintId: string, payload: Partial<Complaint>) => {
  try {
    const complaintsRepository = AppDataSource.getRepository(Complaint);
    const result = await complaintsRepository.update(complaintId, payload);
    if (result.affected === 0) {
      throw new Error(`Complaint with id ${complaintId} not found`);
    }
    return await complaintsRepository.findOne({ where: { id: complaintId } });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteComplaint = async (complaintId: string) => {
  try {
    const complaintsRepository = AppDataSource.getRepository(Complaint);
    const result = await complaintsRepository.delete(complaintId);
    if (result.affected === 0) {
      throw new Error(`Complaint with id ${complaintId} not found`);
    }
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getComplaintsByPatientId = async (patientId: number) => {
  try {
    const complaintsRepository = AppDataSource.getRepository(Complaint);
    const complaints = await complaintsRepository.find({ where: { patient: { id: patientId } } });
    return complaints;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getComplaintById = async (complaintId: string) => {
    try {
      const complaintsRepository = AppDataSource.getRepository(Complaint);
      const complaint = await complaintsRepository.findOne({
        where: { id: complaintId },
        relations: ['patient'], // Include the related Patient entity
      });
      if (!complaint) {
        throw new Error(`Complaint with id ${complaintId} not found`);
      }
      return complaint;
    } catch (error) {
      console.log(error);
      return error;
    }
  };