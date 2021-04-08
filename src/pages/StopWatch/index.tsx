import React, { useState } from 'react';
import { StopWatchStyle } from './style';
import { Row, Col, Modal } from 'antd';
import Timer from 'react-compound-timer';
import { useDispatch, useSelector } from 'react-redux';
import selectHome from '../Home/selector';
import { useHistory } from 'react-router-dom';
import { addUser, resetPassData } from '../Home/slice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input } from 'formik-antd';
import { addDataWork, addPassData } from './slice';

const StopWatchPage: React.FC = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const dataHome = useSelector(selectHome);
   const [timeLive, setTimeLive] = useState('');
   const [process, setProcess] = useState('');
   //MODAL
   const [isModalVisible, setIsModalVisible] = useState(false);
   const formatTime = (duration: number) => {
      const seconds: number = Math.floor((duration / 1000) % 60);
      const minutes: number = Math.floor((duration / (1000 * 60)) % 60);
      const hours: number = Math.floor((duration / (1000 * 60 * 60)) % 24);

      const hours2 = hours < 10 ? '0' + hours : hours;
      const minutes2 = minutes < 10 ? '0' + minutes : minutes;
      const seconds2 = seconds < 10 ? '0' + seconds : seconds;

      return hours2 + ':' + minutes2 + ':' + seconds2;
   };

   const targetTime = () => {
      const product = dataHome.products.find((product) => product.id === dataHome.passData.idProduct);
      const phases = product?.phases.find((phases) => phases.name === dataHome.passData.phases);
      return Number(phases?.time) / Number(phases?.process);
   };

   const [btnStart, setBtnStart] = useState('');
   const [btnPause, setBtnPause] = useState('');
   const [btnStop, setBtnStop] = useState('');
   const [btnClear, setBtnClear] = useState('');
   const [eClear, setEClear] = useState('e-clear-display-none');
   const [sendResult, setSendResul] = useState('e-clear-display-none');
   const [time, setTime] = useState(0);
   const [medium, setMedium] = useState(0);

   const onClickClear = () => {
      setEClear('');
      setSendResul('e-clear-display-none');
   };

   const onClickStop = () => {
      setEClear('e-clear-display-none');
      setSendResul('');
   };

   const onStart = () => {
      setBtnStop('disabled');
      setBtnPause('disabled');
      setBtnStart('');
      setBtnClear('');
   };

   const onPause = () => {
      setBtnPause('');
      setBtnStart('disabled');
      setBtnClear('disabled');
   };

   const roundUp = (num: number, precision: number) => {
      precision = Math.pow(10, precision);
      return Math.ceil(num * precision) / precision;
   };

   const sendData = () => {
      dispatch(
         addDataWork({
            idProduct: dataHome.passData.idProduct,
            phase: dataHome.passData.phases,
            employe: dataHome.passData.employe,
            productLot: dataHome.passData.productLot,
            targetTime: targetTime() + 'minute/product',
            mediumTime: String(medium) + 'minute/product',
         }),
      );
   };

   const addPassDta = () => {
      dispatch(
         addPassData({
            idProduct: dataHome.passData.idProduct,
            phase: dataHome.passData.phases,
            employe: dataHome.passData.employe,
            productLot: dataHome.passData.productLot,
            mediumTime: String(medium),
            timeLive: timeLive,
            time: time,
            process: process,
         }),
      );
   };

   const outTime = (values: string) => {
      const minutes: number = time / (1000 * 60);
      setMedium(roundUp(minutes / Number(values), 1));
   };

   return (
      <StopWatchStyle>
         <div className="layout-1">
            <div className="h1">
               <p>Target Time</p>
            </div>
            <Row justify="center">
               <Col className="col-1">
                  <p>ID Product:</p>
                  <p>Phases:</p>
                  <p>User:</p>
                  <p>Production Lot:</p>
                  <p>Target Time:</p>
               </Col>
               <Col className="col-2">
                  <p>{dataHome.passData.idProduct}</p>
                  <p>{dataHome.passData.phases}</p>
                  <p>{dataHome.passData.employe}</p>
                  <p>{dataHome.passData.productLot}</p>
                  <p>{targetTime()} minute/product</p>
               </Col>
            </Row>
         </div>
         <Timer formatValue={(value) => `${value < 10 ? `0${value}` : value}`} initialTime={0} startImmediately={false}>
            {({ start, pause, stop, reset, getTime }: any) => (
               <React.Fragment>
                  <div className="clock">
                     <Timer.Hours />:
                     <Timer.Minutes />:
                     <Timer.Seconds />
                  </div>
                  <br />
                  <div>
                     <button
                        className={btnStart}
                        onClick={() => {
                           start();
                           onStart();
                        }}
                     >
                        Start
                     </button>
                     <button
                        className={btnPause}
                        onClick={() => {
                           pause();
                           onPause();
                        }}
                     >
                        Pause
                     </button>
                     <button
                        className={btnStop}
                        onClick={() => {
                           stop();
                           const Time = getTime();
                           setTimeLive(formatTime(Time));
                           setTime(Time);
                           onClickStop();
                        }}
                     >
                        Stop
                     </button>
                     <button
                        className={btnClear}
                        onClick={() => {
                           reset();
                           onClickClear();
                        }}
                     >
                        Clear
                     </button>
                  </div>
               </React.Fragment>
            )}
         </Timer>
         <div className={eClear}>
            <button
               className="btn-fix"
               onClick={() => {
                  history.push('/');
               }}
            >
               Partial correction
            </button>
            <button
               className="btn-fix"
               onClick={() => {
                  history.push('/');
                  dispatch(
                     addUser({
                        idProduct: '',
                        phases: '',
                        employe: '',
                        productLot: '',
                     }),
                  );
               }}
            >
               New
            </button>
         </div>
         <div id="send-dataHome" className={sendResult}>
            <Formik
               initialValues={{
                  process: '',
               }}
               validationSchema={Yup.object({
                  process: Yup.number().required('Required'),
               })}
               onSubmit={(values) => {
                  // console.log(values);
                  setProcess(values.process);
                  outTime(values.process);
                  setIsModalVisible(true);
               }}
               render={({ errors, touched }) => (
                  <Form>
                     <Row justify="center" align="middle">
                        <Col className="col-4" span={3}>
                           <label>Process number:</label>
                        </Col>
                        <Col className="col-4" span={4}>
                           <Input className="input" name="process" />
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
         </div>
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
            <Row className="dataHome-send" justify="center">
               <Col id="col-1-1" className="col-1" span={10}>
                  <p>ID Product:</p>
                  <p>Phases:</p>
                  <p>User:</p>
                  <p>Production Lot:</p>
                  <p>Target Time:</p>
                  <p>Measurement result:</p>
               </Col>
               <Col className="col-2" span={10}>
                  <p>{dataHome.passData.idProduct}</p>
                  <p>{dataHome.passData.phases}</p>
                  <p>{dataHome.passData.employe}</p>
                  <p>{dataHome.passData.productLot}</p>
                  <p>{targetTime()} minute/product</p>
                  <p>{medium} minute/product</p>
               </Col>
            </Row>
         </Modal>
      </StopWatchStyle>
   );
};

export default StopWatchPage;
