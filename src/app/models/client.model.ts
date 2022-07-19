export enum Genre {
  MASCULINE = 'Masculine',
  FEMALE = 'Female',
  OTHERS = 'others',
}

export interface Client {
  sequence: number;
  cpf: number;
  name: string;
  age: number;
  genre: Genre;
  otherGenre?: string;
  height: number;
}
