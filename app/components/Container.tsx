"use client";

import { styled } from "styled-components";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Wrapper>
        <ContainerBox>{children}</ContainerBox>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding-top: 60px;

  display: flex;
  justify-content: center;
`;

const ContainerBox = styled.div`
  width: 1300px;
  height: 100%;
`;
