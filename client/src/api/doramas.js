import axios from "./axios";


export const getDoramasRequest = async () => axios.get("/doramas");

export const getDoramaRequest = async (id) => axios.get(`/doramas/${id}`);

export const createDoramaRequest = async (dorama) => axios.post("/doramas", dorama);

export const updateDoramaRequest = async (id, dorama) => axios.put(`/doramas/${id}`, dorama);

export const deleteDoramaRequest = async (id) => axios.delete(`/doramas/${id}`);