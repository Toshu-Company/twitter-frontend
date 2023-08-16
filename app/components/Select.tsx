import SelectBox from "react-select";
import { useState } from "react";

interface Service {
  label: string;
  value: string;
}

const services: Service[] = [
  {
    value: "twi-videos",
    label: "Twi-Videos",
  },
  {
    value: "twivideo",
    label: "TwiVideo",
  },
  {
    value: "uraakalist",
    label: "UraakaList",
  },
];

export default function Select() {
  const [selected, setSelected] = useState<Service | null>(services[0]);

  return (
    <>
      <SelectBox
        defaultValue={selected}
        onChange={(value) => {
          setSelected(value!);
        }}
        options={services}
        theme={(theme) => ({
          ...theme,
          borderRadius: 8,
          colors: {
            ...theme.colors,
            primary: "#c2c2c2",
            primary25: "gray",
            neutral0: "#202327",
            neutral80: "#c2c2c2",
          },
        })}
        styles={{
          control: (base) => ({
            ...base,
            color: "#c2c2c2",
            border: "none",
            width: "200px",
            fontSize: "16px",
          }),
        }}
      />
    </>
  );
}
