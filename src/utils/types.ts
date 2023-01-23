export interface Grade {
  terms: Term[];
}

export interface Term {
  fields: Field[];
}

export interface Field {
  credit?: number;
  grade?: number;
}
