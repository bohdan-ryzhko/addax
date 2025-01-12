export interface BaseSliceState<T> {
  fetching: boolean;
  data: T;
  error: unknown;
}

export interface BaseSliceStateWithCreate<T> extends BaseSliceState<T> {
  creating: boolean;
}

export interface BaseResponse<T> {
  data: T;
}

export type UnionFromObject<T extends object> = T[keyof T];
