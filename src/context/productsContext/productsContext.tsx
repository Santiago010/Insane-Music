import React, {createContext, useEffect, useRef, useState} from 'react';
import {ImagePickerResponse} from 'react-native-image-picker';
import {DB} from '../../db/db';
import {
  Producto,
  ResPublishProduct,
  ResProductos,
} from '../../interfaces/interfacesApp';

interface ProductsContextProps {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (
    categoria: string,
    nombre: string,
    precio: string,
  ) => Promise<ResPublishProduct | undefined>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  loadProductById: (productId: string) => Promise<Producto | undefined>;
  uploadImage: (
    dataImage1: ImagePickerResponse,
    id: string | undefined,
  ) => Promise<void>; // TODO:cambiar any
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
    nombre: string,
    precio: string,
  ) => {
    try {
      const {data} = await DB.post<ResPublishProduct>('/productos', {
        categoria,
        nombre,
        precio,
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

  // TODO: cambiar ANY
  const uploadImage = async (
    {assets}: ImagePickerResponse,
    id: string | undefined,
  ) => {
    const fileToUpload = {
      uri: assets[0].uri,
      type: assets[0].type,
      name: assets[0].fileName,
    };

    const formData = new FormData();

    formData.append('archivo', fileToUpload);
    console.log(formData);

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
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
