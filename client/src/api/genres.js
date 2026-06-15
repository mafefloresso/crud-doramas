import axios from "./axios";


export const getGenresRequest = async () => axios.get("/genres");