import { getAllPatients } from "~/server/typeorm/repositories/PatientRepository";

export default defineEventHandler(async event => {
    // console.log('in patient patients.get.ts file')
    const res = await getAllPatients();
    // console.log('response is ', res)
    return {
        data: res
    }
})