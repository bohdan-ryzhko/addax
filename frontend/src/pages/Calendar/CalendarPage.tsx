import { FC, useEffect, useRef } from 'react';
import { Calendar, Modal } from '../../components';
import { useAppDispatch, useReduxStore } from '../../hooks';
import { fetchPublicHolidays, fetchTasks, setSelectedDay } from '../../redux';
import { CreateTaskForm } from './parts';

export const CalendarPage: FC = () => {
  const dispatch = useAppDispatch();
  const { calendar, auth, projects } = useReduxStore();
  const previousYearRef = useRef<number | null>(null);
  const previousCountryRef = useRef<string | null>(null);

  useEffect(() => {
    if (!projects.selectedProject) return;

    dispatch(fetchTasks(projects.selectedProject.id));
  }, [dispatch, projects.selectedProject]);

  useEffect(() => {
    const currentYear = calendar.currentMonth.getFullYear();
    const currentCountryCode = auth.user?.countryCode || null;

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
  }, [calendar.currentMonth, auth.user, dispatch]);

  return (
    <>
      <Calendar />
      <Modal
        active={Boolean(calendar.selectedDay)}
        setActive={() => dispatch(setSelectedDay(null))}>
        {!auth.user && <p>You need to select a country</p>}
        {calendar.selectedDay && auth.user?.countryCode && <CreateTaskForm />}
      </Modal>
      <div id="modal" />
    </>
  );
};
