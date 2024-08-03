import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/api';
import { Button, Form, Input, Spin } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Product } from '../types/types';

export const PostForm: React.FC = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      form.resetFields();
      navigate('/');
    },
    onError: (error: Error) => {
      console.error('Error creating product:', error);
    },
  });

  const onFinish = (values: Product) => {
    mutation.mutate(values);
  };

  const isLoading = mutation.status === 'pending';

  return (
    <div>
      {isLoading && (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Spin size="large" />
        </div>
      )}
      <Form form={form} onFinish={onFinish}>
        <h1>Product Form</h1>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea />
        </Form.Item>
        <Form.Item label="Barcode" name="barcode">
          <Input />
        </Form.Item>
        <Form.Item label="Rate" name="rate" rules={[{ required: true, message: 'Please input the rate!' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Kaydet
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
