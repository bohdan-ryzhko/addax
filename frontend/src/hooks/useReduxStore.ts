import { useSelector } from 'react-redux';
import { RootState } from '../redux';

export const useReduxStore = (): RootState => ({
  auth: useSelector((state: RootState) => state.auth),
  countries: useSelector((state: RootState) => state.countries),
  holidays: useSelector((state: RootState) => state.holidays),
  calendar: useSelector((state: RootState) => state.calendar),
  tasks: useSelector((state: RootState) => state.tasks),
});
