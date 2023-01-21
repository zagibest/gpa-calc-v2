import { Component, createSignal, For } from "solid-js";
import { initialGrade } from "../../utils/constants";
import { Grade } from "../../utils/types";
import TermComp from "../Term";

const Calculator: Component = () => {
  const [userGPA, setUserGPA] = createSignal<Grade>(initialGrade);
  return (
    <div class="w-full rounded-lg bg-white p-4 ">
      <h1 class="text-xl font-bold">Голч</h1>
      <div class="grid gap-4">
        <For each={userGPA().terms}>
          {(term, index) => <TermComp value={term} index={index()} />}
        </For>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  );
};

export default Calculator;
