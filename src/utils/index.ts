import { Grade, Term } from "./types";
import { GPAscale } from "./constants";

export const calculateTermGPA = (term: Term) => {
  let totalCredits = 0;
  let totalGrade = 0;
  term.fields.forEach((field) => {
    if (field.credit && field.grade) {
      totalCredits += field.credit;
      totalGrade += GPAscale[field.grade].grade * field.credit;
    }
  });
  return Math.round((totalGrade / totalCredits) * 10) / 10;
};

export const calculateGPA = (
  grade: Grade,
  prevCredit?: number,
  prevGrade?: number
) => {
  let totalCredits = 0 + prevCredit;
  let totalGrade = 0 + prevGrade;
  grade.terms.forEach((term) => {
    const termGPA = calculateTermGPA(term);
    totalCredits += term.fields.reduce((acc, field) => acc + field.credit, 0);
    totalGrade +=
      termGPA * term.fields.reduce((acc, field) => acc + field.credit, 0);
  });
  return Math.round((totalGrade / totalCredits) * 10) / 10;
};
