import styled from 'styled-components';

export const HomeStyle = styled.div`
   background-color: #ffffff;
   font-style: initial;
   font-size: 16px;
   text-align: center;
   color: #0e9aa7;
   margin-top: 40px;
   p {
      margin-bottom: 0px;
      color: #0e9aa7;
   }

   label {
      color: #0e9aa7;
   }
   .h1 {
      width: 640px;
      display: inline-block;
      color: #2f2f2f;
      font-size: 30px;
      //font-weight: 800;
      margin-bottom: 40px;
      border-bottom-style: double;
      border-color: #0e9aa7;
   }

   .input {
      width: 300px;

      margin-bottom: 20px;
   }
   .ant-select {
      width: 300px;
   }
   .ant-form-item {
      justify-content: center;
   }
   .col-4 {
      text-align: right;
      padding-top: 5px;
   }

   .col-8 {
      text-align: left;
      margin-left: 40px;
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
`;
