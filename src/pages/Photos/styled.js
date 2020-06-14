import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  label {
    display: flex;
    width: 180px;
    height: 180px;
    align-items: center;
    justify-content: center;
    background: ${colors.backgroudBody};
    color: ${colors.gray};
    border: 5px dashed ${colors.indigo};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 180px;
      height: 180px;
    }
  }


  input {
    display: none;
  }
`;