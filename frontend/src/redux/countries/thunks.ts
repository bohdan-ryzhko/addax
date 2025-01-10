/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { Country } from '../../interfaces';
import { nagerDateConfig } from '../../lib';

const AvailableCountriesEndpoints = {
  api: '/api',
  v3: 'v3',
  availableCountries() {
    return `${this.api}/${this.v3}/AvailableCountries`;
  },
  nextPublicHolidaysWorldwide() {
    return `${this.api}/${this.v3}/NextPublicHolidaysWorldwide`;
  },
};

export const fetchAvailableCountries = createAsyncThunk<Country[]>(
  'fetch/availableCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<Country[]> = await nagerDateConfig.get(
        AvailableCountriesEndpoints.availableCountries(),
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
