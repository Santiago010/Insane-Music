import {DB} from '../db/db';
import {Genero} from '../interfaces/interfacesApp';

export const getGeneros = async (categoria: string) => {
  try {
    const {data} = await DB.get<Genero[]>(`/generos/${categoria}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
