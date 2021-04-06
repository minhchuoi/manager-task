import styled from 'styled-components';

export const StopWatchStyle = styled.div`
   background-color: #ffffff;
   font-style: initial;
   font-size: 16px;
   text-align: center;
   color: #0e9aa7;
   margin-top: 40px;

   p {
      margin-bottom: 0;
      color: #0e9aa7;
      font-family: Arial;
   }

   .h1 {
      width: 640px;
      display: inline-block;
      color: #2f2f2f;
      font-size: 30px;
      margin-bottom: 40px;
      border-bottom-style: double;
      border-color: #0e9aa7;
   }

   .col-1 {
      text-align: right;
      margin-right: 20px;
   }

   .col-2 {
      text-align: left;
      margin-left: 20px;
   }

   button:focus {
      outline: none;
   }

   button {
      width: 100px;
      height: 50px;
      margin: 15px 40px;
      border: 4px solid white;
      border-radius: 5px;
      color: white;
      font-weight: 600;
      background-color: #0e9aa7;
      border-width: 1px;
   }

   button: hover {
      background-color: white;
      color: #0e9aa7;
      cursor: pointer;
      border: 2px solid #0e9aa7;
   }
   .clock {
      display: inline-block;
      margin-top: 50px;
      margin-bottom: 50px;
      width: 400px;
      height: 150px;
      border: 4px solid #2f2f2f;
      font-size: 50px;
      padding-top: 28px;
   }

   .disabled {
      opacity: 0.4;
   }

   .btn-fix {
      width: 200px;
      margin-top: 40px;
   }
`;
