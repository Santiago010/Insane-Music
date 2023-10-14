import React, {createContext, useEffect, useRef, useState} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import {DB} from '../../db/db';
import {
  Producto,
  ResPublishProduct,
  ResProductos,
  ResProductsForGender,
} from '../../interfaces/interfacesApp';

interface ProductsContextProps {
  products: Producto[];
  loadProducts: () => Promise<void>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  loadProductById: (productId: string) => Promise<Producto | undefined>;
  loadProductForGender: (
    gender: string,
  ) => Promise<ResProductsForGender[] | undefined>;
  loadProductForGenderT: (gender: string) => Promise<unknown>;
  addProductT: (
    categoria: string,
    descripcion: string,
    genero: string,
    nombre: string,
    precio: string,
    cambio: Boolean,
  ) => Promise<unknown>;
  uploadImagesT: (
    images: ImagePickerResponse[],
    id: string,
  ) => Promise<unknown>;
}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const desdeRef = useRef(0);

  const loadProducts = async () => {
    try {
      const {data} = await DB.get<ResProductos>(
        `/productos?limite=5&desde=${desdeRef.current}`,
      );
      desdeRef.current += 5;
      setProducts([...products, ...data.productos]);
      console.log(products.length);
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {};

  const deleteProduct = async (id: string) => {};

  const loadProductById = async (id: string) => {
    try {
      const {data} = await DB.get<Producto>(`/productos/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const addProductT = (
    categoria: string,
    descripcion: string,
    genero: string,
    nombre: string,
    precio: string,
    cambio: Boolean,
  ) => {
    return new Promise(async (res, rej) => {
      try {
        const {data} = await DB.post<ResPublishProduct>('/productos', {
          categoria,
          nombre,
          precio,
          descripcion,
          cambio,
          genero,
        });
        res(data);
      } catch (error) {
        rej(error);
      }
    });
  };

  const uploadImagesT = (images: ImagePickerResponse[], id: string) => {
    const formData = new FormData();
    images.forEach((img, index) => {
      formData.append(`archivo${index + 1}`, {
        uri: img.assets[0].uri,
        type: img.assets[0].type,
        name: img.assets[0].fileName,
      });
    });
    return new Promise(async (res, rej) => {
      try {
        const resImages = await DB.put(`/uploads/productos/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        res(resImages);
      } catch (error) {
        rej(error);
      }
    });
  };

  const loadProductForGender = async (gender: string) => {
    console.log(gender);
    try {
      const {data} = await DB.get<ResProductsForGender[]>(
        `/productos/genero/${gender}`,
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const loadProductForGenderT = (gender: string) => {
    return new Promise(async (res, rej) => {
      try {
        const {data} = await DB.get<ResProductsForGender[]>(
          `/productos/genero/${gender}`,
        );
        res(data);
      } catch (error) {
        rej(error);
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        updateProduct,
        deleteProduct,
        loadProductById,
        loadProductForGenderT,
        loadProductForGender,
        addProductT,
        uploadImagesT,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
