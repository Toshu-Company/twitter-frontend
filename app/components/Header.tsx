"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Modal from "./Modal";
import Link from "next/link";

export default function Header() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, []);

  return (
    <>
      <Wrapper>
        <Container>
          <Link href={"/"}>
            <Image
              src={require("@/public/images/twitter.svg")}
              width={width >= 768 ? 48 : 30}
              height={width >= 768 ? 48 : 30}
              alt="Twitter"
            />
          </Link>
          <Row>
            <Search>
              <Input placeholder="Search..." />
              <Button>
                <Image
                  src={require("@/public/images/search.svg")}
                  width={width >= 768 ? 20 : 16}
                  height={width >= 768 ? 20 : 16}
                  alt="Search"
                />
              </Button>
            </Search>
            <Button onClick={() => setModal(true)}>
              <Image
                src={require("@/public/images/setting.svg")}
                width={width >= 768 ? 24 : 20}
                height={width >= 768 ? 24 : 20}
                alt="Setting"
              />
            </Button>
            <LinkButton href={"/favorites"}>
              <Image
                src={require("@/public/images/heart.svg")}
                width={width >= 768 ? 24 : 20}
                height={width >= 768 ? 24 : 20}
                alt="heart"
              />
            </LinkButton>
          </Row>
        </Container>
      </Wrapper>
      {modal && <Modal close={() => setModal(false)} />}
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  max-width: 1300px;
  width: 90%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Search = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 8px;
  padding: 0 10px;
  gap: 10px;

  display: flex;
  align-items: center;

  background-color: #202327;
  color: white;

  &::placeholder {
    color: #8899a6;
  }
`;

const Input = styled.input`
  flex: 1;
  height: 100%;

  background-color: transparent;
`;

const Button = styled.button`
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    border-bottom: 2px solid #1da1f2;
  }

  &:active {
    transform: translateY(0);
  }
`;

const LinkButton = styled(Link)`
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    border-bottom: 2px solid #1da1f2;
  }

  &:active {
    transform: translateY(0);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
