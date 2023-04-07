import { addEntry } from "~/typeorm/repositories/EntryRepository";

export default defineEventHandler(async event => {
    const body = await readBody(event);
    const response = await addEntry(body, '0225c13f-e775-417d-9492-9810bc1998d6'); // TODO: using example as a test for now, but will need to parse the payload for the note ID
    return response;
})