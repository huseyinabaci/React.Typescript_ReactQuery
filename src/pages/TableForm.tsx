import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { deleteProduct, fetchProducts } from '../api/api';
import { Table, Button, Spin, Popconfirm  } from 'antd';
import { Link } from "react-router-dom";
import useLanguageStore from '../store/languageStore';

export const TableForm: React.FC = () => {

  const queryClient = useQueryClient();
  const { translations } = useLanguageStore();

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn:deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  })

  const handleDelete = (id : number) => {
    deleteMutation.mutate(id);
  }

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: { id: any; }) => (
        <span>
          <Link to={`/detail/${record.id}`}>
            <Button type="link">View</Button>
          </Link>
          <Popconfirm
            title="Are you sure delete this item?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  if (isLoading) return <div style={{ textAlign: 'center' }}><Spin size="large" /></div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div>
      <h1>{translations.productList}</h1>
      <Link to="/post">
        <Button style={{ marginBottom: "2rem" }} type="primary">
        {translations.productAdd}
        </Button>
      </Link>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        loading={isLoading}
      />
    </div>
  );
}
