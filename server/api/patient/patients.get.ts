import { getAllPatients } from "~~/typeorm/repositories/PatientRepository";

export default defineEventHandler(async event => {
    const res = await getAllPatients();
    return {
        data: res
    }
})