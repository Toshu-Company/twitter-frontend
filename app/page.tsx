"use client";

import styled from "styled-components";
import Content from "./components/Content";
import { useCallback, useEffect, useRef, useState } from "react";
import { TwiVideosNet } from "./lib/api";
import { SearchResult, SearchResultVideo } from "./lib/api/twi-videos.net";
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
  }, []);

  useEffect(() => {
    if (prevSearch.current !== search) {
      setPage(1);
      prevSearch.current = search;
      fetch(search, 1, []);
    } else {
      fetch(search, page, videos);
    }
  }, [page, search]);

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
