"use client";

import styled from "styled-components";
import Content from "./components/Content";

export default function Index() {
  return (
    <>
      <Wrapper>
        <Content.Container></Content.Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: 40px 0;
`;
