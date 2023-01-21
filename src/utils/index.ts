import { Grade, Term } from "./types";
import { GPAscale } from "./constants";

export const calculateTermGPA = (term: Term) => {
  let totalCredits = 0;
  let totalGrade = 0;
  term.fields.forEach((field) => {
    totalCredits += field.credit;
    totalGrade += field.credit * GPAscale[field.grade];
  });
  return Math.round((totalGrade / totalCredits) * 10) / 10;
};

export const calculateGPA = (
  grade: Grade,
  prevCredit: number,
  prevGrade: number
) => {
  let totalCredits = 0 + prevCredit;
  let totalGrade = 0 + prevGrade;
  grade.terms.forEach((term) => {
    term.fields.forEach((field) => {
      totalCredits += field.credit;
      totalGrade += field.credit * GPAscale[field.grade];
    });
  });
  return Math.round((totalGrade / totalCredits) * 10) / 10;
};
