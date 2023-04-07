import api from '@/services/api';

export const getEntriesForNote = async (payload) => {
    const { data } = await api.get('/entry/note-entries', payload);
    return data.data;
};

export const getEntry = async (payload) => {
    const { data } = await api.get('/entry/entry', payload);
    return data.data;
};

export const addEntry = async (payload) => {
    const { data } = await api.post('/entry/entry', payload);
    return data.data;
};

export const updateEntry = async (payload) => {
    const { data } = await api.post('/entry/update-entry', payload);
    return data.data;
};

export const deleteEntry = async (payload) => {
    const { data } = await api.post('/entry/delete-entry', payload);
    return data.data;
};



