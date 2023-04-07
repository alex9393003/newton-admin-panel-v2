import { saveNewPatient } from "~~/typeorm/repositories/PatientRepository";
import { addNewNote } from "~/typeorm/repositories/NoteRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await addNewNote(body);
    return response;
})