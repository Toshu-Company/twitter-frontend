"use client";

import { keyframes } from "styled-components";
import { styled } from "styled-components";

type Props = {
  close: () => void;
};

export default function Modal({ close }: Props) {
  return (
    <>
      <Wrapper onClick={close}>
        <Container onClick={(e) => e.stopPropagation()}></Container>
      </Wrapper>
    </>
  );
}

const animation = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  } 
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  max-width: 500px;
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  background-color: #1a1a1a;

  animation: ${animation} 0.2s ease-in-out;
`;
