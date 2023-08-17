"use client";

import { styled } from "styled-components";
import Modal from ".";
import { VideoDetail } from "@/app/lib/api/twi-videos.net";
import { isSchool } from "@/app/lib/school";

type Props = {
  close: () => void;
  detail: VideoDetail;
};

export default function Detail({ close, detail }: Props) {
  console.log(detail);

  return (
    <>
      <Modal.Default maxWidth={1200} close={close}>
        <Wrapper>
          <Video controls autoPlay loop muted autoFocus>
            <source
              src={isSchool() ? "https://youtu.be/0bIRwBpBcZQ" : detail?.url[1]}
              type="video/mp4"
            />
          </Video>
          <Title>{detail?.title}</Title>
        </Wrapper>
      </Modal.Default>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: white;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;
