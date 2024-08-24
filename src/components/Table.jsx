import React from 'react';
import { Table } from 'antd';

const columns = [
  {
      title: '#',
      dataIndex: 'ID'
  },
  {
    title: 'Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Price',
    dataIndex: 'productPrice',
    key: 'productPrice',
  },
  {
    title: 'Type',
    dataIndex: 'productType',
    key: 'productType',
  },
  {
    title: 'Date',
    dataIndex: 'productData',
    key: 'productData',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const TableCustom = ({ products, loading }) => {
  return (
    <Table
    loading={loading}
      columns={columns}
      dataSource={products}
      onChange={onChange}
      rowKey="id"
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
    />
  );
};

export default TableCustom;
