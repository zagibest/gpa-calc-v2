import { FaRegularSquarePlus, FaRegularTrashCan } from "solid-icons/fa";
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

  const addTerm = () => {
    const newGPA = {
      ...userGPA(),
      terms: [
        ...userGPA().terms,
        {
          fields: [{}],
        },
      ],
    };
    setUserGPA(newGPA);
  };

  return (
    <div class="w-full">
      {/* <h1 class="text-xl font-bold">Голч</h1> */}
      <div class="w-full flex gap-5 relative">
        <div class="grid gap-4 bg-white shadow p-4 rounded-lg flex-1">
          <For each={userGPA().terms}>
            {(term, index) => (
              <div>
                <div class="flex justify-between items-center pb-4">
                  <h2 class=" text-2xl font-bold mb-4">
                    Семестр {index() + 1}
                  </h2>

                  <button
                    class="col-span-1 bg-red-500 text-white rounded-md p-2"
                    onClick={() => {
                      const newGPA = {
                        ...userGPA(),
                        terms: userGPA().terms.filter(
                          (_, ind) => ind !== index()
                        ),
                      };
                      setUserGPA(newGPA);
                    }}
                  >
                    <FaRegularTrashCan class="mx-auto" />
                  </button>
                </div>
                <div class="grid gap-4">
                  <For each={term.fields}>
                    {(field, i) => (
                      <div class="grid grid-cols-9 gap-2">
                        <Dropdown
                          className="col-span-4"
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
                          className="col-span-4 rounded-md p-2"
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
                          <FaRegularTrashCan class="mx-auto" />
                        </button>
                      </div>
                    )}
                  </For>
                </div>
                <div>
                  <button
                    class="bg-green-500 text-white py-2 px-3 rounded-lg flex items-center gap-2"
                    onClick={() => {
                      const newGPA = {
                        ...userGPA(),
                        terms: userGPA().terms.map((term, idx) => {
                          if (idx === index())
                            return {
                              ...term,
                              fields: [
                                ...term.fields,
                                {
                                  grade: 0,
                                  credit: 0,
                                },
                              ],
                            };
                          return term;
                        }),
                      };
                      setUserGPA(newGPA);
                    }}
                  >
                    Хичээл нэмэх <FaRegularSquarePlus size={18} />
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>
        <div class="w-full bg-white shadow rounded-lg p-4 sticky flex-1 max-h-64">
          <h2 class="font-bold text-2xl">Нийт голч</h2>
          <p>{studentGPA() && studentGPA()}</p>
          <button
            class="bg-green-500 text-white py-2 px-3 rounded-lg flex items-center gap-2"
            onClick={() => addTerm()}
          >
            Улирал нэмэх <FaRegularSquarePlus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
