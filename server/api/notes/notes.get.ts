import { getAllNotes } from "~/server/typeorm/repositories/NoteRepository";

export default defineEventHandler(async event => {
    const res = await getAllNotes();
    return {
        data: res
    }
})