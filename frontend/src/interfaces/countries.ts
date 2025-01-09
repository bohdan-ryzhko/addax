import { BaseSliceState } from './base';

export type Country = {
  key: string;
};

export type CountriesState = BaseSliceState<Country[]>;
