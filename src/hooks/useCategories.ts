import {useEffect, useState} from 'react';
import {DB} from '../db/db';
import {Categorias, InfoCategoria} from '../interfaces/interfacesApp';

export const useCategories = () => {
  const [categories, setCategories] = useState<InfoCategoria[] | undefined>();

  const getCategories = async () => {
    try {
      const {data} = await DB.get<Categorias>('/categorias');
      setCategories(data.categorias);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categories,
  };
};
