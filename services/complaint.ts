import { AxiosInstance } from "axios";

// TODO: give payload typings 
export const createComplaintService = (api : AxiosInstance) => ({
    getComplaints: async () => {
        const { data } = await api.get('/complaints/complaints');
        console.log("data is ", data);
        return data.data;
    },

    getComplaintsForPatient: async (payload : any) => {
        const { data } = await api.post('/complaints/patient-complaints', payload);
        return data.data;
    },

    getComplaint: async (payload : any) => {
        const { data } = await api.post('/complaints/complaint-id', payload);
        return data.data;
    },

    addComplaint: async (payload : any, patientId : any) => {
        console.log('payload is ', payload);
        payload = {
            ...payload,
            patientId
        }
        const { data } = await api.post('/complaints/complaint', payload);
        return data.data;
    },

    updateComplaint: async (payload : any) => {
        const { data } = await api.post('/complaints/update-complaint', payload);
        return data.data;
    },

    deleteComplaint: async (payload : any) => {
        const { data } = await api.post('/complaints/delete-complaint', payload);
        return data.data;
    },
});


