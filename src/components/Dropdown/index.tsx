import { Component } from "solid-js";
import { Listbox } from "@headlessui/react";
import { GPAscale, GPAscaleArray, GPAscaleKeys } from "../../utils/constants";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const Dropdown: Component<Props> = ({ value, onChange }) => {
  return (
    <div>
      <Listbox value={value} onChange={onChange}>
        <Listbox.Button>{value}</Listbox.Button>
        <Listbox.Options>
          {GPAscaleArray.map((gpa, i) => (
            <Listbox.Option key={i} value={gpa.interval}>
              {gpa.interval}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default Dropdown;
