import { Grade, Term } from "./types";
import { GPAscale } from "./constants";

export const calculateTermGPA = (term: Term) => {
  let totalCredits = 0;
  let totalGrade = 0;
  term.fields.forEach((field) => {
    if (field.credit && field.grade) {
      totalCredits += field.credit;
      totalGrade += field.grade * field.credit;
    }
  });
  return Math.round((totalGrade / totalCredits) * 10) / 10;
};

export const calculateGPA = (
  grade: Grade,
  prevCredit?: number,
  prevGrade?: number
) => {
  let totalCredits = 0 + (prevCredit || 0);
  let totalGrade = 0 + (prevGrade || 0);
  grade.terms.forEach((term) => {
    term.fields.forEach((field) => {
      if (field.credit && field.grade) {
        totalCredits += field.credit;
        totalGrade += field.grade * field.credit;
      }
    });
  });
  console.log(totalGrade, totalCredits);
  return Math.round((totalGrade / totalCredits) * 10) / 10;
};
