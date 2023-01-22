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
  });

  const studentGPA = createMemo(() => {
    console.log(calculateGPA(userGPA()));
    return calculateGPA(userGPA());
  });

  return (
    <div class="w-full rounded-lg bg-white p-4 ">
      <h1 class="text-xl font-bold">Голч</h1>
      <div class="grid gap-4">
        <For each={userGPA().terms}>
          {(term, index) => (
            <div>
              <h2>Семестр {index() + 1}</h2>
              <div class="grid gap-2">
                <For each={term.fields}>
                  {(field, i) => (
                    <div class="flex">
                      <Dropdown
                        className="flex-1"
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
                                      return { ...field, grade: parseInt(val) };
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
                        className="flex-1"
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
                                        credit: Number(val.currentTarget.value),
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
                        class=""
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
      <div>
        <p>{studentGPA()}</p>
      </div>
    </div>
  );
};

export default Calculator;
