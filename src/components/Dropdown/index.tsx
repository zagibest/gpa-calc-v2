import { Component } from "solid-js";
import { GPAscaleArray } from "../../utils/constants";

interface Props {
  value: number;
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: Component<Props> = ({ value, onChange, className }) => {
  return (
    <div class={className}>
      <select
        onChange={(val) => onChange(val.currentTarget.value)}
        value={value}
      >
        {GPAscaleArray.map((gpa) => (
          <option value={gpa.grade}>
            {gpa.interval}/{gpa.letter}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
