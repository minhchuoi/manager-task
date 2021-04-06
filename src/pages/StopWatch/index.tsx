import React, { useEffect, useState } from 'react';
import { StopWatchStyle } from './style';
import { Row, Col } from 'antd';
import Timer from 'react-compound-timer';
import { useDispatch, useSelector } from 'react-redux';
import selectHome from './selector';

const StopWatchPage: React.FC = () => {
   const data = useSelector(selectHome);
   console.log(data);
   const [btnStart, setBtnStart] = useState('');
   const [btnPause, setBtnPause] = useState('');
   const [btnStop, setBtnStop] = useState('');
   const [btnClear, setBtnClear] = useState('');
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

   const timer = (value: number) => {
      const seconds: number = Math.floor((value / 1000) % 60);
      const minutes: number = Math.floor((value / (1000 * 60)) % 60);
      const hours: number = Math.floor((value / (1000 * 60 * 60)) % 24);

      const hours2: string | number = hours < 10 ? '0' + hours : hours;
      const minutes2: string | number = minutes < 10 ? '0' + minutes : minutes;
      const seconds2: string | number = seconds < 10 ? '0' + seconds : seconds;

      return hours2 + ':' + minutes2 + ':' + seconds2;
   };

   const time: number = Number(data.targetTime.time) / Number(data.targetTime.process);
   console.log(time);
   return (
      <StopWatchStyle>
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
               <p>{data.passData.idProduct}</p>
               <p>{data.passData.phases}</p>
               <p>{data.passData.employe}</p>
               <p>{data.passData.productLot}</p>
               <p>{time} minute/product</p>
            </Col>
         </Row>
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
                           const actualTime = getTime();
                           timer(actualTime);
                        }}
                     >
                        Stop
                     </button>
                     <button className={btnClear} onClick={reset}>
                        Clear
                     </button>
                  </div>
               </React.Fragment>
            )}
         </Timer>
         <div className="clear">
            <button className="btn-fix">Sửa một phần</button>
            <button className="btn-fix">Nhập từ đầu</button>
         </div>
      </StopWatchStyle>
   );
};

export default StopWatchPage;
