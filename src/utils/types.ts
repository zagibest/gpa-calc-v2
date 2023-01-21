export interface Grade {
  terms: Term[];
}

export interface Term {
  id: number;
  fields: Field[];
}

export interface Field {
  id: number;
  credit?: number;
  grade?: string;
}
