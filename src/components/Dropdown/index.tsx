import { Component } from "solid-js";
import { GPAscaleArray } from "../../utils/constants";

interface Props {
  value: number;
  onChange: (value: string) => void;
  className?: string;
}

const Dropdown: Component<Props> = ({ value, onChange, className }) => {
  console.log(value, "value received");
  return (
    <div class={className}>
      <select
        class="w-full border border-gray-200 rounded-md p-2"
        onChange={(val) => {
          val.currentTarget.value !== "Select" &&
            onChange(val.currentTarget.value);
        }}
        value={
          //number to string
          value?.toString()
        }
      >
        <option>Select</option>
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
