import selectTable from './selector';
import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';

const TablePage: React.FC = () => {
   const dataTable = useSelector(selectTable);
   const roundUp = (num: number, precision: number) => {
      precision = Math.pow(10, precision);
      return Math.ceil(num * precision) / precision;
   };
   const colums = [
      {
         title: 'Date',
         dataIndex: 'date',
         key: 'date',
      },
      {
         title: 'Product ID',
         dataIndex: 'productId',
         key: 'productID',
      },
      {
         title: 'Phases',
         dataIndex: 'phases',
         key: 'phases',
      },
      {
         title: 'User',
         dataIndex: 'user',
         key: 'user',
      },
      {
         title: 'Process',
         dataIndex: 'process',
         key: 'process',
      },
      {
         title: 'Total work time',
         dataIndex: 'workTime',
         key: 'workTime',
         render: (value: string) => {
            return value + ' minutes';
         },
      },
      {
         title: 'Work time per unit',
         dataIndex: 'workTime',
         key: 'mediumTime',
         render: (value: string, row: any) => {
            console.log(row);
            const mediumTime = Number(value) / Number(row.process);
            const mediumTime2 = roundUp(mediumTime, 1);
            return mediumTime2 + ' minutes/product';
         },
      },
   ];
   return <Table dataSource={dataTable.workResult} columns={colums} />;
};

export default TablePage;
