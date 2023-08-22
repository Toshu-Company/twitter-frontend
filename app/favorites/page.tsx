"use client";

import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { favoriteState } from "../components/Recoil/favorite";
import Content from "../components/Content";

export default function Index() {
  const [favorite, setFavorite] = useRecoilState<string[]>(favoriteState);

  return (
    <>
      <Wrapper>
        <Content.Container>
          {favorite &&
            favorite.map((v, i) => <Content.Item key={i} videoId={v} />)}
        </Content.Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  padding-top: 20px;
  margin-bottom: 20px;
`;
