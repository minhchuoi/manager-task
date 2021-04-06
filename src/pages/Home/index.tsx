import React, { useEffect, useState } from 'react';
import { HomeStyle } from './style';
import { Row, Col } from 'antd';
import { Formik } from 'formik';
import { Select, Form, Input } from 'formik-antd';
import selectHome from './selector';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addUser, addTime } from './slice';

const { Option } = Select;

interface product {
   id: string;
   phases: {
      id: string;
      name: string;
      process: string;
      time: string;
   }[];
}

interface Time {
   process: string;
   time: string;
}

const HomePage: React.FC = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const data = useSelector(selectHome);
   const [product, setProduct] = useState<product | undefined>(undefined);
   const [time, setTime] = useState<Time | undefined>(undefined);

   const filter = (value: string) => {
      const dataFilter = data.products.find((product) => product.id === value);
      setProduct(dataFilter);
   };

   const filter2 = (value: string) => {
      const dataFilter = product?.phases.find((phases) => phases.name === value);
      // setTime({ process: dataFilter?.process, time: dataFilter?.time });
      setTime(dataFilter);
   };
   // console.log(time);
   return (
      <HomeStyle>
         <div className="h1">
            <p>Target Time</p>
         </div>
         <Formik
            initialValues={{ idProduct: '', phases: '', employe: '', productLot: '' }}
            onSubmit={(values) => {
               // console.log(values);
               dispatch(addTime(time));
               dispatch(addUser(values));
               history.push('/stopWatch');
            }}
            render={() => (
               <Form>
                  <Row justify="center">
                     <Col className="col-4" span={4}>
                        <label>ID Product:</label>
                     </Col>
                     <Col className="col-8" span={8}>
                        <Select
                           className="input"
                           name="idProduct"
                           showSearch
                           optionFilterProp="children"
                           onChange={(value) => filter(value)}
                           filterOption={(input: string, option: any) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                           }
                        >
                           {data.products.map((product, index) => (
                              <Option key={index} value={product.id}>
                                 {product.id}
                              </Option>
                           ))}
                        </Select>
                     </Col>
                  </Row>
                  <Row justify="center">
                     <Col className="col-4" span={4}>
                        <label>Phases:</label>
                     </Col>
                     <Col className="col-8" span={8}>
                        <Select
                           className="input"
                           name="phases"
                           showSearch
                           onChange={(value) => filter2(value)}
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
                  <Row justify="center">
                     <Col className="col-4" span={4}>
                        <label>Employe:</label>
                     </Col>
                     <Col className="col-8" span={8}>
                        <Select className="input" name="employe">
                           {data.users.map((user, index) => (
                              <Option key={index} value={user.name}>
                                 {user.name}
                              </Option>
                           ))}
                        </Select>
                     </Col>
                  </Row>
                  <Row justify="center">
                     <Col className="col-4" span={4}>
                        <label>Production Lot:</label>
                     </Col>
                     <Col className="col-8" span={8}>
                        <Input className="input" name="productLot" />
                     </Col>
                  </Row>
                  <button type="submit">Start</button>
               </Form>
            )}
         />
      </HomeStyle>
   );
};
export default HomePage;
