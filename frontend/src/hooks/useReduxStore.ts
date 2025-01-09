import { useSelector } from 'react-redux';
import { RootState } from '../redux';

export const useReduxStore = (): RootState => ({
  countries: useSelector((state: RootState) => state.countries),
});
