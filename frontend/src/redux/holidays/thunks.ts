/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { Holiday } from '../../interfaces';
import { nagerDateConfig } from '../../lib';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils';

const HolidaysEndpoints = {
  api: 'api',
  v3: 'v3',
  publicHolidays(year: number, countryCode: string) {
    return `${this.api}/${this.v3}/PublicHolidays/${year}/${countryCode}`;
  },
};

export const fetchPublicHolidays = createAsyncThunk<
  Holiday[],
  { year: number; countryCode: string }
>('fetch/publicHolidays', async ({ year, countryCode }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<Holiday[]> = await nagerDateConfig.get(
      HolidaysEndpoints.publicHolidays(year, countryCode),
    );

    return response.data;
  } catch (error: any) {
    toast.error(getErrorMessage(error));
    return rejectWithValue(error);
  }
});
