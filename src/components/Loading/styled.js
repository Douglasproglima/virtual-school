import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  position: absolute;
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 6px solid #7d6dca;
  border-right: 6px solid #7d6dca;
  border-bottom: 6px solid #7d6dca;
  border-left: 8px solid #b8b3d2;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;

  position: absolute;
  top: 35%;
  left: 45%;
  z-index: 1;
  padding: 5%;
  display: flex;
  align-items: center;
  align-content: center;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: transparent;
  }

  span {
    z-index: 2;
  }
`;