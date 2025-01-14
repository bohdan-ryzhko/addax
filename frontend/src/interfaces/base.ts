import { routes } from '../constants';

export interface BaseSliceState<T> {
  fetching: boolean;
  data: T;
  error: unknown;
}

export interface BaseResponse<T> {
  data: T;
}

export type UnionFromObject<T extends object> = T[keyof T];

export type RoutesType = (typeof routes)[keyof typeof routes];
