import { FaRegularSquarePlus, FaRegularTrashCan, FaRegularRectangleXmark } from "solid-icons/fa";
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
    <div class="w-full relative">
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
              <div class="grid grid-cols-2 gap-2">
              <button
                    class="hover:bg-green-500 hover:text-white py-2 px-3 rounded-lg flex items-center gap-2 text-gray-500 bg-gray-200"
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
                                },
                              ],
                            };
                          return term;
                        }),
                      };
                      setUserGPA(newGPA);
                    }}
                  >
                    <FaRegularSquarePlus size={18} />
                  </button>
                  <button
                    class="col-span-1 hover:bg-red-500 hover:text-white rounded-md p-2 text-gray-500 bg-gray-200"
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
                    <FaRegularRectangleXmark class="mx-auto" />
                  </button>
              </div>
                  
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
                                          grade: val,
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
                          class="col-span-1 hover:bg-red-500 hover:text-white rounded-md text-gray-500 bg-gray-200"
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
                <div class="border-t border-t-gray-200 my-4 w-full" />
                
              </div>
            )}
          </For>
        </div>
        <div class="w-full bg-white shadow rounded-lg p-4 flex-1 max-h-48 sticky top-10 left-0">
          <div class="w-full flex justify-center items-center">
            <div class="p-4 bg-green-500 text-white rounded-full font-bold text-4xl h-32 w-32 flex justify-center items-center border-2 border-gray-200">
              <div class='flex justify-center items-center flex-col'>
                <h2 class="font-bold text-sm">Нийт голч</h2>
                <p>{studentGPA() ? studentGPA() : " "}</p>
              </div>
            </div> 
          </div>
         <div>
          <button
              class="bg-green-500 text-white py-2 px-3 rounded-lg flex items-center gap-2"
              onClick={() => addTerm()}
            >
              Улирал нэмэх <FaRegularSquarePlus size={18} />
            </button>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
