"use client";

import { styled } from "styled-components";
import Modal from ".";
import { useState } from "react";

type Props = {
  close: () => void;
};

export default function Settings({ close }: Props) {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <>
      <Modal.Default close={close}>
        <Wrapper>
          <Category>Category 1</Category>
          <ToggleWrapper>
            <ToggleLabel>Toggle</ToggleLabel>
            <ToggleSwitch onClick={handleToggle}>
              <SwitchInput type="checkbox" checked={isOn} />
              <SwitchSlider />
            </ToggleSwitch>
          </ToggleWrapper>
          <Splitter />
          <Category>Category 2</Category>
          <ToggleWrapper>
            <ToggleLabel>Toggle</ToggleLabel>
            <ToggleSwitch onClick={handleToggle}>
              <SwitchInput type="checkbox" checked={isOn} />
              <SwitchSlider />
            </ToggleSwitch>
          </ToggleWrapper>
        </Wrapper>
      </Modal.Default>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Splitter = styled.div`
  width: 100%;
  height: 1px;
  background-color: #696969;
  margin: 16px 0;
`;

const Category = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const ToggleLabel = styled.div`
  margin-right: 16px;
  font-size: 28px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  ${SwitchInput}:checked + & {
    background-color: #2196f3;
  }

  ${SwitchInput}:checked + &:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 60px;
  height: 34px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
