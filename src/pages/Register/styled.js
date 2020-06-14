import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  form, input, label {
      display: block;
      width: 100%;
      height: 20px;
      margin-top: 10px;
  }

  form, input {
      font-size: 18px;
      height: 40px;
      padding: 0 20px;
      color: ${colors.purple};
  }

  input:focus {
      border: 2px solid ${colors.indigoActive};
  }
`;