import {useState} from 'react';
import {DB} from '../db/db';
import {Genero} from '../interfaces/interfacesApp';

export const useGeneros = () => {
  const [generos, setGeneros] = useState<Genero[] | undefined>();
  const getGeneros = async (categoria: string) => {
    try {
      const {data} = await DB.get<Genero[]>(`/generos/${categoria}`);
      setGeneros(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getGeneros,
    generos,
  };
};
