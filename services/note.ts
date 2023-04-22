import { AxiosInstance } from "axios";

// TODO: give payload typings 
export const createNoteService = (api : AxiosInstance) => ({
    getNotes: async () => {
        const { data } = await api.get('/notes/notes');
        return data.data;
    },

    getNotesForPatient: async (payload : any) => {
        const { data } = await api.post('/notes/patient-notes', payload);
        return data.data;
    },

    getNote: async (payload : any) => {
        const { data } = await api.get('/notes/note', payload);
        return data.data;
    },

    addNote: async (payload : any) => {
        const { data } = await api.post('/notes/note', payload);
        return data.data;
    },

    updateNote: async (payload : any) => {
        const { data } = await api.post('/notes/update-note', payload);
        return data.data;
    },

    deleteNote: async (payload : any) => {
        const { data } = await api.post('/notes/delete-note', payload);
        return data.data;
    },
});


