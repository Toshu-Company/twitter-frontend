"use client";

import styled from "styled-components";
import Content from "./components/Content";
import { useCallback, useEffect, useRef, useState } from "react";
import { TwiVideosNet } from "./lib/api";
import { SearchResultVideo } from "./lib/api/twi-videos.net";
import useIntersectionObserver from "./lib/observer";
import { useSearchParams } from "next/navigation";

export default function Index() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const [videos, setVideos] = useState<SearchResultVideo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [observe, unobserve] = useIntersectionObserver(
    () => setPage((page) => page + 1),
    {
      threshold: 1,
    }
  );

  const fetch = useCallback(
    async (
      search: string | null,
      page: number,
      videos: SearchResultVideo[]
    ) => {
      if (search) {
        TwiVideosNet.getSearch(search, page).then((res) => {
          setVideos(videos.concat(res.videos));
        });
      } else {
        TwiVideosNet.getIndex(page).then((res) => {
          setVideos(videos.concat(res.videos));
        });
      }
    },
    []
  );

  const target = useRef(null);
  const prevSearch = useRef<string | null>(null);

  useEffect(() => {
    const targetNode = target.current;
    if (targetNode) observe(targetNode);
    return () => {
      if (targetNode) unobserve(targetNode);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prevSearch.current !== search) {
      setPage(1);
      prevSearch.current = search;
      fetch(search, 1, []);
    } else {
      fetch(search, page, videos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  return (
    <>
      <Wrapper>
        <Content.Container>
          {videos &&
            videos.map((v, i) => <Content.Item key={i} videoId={v.id} />)}
          <Intersection
            id="intersection"
            ref={target}
            $visible={videos.length > 0}
          >
            Loading...
          </Intersection>
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

const Intersection = styled.div<{
  $visible: boolean;
}>`
  width: 100%;
  height: 100px;
  text-align: center;
  display: ${(props) => (props.$visible ? "block" : "none")};
`;
