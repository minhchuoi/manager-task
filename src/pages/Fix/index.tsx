import React, { useEffect, useState } from 'react';
import { FixStyle } from './style';
import { Row, Col, Modal, Button } from 'antd';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Select, Form, Input } from 'formik-antd';
import selectHome from '../Home/selector';
import selectorStopWatch from '../StopWatch/selector';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addDataWork, addPassData } from '../StopWatch/slice';
import { resetPassData } from '../Home/slice';

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

interface dataWork {
   idProduct: string;
   phase: string;
   employe: string;
   productLot: string;
   targetTime: string;
   mediumTime: string;
}

const FixPage: React.FC = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const data = useSelector(selectHome);
   const dataPass = useSelector(selectorStopWatch);
   const [submitForm, setSubmitForm] = useState<dataWork | undefined>(undefined);
   const [product, setProduct] = useState<product | undefined>(undefined);

   const [medium, setMedium] = useState(0);

   const [isModalVisible, setIsModalVisible] = useState(false);

   const [classInput1, setClassInput1] = useState('input-display-none');
   const [classLabel1, setClassLabel1] = useState('col-8');

   const [classInput2, setClassInput2] = useState('input-display-none');
   const [classLabel2, setClassLabel2] = useState('col-8');

   const [classInput3, setClassInput3] = useState('input-display-none');
   const [classLabel3, setClassLabel3] = useState('col-8');

   const [idPr, setIdPr] = useState(dataPass.passData.idProduct);
   const [namePhase, setNamePhase] = useState(dataPass.passData.phase);
   const [getTime, setGetTime] = useState<number>();

   const showInPut1 = () => {
      setClassInput1('col-8-2');
      setClassLabel1('input-display-none');
   };

   const showInPut2 = () => {
      setClassInput2('col-8-2');
      setClassLabel2('input-display-none');
   };

   const showInPut3 = () => {
      setClassInput3('col-8-2');
      setClassLabel3('input-display-none');
   };

   const targetTime = () => {
      const product2 = data.products.find((product) => product.id === idPr);
      const phases = product2?.phases.find((phases) => phases.name === namePhase);
      setGetTime(Number(phases?.time) / Number(phases?.process));
      console.log(getTime);
   };
   const targetTime2 = (value: string) => {
      const product2 = data.products.find((product) => product.id === idPr);
      const phases = product2?.phases.find((phases) => phases.name === value);
      setGetTime(Number(phases?.time) / Number(phases?.process));
      console.log(getTime);
   };
   const roundUp = (num: number, precision: number) => {
      precision = Math.pow(10, precision);
      return Math.ceil(num * precision) / precision;
   };
   const outTime = (values: string) => {
      const minutes: number = Number(dataPass.passData.timeLive) / (1000 * 60);
      setMedium(roundUp(minutes / Number(values), 1));
   };

   useEffect(() => {
      targetTime();
   }, []);

   const filter = (value: string) => {
      const dataFilter = data.products.find((product) => product.id === value);
      setProduct(dataFilter);
   };

   const sendData = () => {
      dispatch(
         addDataWork({
            idProduct: submitForm?.idProduct,
            phase: submitForm?.phase,
            employe: submitForm?.employe,
            productLot: submitForm?.productLot,
            targetTime: submitForm?.targetTime + 'minute/product',
            mediumTime: submitForm?.mediumTime + 'minute/product',
         }),
      );
   };

   const addPassDta = () => {
      dispatch(
         addPassData({
            idProduct: data.passData.idProduct,
            phase: data.passData.phases,
            employe: data.passData.employe,
            productLot: data.passData.productLot,
            targetTime: getTime + 'minute/product',
            mediumTime: medium + 'minute/product',
         }),
      );
   };

   return (
      <FixStyle>
         <div className="h1">
            <p>Target Time</p>
         </div>
         <Formik
            initialValues={{
               idProduct: dataPass.passData.idProduct,
               phases: dataPass.passData.phase,
               employe: dataPass.passData.employe,
               productLot: dataPass.passData.productLot,
               process: dataPass.passData.process,
            }}
            validationSchema={Yup.object({
               idProduct: Yup.string().required('Required'),
               phases: Yup.string().required('Required'),
               employe: Yup.string().required('Required'),
               productLot: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {
               setSubmitForm({
                  idProduct: values.idProduct,
                  phase: values.phases,
                  employe: values.employe,
                  productLot: values.productLot,
                  targetTime: String(getTime),
                  mediumTime: String(medium),
               });
               outTime(values.process);
               setIsModalVisible(true);
            }}
            render={({ errors, touched }) => (
               <Form>
                  <Row justify="center">
                     <Col className="col-4" span={4}>
                        <label>ID Product:</label>
                     </Col>
                     <Col className={classInput1} span={8}>
                        <Select
                           className="input"
                           name="idProduct"
                           showSearch
                           optionFilterProp="children"
                           onChange={(value) => {
                              filter(value);
                              setIdPr(value);
                           }}
                           filterOption={(input, option) =>
                              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                           }
                        >
                           {data.products.map((product, index) => (
                              <Option key={index} value={product.id}>
                                 {product.id}
                              </Option>
                           ))}
                        </Select>
                        {errors.idProduct && touched.idProduct ? <div className="error">{errors.idProduct}</div> : null}
                     </Col>
                     <Col className={classLabel1} span={8}>
                        <Row className="cl-edit" justify="space-between">
                           <Col>
                              <label onClick={showInPut1}>{dataPass.passData.idProduct}</label>
                           </Col>
                           <Col>
                              <Button className="btn-edit" onClick={showInPut1}>
                                 Edit
                              </Button>
                              {/*<label onClick={showInPut1}>Edit</label>*/}
                           </Col>
                        </Row>
                     </Col>
                  </Row>
                  <Row justify="center">
                     <Col className="col-4" span={4}>
                        <label>Phases:</label>
                     </Col>
                     <Col className={classInput2} span={8}>
                        <Select
                           className="input"
                           name="phases"
                           showSearch
                           onChange={(value) => {
                              setNamePhase(value);
                              targetTime2(value);
                           }}
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
                     <Col className={classLabel2} span={8}>
                        <Row className="cl-edit" justify="space-between">
                           <Col>
                              <label onClick={showInPut2}>{dataPass.passData.phase}</label>
                           </Col>
                           <Col>
                              <Button className="btn-edit" onClick={showInPut2}>
                                 Edit
                              </Button>
                           </Col>
                        </Row>
                     </Col>
                  </Row>
                  <Row justify="center">
                     <Col className="col-4" span={4}>
                        <label>Employe:</label>
                     </Col>
                     <Col className={classInput3} span={8}>
                        <Select className="input" name="employe">
                           {data.users.map((user, index) => (
                              <Option key={index} value={user.name}>
                                 {user.name}
                              </Option>
                           ))}
                        </Select>
                        {errors.employe && touched.employe ? <div className="error">{errors.employe}</div> : null}
                     </Col>
                     <Col className={classLabel3} span={8}>
                        <Row className="cl-edit" justify="space-between">
                           <Col>
                              <label onClick={showInPut3}>{dataPass.passData.employe}</label>
                           </Col>
                           <Col>
                              <Button className="btn-edit" onClick={showInPut3}>
                                 Edit
                              </Button>
                           </Col>
                        </Row>
                     </Col>
                  </Row>
                  <Row justify="center">
                     <Col className="col-4" span={4}>
                        <label>Production Lot:</label>
                     </Col>
                     <Col className="col-8-2" span={8}>
                        <Input className="input" name="productLot" />
                        {errors.productLot && touched.productLot ? (
                           <div className="error">{errors.productLot}</div>
                        ) : null}
                     </Col>
                  </Row>
                  <Row justify="center">
                     <Col className="col-4" span={4}>
                        <label>Target Time:</label>
                     </Col>
                     <Col className="col-8" span={8}>
                        <label>{getTime}</label>
                     </Col>
                  </Row>
                  <div>
                     <div className="clock">
                        <p>{dataPass.passData.timeLive}</p>
                     </div>
                     <div>
                        <Button className="no-select" disabled>
                           Start
                        </Button>
                        <Button className="no-select" disabled>
                           Pause
                        </Button>
                        <Button className="no-select" disabled>
                           Stop
                        </Button>
                        <Button className="no-select" disabled>
                           Clear
                        </Button>
                     </div>
                  </div>
                  <Row className="send" justify="center" align="middle">
                     <Col className="col-4" span={3}>
                        <label>Process number:</label>
                     </Col>
                     <Col className="col-4" span={4}>
                        <Input className="input-2" name="process" />
                        {errors.process && touched.process ? <div className="error">{errors.process}</div> : null}
                     </Col>
                     <Col className="col-4" span={3}>
                        <button id="btn-send" type="submit">
                           Send
                        </button>
                     </Col>
                  </Row>
               </Form>
            )}
         />
         <Modal
            title="Do you want to post the results below?"
            visible={isModalVisible}
            onOk={() => {
               sendData();
               dispatch(resetPassData({}));
               setIsModalVisible(false);

               history.push('/');
            }}
            onCancel={() => {
               addPassDta();
               setIsModalVisible(false);
               history.push('/fix');
            }}
            okText="Send Result"
            cancelText="Fix Data"
         >
            <Row className="data-send" justify="center">
               <Col id="col-1-1" className="col-1" span={10}>
                  <p>ID Product:</p>
                  <p>Phases:</p>
                  <p>User:</p>
                  <p>Production Lot:</p>
                  <p>Target Time:</p>
                  <p>Measurement result:</p>
               </Col>
               <Col className="col-2" span={10}>
                  <p>{submitForm?.idProduct}</p>
                  <p>{submitForm?.phase}</p>
                  <p>{submitForm?.employe}</p>
                  <p>{submitForm?.productLot}</p>
                  <p>{submitForm?.targetTime} minute/product</p>
                  <p>{submitForm?.mediumTime} minute/product</p>
               </Col>
            </Row>
         </Modal>
      </FixStyle>
   );
};
export default FixPage;
