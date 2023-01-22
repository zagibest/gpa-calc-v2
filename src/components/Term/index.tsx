import { Component, For } from "solid-js";
import { Grade, Term } from "../../utils/types";
import Dropdown from "../Dropdown";

interface Props {
  value: Term;
  index: number;
  setUserGPA: Function;
  userGPA: Grade;
}

const TermComp: Component<Props> = ({ value, index, setUserGPA, userGPA }) => {
  return (
    <div>
      <h2>Семестр {index + 1}</h2>
      <div class="grid gap-2">
        <For each={value.fields}>
          {(field, i) => (
            <div class="flex">
              <Dropdown
                className="flex-1"
                value={field.grade}
                onChange={(val) => {
                  const newGPA = userGPA;
                  newGPA.terms[index].fields[i()].grade = parseInt(val);
                  setUserGPA(newGPA);
                }}
              />
              <input
                type="number"
                className="flex-1"
                value={field.credit}
                onChange={(val) => {
                  const newGPA = userGPA;
                  newGPA.terms[index].fields[i()].credit = Number(
                    val.currentTarget.value
                  );
                  setUserGPA(newGPA);
                }}
                class="w-full border border-gray-200"
              />
              <button
                class=""
                onClick={() => {
                  const newGPA = userGPA;
                  newGPA.terms[index].fields.splice(i(), 1);
                  setUserGPA(newGPA);
                }}
              >
                X
              </button>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default TermComp;
