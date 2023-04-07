import { getAllNotes } from "~/typeorm/repositories/NoteRepository";

export default defineEventHandler(async event => {
    const res = await getAllNotes();
    return {
        data: res
    }
})