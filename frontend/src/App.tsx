import { useEffect } from 'react';
import { useAppDispatch, useReduxStore } from './hooks';
import { fetchAvailableCountries, fetchPublicHolidays } from './redux';
import { Calendar } from './components';

function App() {
  const dispatch = useAppDispatch();
  const { calendar, countries } = useReduxStore();

  useEffect(() => {
    dispatch(fetchAvailableCountries());
  }, [dispatch]);

  useEffect(() => {
    if (countries.selectedCountry) {
      dispatch(
        fetchPublicHolidays({
          year: calendar.currentMonth.getFullYear(),
          countryCode: countries.selectedCountry.countryCode,
        }),
      );
    }
  }, [calendar.currentMonth, countries.selectedCountry, dispatch]);

  return (
    <>
      <Calendar />
      <div id="modal" />
    </>
  );
}

export default App;
