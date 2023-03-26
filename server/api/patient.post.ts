import { Patient } from "~~/typeorm/entity/Patient";
import { saveNewPatient } from "~~/typeorm/repositories/PatientRepository";

export default defineEventHandler(async event => {
    console.log('HITTING')
    const body = await readBody(event)
    console.log('BODY is ', body)
    const newPatient = new Patient();
    newPatient.firstName = body.firstName;
    newPatient.lastName = body.lastName;
    const response = await saveNewPatient(body);
    console.log('response is ', response);
    return {
        api: body
    }
})