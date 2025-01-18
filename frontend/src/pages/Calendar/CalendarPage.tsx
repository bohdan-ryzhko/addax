import { FC, useEffect, useRef } from 'react';
import { Calendar, LoadingScreen, Modal } from '../../components';
import { useAppDispatch, useReduxStore } from '../../hooks';
import { fetchPublicHolidays, fetchTasks, selectTask, setSelectedDay } from '../../redux';
import { TaskForm } from './parts';

export const CalendarPage: FC = () => {
  const dispatch = useAppDispatch();
  const { calendar, auth, projects, tasks } = useReduxStore();
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

  const onCloseModal = () => {
    if (calendar.selectedDay) {
      dispatch(setSelectedDay(null));
    }

    if (tasks.selectedTask) {
      dispatch(selectTask(null));
    }
  };

  return (
    <>
      {tasks.fetching && <LoadingScreen />}
      <Calendar />
      <Modal
        active={Boolean(calendar.selectedDay) || Boolean(tasks.selectedTask)}
        setActive={onCloseModal}>
        {!auth.user && <p>You need to select a country</p>}
        {((calendar.selectedDay && auth.user?.countryCode) || Boolean(tasks.selectedTask)) && (
          <TaskForm />
        )}
      </Modal>
      <div id="modal" />
    </>
  );
};
