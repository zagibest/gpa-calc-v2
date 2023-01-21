export const GPAscale = {
  "95-100": {
    grade: 4.0,
    letter: "A+",
    interval: "95-100",
  },
  "90-94": {
    grade: 3.7,
    letter: "A",
    interval: "90-94",
  },
  "87-89": {
    grade: 3.3,
    letter: "B+",
    interval: "87-89",
  },
  "83-86": {
    grade: 3.0,
    letter: "B",
    interval: "83-86",
  },
  "80-82": {
    grade: 2.7,
    letter: "B",
    interval: "80-82",
  },
  "77-79": {
    grade: 2.3,
    letter: "C+",
    interval: "77-79",
  },
  "73-76": {
    grade: 2.0,
    letter: "C",
    interval: "73-76",
  },
  "70-72": {
    grade: 1.7,
    letter: "C",
    interval: "70-72",
  },
  "65-69": {
    grade: 1.3,
    letter: "D",
    interval: "65-69",
  },
  "60-64": {
    grade: 1.0,
    letter: "D",
    interval: "60-64",
  },
  "0-59": {
    grade: 0,
    letter: "F",
    interval: "0-59",
  },
};

export const GPAscaleKeys = Object.keys(GPAscale);

export const GPAscaleArray = Object.values(GPAscale);

export const initialGrade = {
  terms: [
    {
      id: 1,
      fields: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ],
    },
  ],
};
