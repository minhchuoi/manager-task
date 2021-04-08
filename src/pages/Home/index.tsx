import React, { useState } from 'react';
import { HomeStyle } from './style';
import { Row, Col } from 'antd';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Select, Form, Input } from 'formik-antd';
import selectHome from './selector';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addUser } from './slice';

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

const HomePage: React.FC = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const selectDataHome = useSelector(selectHome);
   const [product, setProduct] = useState<product | undefined>(undefined);

   //Tìm kiếm product theo Id
   const filter = (value: string) => {
      const dataFilter = selectDataHome.products.find((product) => product.id === value);
      setProduct(dataFilter);
   };

   return (
      <HomeStyle>
         <div className="h1">
            <p>Target Time</p>
         </div>
         <Formik
            initialValues={{
               idProduct: selectDataHome.passData.idProduct,
               phases: selectDataHome.passData.phases,
               employe: selectDataHome.passData.employe,
               productLot: selectDataHome.passData.productLot,
            }}
            validationSchema={Yup.object({
               idProduct: Yup.string().required('Required'),
               phases: Yup.string().required('Required'),
               employe: Yup.string().required('Required'),
               productLot: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {
               dispatch(addUser(values));
               history.push('/stopWatch');
            }}
            render={({ errors, touched }) => (
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
                           filterOption={(input, option) =>
                              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                           }
                        >
                           {selectDataHome.products.map((product, index) => (
                              <Option key={index} value={product.id}>
                                 {product.id}
                              </Option>
                           ))}
                        </Select>
                        {errors.idProduct && touched.idProduct ? <div className="error">{errors.idProduct}</div> : null}
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
                        {errors.phases && touched.phases ? <div className="error">{errors.phases}</div> : null}
                     </Col>
                  </Row>
                  <Row justify="center">
                     <Col className="col-4" span={4}>
                        <label>Employe:</label>
                     </Col>
                     <Col className="col-8" span={8}>
                        <Select className="input" name="employe">
                           {selectDataHome.users.map((user, index) => (
                              <Option key={index} value={user.name}>
                                 {user.name}
                              </Option>
                           ))}
                        </Select>
                        {errors.employe && touched.employe ? <div className="error">{errors.employe}</div> : null}
                     </Col>
                  </Row>
                  <Row justify="center">
                     <Col className="col-4" span={4}>
                        <label>Production Lot:</label>
                     </Col>
                     <Col className="col-8" span={8}>
                        <Input className="input" name="productLot" />
                        {errors.productLot && touched.productLot ? (
                           <div className="error">{errors.productLot}</div>
                        ) : null}
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
