"use client";

import { useCallback, useState } from "react";
import { styled } from "styled-components";
import Default from "./Modal/Default";
import Link from "next/link";
import Image from "./Image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Settings from "./Settings";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <Wrapper>
        <Container>
          <Link href={"/"}>
            <Image
              src={require("@/public/images/twitter.svg")}
              width={[40, { responsive: 768, size: 32 }]}
              alt="Twitter"
              responsive
            />
          </Link>
          <Row>
            <Search>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />
              <Button
                onClick={() =>
                  router.push(
                    pathname + "?" + createQueryString("search", search)
                  )
                }
              >
                <Image
                  src={require("@/public/images/search.svg")}
                  width={[20, { responsive: 768, size: 16 }]}
                  alt="Search"
                  responsive
                />
              </Button>
            </Search>
            <Button onClick={() => setModal(true)}>
              <Image
                src={require("@/public/images/setting.svg")}
                width={[24, { responsive: 768, size: 20 }]}
                alt="Setting"
                responsive
              />
            </Button>
            <LinkButton href={"/favorites"}>
              <Image
                src={require("@/public/images/heart.svg")}
                width={[24, { responsive: 768, size: 20 }]}
                alt="Favorites"
                responsive
              />
            </LinkButton>
          </Row>
        </Container>
      </Wrapper>
      {modal && <Settings.Default close={() => setModal(false)} />}
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #1e1e1e;

  position: fixed;
  top: 0;
  left: 0;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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

  @media (max-width: 768px) {
    width: 150px;
    height: 30px;

    font-size: 14px;
  }
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  min-width: 0;

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

  @media (max-width: 768px) {
    gap: 10px;
  }
`;
