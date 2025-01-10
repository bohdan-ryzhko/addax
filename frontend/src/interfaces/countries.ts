import { BaseSliceState } from './base';

export type Country = {
  countryCode: string;
  name: string;
};

export interface CountriesState extends BaseSliceState<Country[]> {
  selectedCountry: Country | null;
}
