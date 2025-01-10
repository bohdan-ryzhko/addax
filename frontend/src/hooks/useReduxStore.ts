import { useSelector } from 'react-redux';
import { RootState } from '../redux';

export const useReduxStore = (): RootState => ({
  countries: useSelector((state: RootState) => state.countries),
  holidays: useSelector((state: RootState) => state.holidays),
  calendar: useSelector((state: RootState) => state.calendar),
});
