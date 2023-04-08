import api from '@/services/api';

export const getNotes = async () => {
    const { data } = await api.get('/notes/notes');
    return data.data;
};

export const getNotesForPatient = async (payload) => {
    const { data } = await api.get('/notes/patient-notes', payload);
    return data.data;
};

export const getNote = async (payload) => {
    const { data } = await api.get('/notes/note', payload);
    return data.data;
};

export const addNote = async (payload) => {
    const { data } = await api.post('/notes/note', payload);
    return data.data;
};

export const updateNote = async (payload) => {
    const { data } = await api.post('/notes/update-note', payload);
    return data.data;
};

export const deleteNote = async (payload) => {
    const { data } = await api.post('/notes/delete-note', payload);
    return data.data;
};



