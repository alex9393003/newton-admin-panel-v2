import { Patient } from "~~/typeorm/entity/Patient";
import { saveNewPatient } from "~~/typeorm/repositories/PatientRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event)
    const response = await saveNewPatient(body);
    return response;
})