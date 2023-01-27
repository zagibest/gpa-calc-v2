import { Component } from "solid-js";
import { GPAscaleArray } from "../../utils/constants";

interface Props {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const Dropdown: Component<Props> = ({ value, onChange, className }) => {
  console.log(GPAscaleArray, "array");
  return (
    <div class={className}>
      <select
        class="w-full border border-gray-200 rounded-md p-2"
        onChange={(val) => {
          const grade = GPAscaleArray.find((e) => e.interval === val.currentTarget.value).grade;
          grade ? onChange(grade) : onChange(undefined);
        }}
        value={
          GPAscaleArray.find((e) => e.grade === value)?.interval
        }
      >
        {GPAscaleArray.map((gpa) => (
          <option value={gpa.interval} >
            {gpa.interval}/{gpa.letter}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
