import { FC, useEffect, useRef } from 'react';
import { Calendar, Modal } from '../../components';
import { useAppDispatch, useReduxStore } from '../../hooks';
import {
  fetchAvailableCountries,
  fetchPublicHolidays,
  fetchTasks,
  setSelectedDay,
} from '../../redux';
import { CreateTaskForm } from './parts';

export const CalendarPage: FC = () => {
  const dispatch = useAppDispatch();
  const { calendar, countries } = useReduxStore();
  const previousYearRef = useRef<number | null>(null);
  const previousCountryRef = useRef<string | null>(null);

  useEffect(() => {
    if (countries.data.length > 0) return;

    dispatch(fetchAvailableCountries());
  }, [countries.data.length, dispatch]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

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
      <Modal
        active={Boolean(calendar.selectedDay)}
        setActive={() => dispatch(setSelectedDay(null))}>
        {!countries.selectedCountry && <p>You need to select a country</p>}
        {calendar.selectedDay && countries.selectedCountry && <CreateTaskForm />}
      </Modal>
      <div id="modal" />
    </>
  );
};
