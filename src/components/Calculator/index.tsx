import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
} from "solid-js";
import { calculateGPA } from "../../utils";
import { initialGrade } from "../../utils/constants";
import { Grade } from "../../utils/types";
import Dropdown from "../Dropdown";

const Calculator: Component = () => {
  const [userGPA, setUserGPA] = createSignal<Grade>(initialGrade);

  createEffect(() => {
    console.log(userGPA(), "userGPA");
    console.log(calculateGPA(userGPA()));
  });

  const studentGPA = createMemo(() => {
    return calculateGPA(userGPA());
  });

  return (
    <div class="w-full">
      {/* <h1 class="text-xl font-bold">Голч</h1> */}
      <div class="w-full grid grid-cols-2 gap-5 relative">
        <div class="grid gap-4 bg-white shadow p-4 rounded-lg">
          <For each={userGPA().terms}>
            {(term, index) => (
              <div>
                <h2 class=" text-2xl font-bold mb-4">Семестр {index() + 1}</h2>
                <div class="grid gap-4">
                  <For each={term.fields}>
                    {(field, i) => (
                      <div class="grid grid-cols-7 gap-2">
                        <Dropdown
                          className="col-span-3"
                          value={field.grade}
                          onChange={(val) => {
                            const newGPA = {
                              ...userGPA(),
                              terms: userGPA().terms.map((term, idx) => {
                                if (idx === index())
                                  return {
                                    ...term,
                                    fields: term.fields.map((field, ind) => {
                                      if (ind === i())
                                        return {
                                          ...field,
                                          grade: parseInt(val),
                                        };
                                      return field;
                                    }),
                                  };
                                return term;
                              }),
                            };
                            setUserGPA(newGPA);
                          }}
                        />
                        <input
                          type="number"
                          className="col-span-3 rounded-md p-2"
                          value={field.credit}
                          onChange={(val) => {
                            const newGPA = {
                              ...userGPA(),
                              terms: userGPA().terms.map((term, idx) => {
                                if (idx === index())
                                  return {
                                    ...term,
                                    fields: term.fields.map((field, ind) => {
                                      if (ind === i())
                                        return {
                                          ...field,
                                          credit: parseInt(
                                            val.currentTarget.value
                                          ),
                                        };
                                      return field;
                                    }),
                                  };
                                return term;
                              }),
                            };
                            setUserGPA(newGPA);
                          }}
                          class="w-full border border-gray-200"
                        />
                        <button
                          class="col-span-1 bg-red-500 text-white rounded-md"
                          onClick={() => {
                            const newGPA = {
                              ...userGPA(),
                              terms: userGPA().terms.map((term, idx) => {
                                if (idx === index())
                                  return {
                                    ...term,
                                    fields: term.fields.filter(
                                      (_, ind) => ind !== i()
                                    ),
                                  };
                                return term;
                              }),
                            };
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
            )}
          </For>
        </div>
        <div class="w-full bg-white shadow rounded-lg p-4 sticky">
          <p>{studentGPA() && studentGPA()}</p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
