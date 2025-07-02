import { Country } from "./country.interface";
import { State } from "./state.interface";

export interface User {
  id: number;
  name: string;
  lastname: string;
  age: number;
  country: Country;
  state: State;
};
