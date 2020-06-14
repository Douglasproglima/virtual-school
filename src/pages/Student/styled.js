import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  input, label {
      display: block;
      width: 100%;
      height: 20px;
      margin-top: 10px;
  }

  input {
      font-size: 18px;
      height: 40px;
      padding: 0 20px;
      color: ${colors.purple};
  }

  input:focus {
      border: 2px solid ${colors.indigoActive};
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;
  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: ${colors.purple};
    background: ${colors.backgroudBody};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;
