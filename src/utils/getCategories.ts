import {DB} from '../db/db';
import {Categorias} from '../interfaces/interfacesApp';

export const getCategories = async () => {
  try {
    const {data} = await DB.get<Categorias>('/categorias');
    return data.categorias;
  } catch (error) {
    console.error(error);
  }
};
