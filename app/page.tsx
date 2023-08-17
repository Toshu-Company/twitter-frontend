"use client";

import styled from "styled-components";
import Content from "./components/Content";
import { useEffect, useState } from "react";
import { TwiVideosNet } from "./lib/api";
import { SearchResult, SearchResultVideo } from "./lib/api/twi-videos.net";

export default function Index() {
  const [videos, setVideos] = useState<SearchResultVideo[]>([]);

  console.log(videos);

  useEffect(() => {
    TwiVideosNet.getIndex().then((res) => {
      setVideos(res.videos);
      // TwiVideosNet.getVideo(res.videos[0].id).then(console.log);
      // TwiVideosNet.getDetail(res.videos[0].id).then(console.log);
    });
  }, []);

  return (
    <>
      <Wrapper>
        <Content.Container>
          {videos && videos.map((v, i) => <Content.Item key={i} video={v} />)}
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
