import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Nav = styled.nav`
  background: ${colors.indigoHouver};
  color: ${colors.dark};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: ${colors.dark};
    /* color: ${colors.white}; */
    margin: 0 10px 0;
  }

  a:hover {
    color: ${colors.white};
  }

  a:active {
    color: ${colors.gray};
  }

`;
