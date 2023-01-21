import { Component } from "solid-js";
import { Listbox } from "@headlessui/react";
import { GPAscale, GPAscaleArray, GPAscaleKeys } from "../../utils/constants";
import { Term } from "../../utils/types";

interface Props {
  value: Term;
  index: number;
  //   onChange: () => void;
}

const TermComp: Component<Props> = ({ value, index }) => {
  console.log(value);
  return <div>{index}</div>;
};

export default TermComp;
