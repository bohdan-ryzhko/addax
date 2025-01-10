import { useEffect, useRef } from 'react';
import { useAppDispatch, useReduxStore } from './hooks';
import { fetchAvailableCountries, fetchPublicHolidays } from './redux';
import { Calendar } from './components';

function App() {
  const dispatch = useAppDispatch();
  const { calendar, countries } = useReduxStore();
  const previousYearRef = useRef<number | null>(null);
  const previousCountryRef = useRef<string | null>(null);

  useEffect(() => {
    if (countries.data.length > 0) return;

    dispatch(fetchAvailableCountries());
  }, [countries.data.length, dispatch]);

  useEffect(() => {
    const currentYear = calendar.currentMonth.getFullYear();
    const currentCountryCode = countries.selectedCountry?.countryCode || null;

    if (
      currentCountryCode &&
      (currentYear !== previousYearRef.current || currentCountryCode !== previousCountryRef.current)
    ) {
      dispatch(
        fetchPublicHolidays({
          year: currentYear,
          countryCode: currentCountryCode,
        }),
      );

      previousYearRef.current = currentYear;
      previousCountryRef.current = currentCountryCode;
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
