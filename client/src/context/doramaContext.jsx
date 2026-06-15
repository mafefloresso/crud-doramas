import { createContext, useContext, useState } from "react";

import {
  createDoramaRequest,
  deleteDoramaRequest,
  getDoramaRequest,
  getDoramasRequest,
  updateDoramaRequest,
} from "../api/doramas";

const DoramaContext = createContext();

export const useDoramas = () => {
  const context = useContext(DoramaContext);
  if (!context)
    throw new Error("useDoramas must be used within a DoramaProvider");
  return context;
};

export const DoramaProvider = ({ children }) => {
  const [doramas, setDoramas] = useState([]);

  const getDoramas = async () => {
    try {
      const res = await getDoramasRequest();
      setDoramas(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDorama = async (id) => {
    try {
      await deleteDoramaRequest(id);
      if (res.status === 204)
        setDoramas(doramas.filter((dorama) => dorama.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const createDorama = async (dorama) => {
    try {
      const res = await createDoramaRequest(dorama);
      console.log(res.data);
      setDoramas([...doramas, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const getDorama = async (id) => {
    try {
      const res = await getDoramaRequest(id);
      return res.data;

    } catch (err) {
      console.log(err);
    }
  };

  const updateDorama = async (id, dorama) => {
    try {
      const res = await updateDoramaRequest(id, dorama);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DoramaContext.Provider
      value={{
        doramas,
        getDoramas,
        deleteDorama,
        createDorama,
        getDorama,
        updateDorama,
      }}
    >
      {children}
    </DoramaContext.Provider>
  );
};
