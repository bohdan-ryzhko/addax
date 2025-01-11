import { BaseSliceState } from './base';

export type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  global: boolean;
  counties: string[];
  launchYear: number | null;
  types: string[];
};

export interface HolidaysState extends BaseSliceState<Holiday[]> {}
