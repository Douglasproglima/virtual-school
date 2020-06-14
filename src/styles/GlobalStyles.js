import Styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

  * {
    margin:0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%
  }

  body {
    margin: 0;
    padding: 0;
    text-align: left;
    -webkit-font-smoothing: antialiased;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 1.3em;
    font-weight: 400;
    line-height: 1.5em;
    background: ${colors.backgroudBody};
    color: ${colors.gray};
  }

  h1 {
    margin-top: 15px;
    text-transform: uppercase;
    text-align: center;
    color: ${colors.gray};
  }

  h2 {
    text-align: left;
    color: ${colors.gray};
  }

  hr {
    margin: 20px 0;
    border: 2px;
    border-top: 3px solid ${colors.indigo};
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    width: 100%;
    height: 43px;
    margin-top: 10px;
    border: none;
    background: ${colors.indigo};
    color: ${colors.white};
    font-size: 18px;
    font-weight: 700;
    height: 40px;
    cursor: pointer;
    margin-top: 25px;
    transition: all 300ms;
  }

  button:hover {
    background: ${colors.indigoHouver};
    ${'' /* filter: brightness(85%); */}
  }

  button:active {
    background: ${colors.indigoActive};
  }

  ul {
    list-style: none;
  }

  li {
    margin-top: 2px;
    padding-left: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    transition: all 600ms;
  }

  li:hover {
    background: ${colors.indigoHouver};
  }

  li .edit {
    margin-right: 5px;
    color: ${colors.success};
  }

  li .delete {
    margin-right: 5px;
    color: ${colors.error};
  }

  li .edit, li .delete {
    cursor: pointer;
    transition: all 600ms;
  }

  li span {
    display: flex;
    align-items: center;
  }


  /* Tabela Superior */
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 2px solid ${colors.indigoActive};
    margin-top: 20px;
  }

  th, td {
    text-align: center;
    padding: 10px;
  }

  tr:nth-child(even) {
    background-color: ${colors.indigoActive};
  }

  ${'' /* Altera as cores padrão das msgs do Toastify */}
  body .Toastify .Toastify__toast-container .Toastify__toast--success {
    background: ${colors.success}
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--info {
    background: ${colors.info}
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--warning {
    background: ${colors.warning};
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background: ${colors.error}
  }
`;

export const Container = Styled.section`
  max-width: 640px;
  margin: 50px auto;
  border-radius: 15px;
  background: ${colors.backgroudForm};
  colors: ${colors.white};
  box-sizing: border-box;
  box-shadow: 0em 0rem 5rem ${colors.boderShadown};
  border: 3px solid ${colors.indigoHouver};
  padding: 30px;
  text-align: center;
`;
