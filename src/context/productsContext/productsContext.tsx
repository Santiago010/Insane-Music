import {AxiosResponse} from 'axios';
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
  addProduct: (
    categoria: string,
    descripcion: string,
    genero: string,
    nombre: string,
    precio: string,
    cambio: Boolean,
  ) => Promise<ResPublishProduct | undefined>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  loadProductById: (productId: string) => Promise<Producto | undefined>;
  uploadImage: (
    images: ImagePickerResponse[],
    id: string | undefined,
  ) => Promise<AxiosResponse<any, any> | undefined>;
  loadProductForGender: (
    gender: string,
  ) => Promise<ResProductsForGender[] | undefined>;
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
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async (
    categoria: string,
    descripcion: string,
    genero: string,
    nombre: string,
    precio: string,
    cambio: Boolean,
  ) => {
    try {
      const {data} = await DB.post<ResPublishProduct>('/productos', {
        categoria,
        nombre,
        precio,
        descripcion,
        cambio,
        genero,
      });
      return data;
    } catch (error) {
      console.error(error.response.data);
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

  const uploadImage = async (
    images: ImagePickerResponse[],
    id: string | undefined,
  ) => {
    const formData = new FormData();
    console.log({images, id});
    images.forEach((img, index) => {
      formData.append(`archivo${index + 1}`, {
        uri: img.assets[0].uri,
        type: img.assets[0].type,
        name: img.assets[0].fileName,
      });
    });
    try {
      const res = await DB.put(`/uploads/productos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res;
    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
        loadProductForGender,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
