import React, { useEffect, useState } from 'react';
import selectTable from '../Table/selector';
import { ChartStyled } from './style';
import selectHome from '../Home/selector';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Col, Row, Select } from 'antd';

const { Option } = Select;
interface Product {
   id: string;
   phases: {
      id: string;
      name: string;
      process: string;
      time: string;
   }[];
}

interface workResult {
   date?: string;
   productId?: string;
   phases?: string;
   user?: string;
   productLot?: string;
   process?: string;
   workTime?: string;
   mediumTime?: string;
}

const ChartPage: React.FC = () => {
   const dataTable2 = useSelector(selectTable);
   const dataHome = useSelector(selectHome);
   const dataTable = dataTable2.workResult.map((obj) => ({
      ...obj,
      mediumTime: String(Number(obj.workTime) / Number(obj.process)),
   }));
   const [product, setProduct] = useState<Product | undefined>(undefined);
   const [dataChart, setDataChart] = useState<workResult[]>(dataTable);
   // const [dataChart2, setDataChart2] = useState<workResult[]>(dataTable2);
   const [productId, setProductId] = useState<string>('');
   const filter = (value: string) => {
      const dataFilter = dataHome.products.find((product) => product.id === value);
      setProduct(dataFilter);
   };

   const addDataChart = (option: string) => {
      if (option === 'all') {
         setDataChart(dataTable);
         addMediumTime(dataTable);
      } else {
         const data = dataTable.filter((work) => work.productId === option);
         setDataChart(data);
         setProductId(option);
         addMediumTime(data);
      }
   };

   // const addDataChart3 = (option: string) => {
   //    const data = dataTable.filter((work) => work.productId === option);
   //    setDataChart2(data);
   // };

   const addDataChart2 = (option: string) => {
      const data = dataTable.filter((work) => work.productId === productId);
      const data2 = data.filter((work) => work.phases === option);
      setDataChart(data2);
      addMediumTime(data2);
   };
   const roundUp = (num: number, precision: number) => {
      precision = Math.pow(10, precision);
      return Math.ceil(num * precision) / precision;
   };

   roundUp(192.168, 1);

   const addMediumTime = (a: workResult[]) => {
      const b = a.reduce((accumulator, currentValue) => accumulator + Number(currentValue.mediumTime), 0);
      const medium = b / a.length;
      const mediumAll = String(roundUp(medium, 1));
      const newData = {
         // date: '',
         // productId: '',
         // phases: '',
         user: 'Medium',
         // productLot: '',
         // process: '',
         // workTime: '',
         mediumTime: mediumAll,
      };
      setDataChart((data) => [newData, ...data]);
   };

   useEffect(() => {
      addMediumTime(dataTable);
   }, []);

   return (
      <ChartStyled>
         <Row>
            <Col>
               <Row className="option">
                  <Col className="col-1">
                     <Select
                        defaultValue="all"
                        className="input"
                        showSearch
                        placeholder="Product ID"
                        optionFilterProp="children"
                        onChange={(value: string) => {
                           // console.log('aaa');

                           filter(value);
                           addDataChart(value);
                        }}
                        filterOption={(input, option) =>
                           option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                     >
                        <Option value="all">All</Option>
                        {dataHome.products.map((product, index) => (
                           <Option key={index} value={product.id}>
                              {product.id}
                           </Option>
                        ))}
                     </Select>
                  </Col>
                  <Col className="col-2">
                     <Select
                        className="input"
                        showSearch
                        placeholder="Phasee"
                        onChange={(value: string) => addDataChart2(value)}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                           option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                     >
                        {product?.phases.map((phase, index) => (
                           <Option key={index} value={phase.name}>
                              {phase.name}
                           </Option>
                        ))}
                     </Select>
                  </Col>
               </Row>
               <BarChart
                  width={700}
                  height={300}
                  data={dataChart}
                  margin={{
                     top: 5,
                     right: 30,
                     left: 20,
                     bottom: 5,
                  }}
               >
                  <CartesianGrid strokeDasharray="1 4" />
                  <XAxis xAxisId={0} dataKey="user" />
                  <XAxis xAxisId={1} className="x-axis-2" dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar maxBarSize={35} dataKey="mediumTime" fill="#80ff00" />
               </BarChart>
            </Col>
            <Col className="chart-left">
               <BarChart
                  width={500}
                  height={300}
                  data={dataTable2.productLot}
                  margin={{
                     top: 20,
                     right: 30,
                     left: 20,
                     bottom: 5,
                  }}
               >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="productID" />
                  <YAxis />
                  <Tooltip />
                  {/*<Legend />*/}
                  <Bar dataKey="check" stackId="a" fill="#8884d8" />
                  <Bar dataKey="pack" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="send" stackId="a" fill="#8B008B" />
               </BarChart>
            </Col>
         </Row>
      </ChartStyled>
   );
};
export default ChartPage;
