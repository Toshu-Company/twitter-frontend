"use client";

import styled from "styled-components";
import Content from "./components/Content";
import { useEffect, useRef, useState } from "react";
import { TwiVideosNet } from "./lib/api";
import { SearchResult, SearchResultVideo } from "./lib/api/twi-videos.net";
import useIntersectionObserver from "./lib/observer";

export default function Index() {
  const [videos, setVideos] = useState<SearchResultVideo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [observe, unobserve] = useIntersectionObserver(
    () => setPage((page) => page + 1),
    {
      threshold: 1,
    }
  );

  const target = useRef(null);

  useEffect(() => {
    const targetNode = target.current;
    if (targetNode) observe(targetNode);
    return () => {
      if (targetNode) unobserve(targetNode);
    };
  }, []);

  useEffect(() => {
    TwiVideosNet.getIndex(page).then((res) => {
      setVideos(videos.concat(res.videos));
    });
  }, [page]);

  return (
    <>
      <Wrapper>
        <Content.Container>
          {videos && videos.map((v, i) => <Content.Item key={i} video={v} />)}
          <div
            id="intersection"
            ref={target}
            style={{
              display: videos.length > 0 ? "block" : "none",
            }}
          >
            Loading...
          </div>
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
