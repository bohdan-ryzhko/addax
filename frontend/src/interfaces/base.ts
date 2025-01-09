export interface BaseSliceState<T> {
  loading: boolean;
  data: T;
  error: unknown;
}

export interface BaseResponse<T> {
  data: T;
}
