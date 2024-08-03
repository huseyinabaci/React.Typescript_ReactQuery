import axiosInstance from "./axiosInstance";
import { Product } from "../types/types";

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axiosInstance.get<Product[]>('/product');
    return response.data;
};

export const fetchProduct = async (id: number): Promise<Product> => {
    const response = await axiosInstance.get<Product>(`/product/${id}`);
    return response.data;
}

export const createProduct = async (product : Product): Promise<Product> => {
    const response = await axiosInstance.post<Product>('/product',product);
    return response.data;
}

export const updateProduct = async (product : Product): Promise<Product> => {
    const response = await axiosInstance.put<Product>('product',product);
    return response.data;
}

export const deleteProduct = async (id : number): Promise<void> => {
    await axiosInstance.delete(`product`,{
        params: {id}
    });
}