import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { Product } from '../types/types';
import { fetchProduct, updateProduct } from '../api/api';
import TextArea from 'antd/es/input/TextArea';
import useLanguageStore from '../store/languageStore';

export const UpdateForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { translations } = useLanguageStore();

  // Fetch product query
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', Number(id)],
    queryFn: () => fetchProduct(Number(id)),
  });
  

  // Mutation to update product
  const mutation = useMutation<Product, Error, Product>({
    mutationFn: (updatedProduct: Product) => updateProduct(updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products']});
      form.resetFields();
      navigate('/');
    },
    onError: (error: Error) => {
      console.error('Error updating product:', error);
    },
  });

  // Set form fields when product data is fetched
  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    }
  }, [product, form]);

  // Form submit handler
  const onFinish = (values: Product) => {
    if (product) {
      const updateValue = { ...values, id: product.id };
      mutation.mutate(updateValue);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product</div>;

  return (
    <Form form={form} onFinish={onFinish}>
      <h1>{translations.productUpdate}</h1>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the product name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the product description!' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label="Barcode"
        name="barcode"
        rules={[{ required: true, message: 'Please input the product barcode!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Rate"
        name="rate"
        rules={[{ required: true, message: 'Please input the product rate!' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">{translations.productUpdate}</Button>
      </Form.Item>
    </Form>
  );
};
