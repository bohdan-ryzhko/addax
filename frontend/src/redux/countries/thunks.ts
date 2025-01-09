/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { Country } from '../../interfaces';

const AvailableCountriesEndpoints = {
  base: 'api',
  v3: 'v3',
  availableCountries() {
    return `/${this.base}/${this.v3}/AvailableCountries`;
  },
};

export const fetchAvailableCountries = createAsyncThunk<Country[]>(
  'fetch/availableCountries',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<Country[]> = await axios.get(
        AvailableCountriesEndpoints.availableCountries(),
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);
