import { FC } from 'react';
import { CalendarDays } from './parts';
import { useAppDispatch, useReduxStore } from '../../hooks';
import { logout, setCurrentMonth, setSelectedDay } from '../../redux';
import { months, weekdays } from '../../constants';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from '../index';

import styles from './calendar.module.scss';

const monthsArray = Object.values(months);
const weekdaysArray = Object.values(weekdays);

export const Calendar: FC = () => {
  const { calendar, auth } = useReduxStore();
  const dispatch = useAppDispatch();

  const currentYear = calendar.currentMonth.getFullYear();

  const handleClickMonth =
    (monthRange = 1) =>
    () => {
      dispatch(
        setCurrentMonth(
          new Date(
            calendar.currentMonth.getFullYear(),
            calendar.currentMonth.getMonth() + monthRange,
            1,
          ),
        ),
      );
    };

  return (
    <>
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <div className={styles.titleWrapper}>
            <div className={styles.arrows}>
              <button className="interactive" onClick={handleClickMonth(-1)}>
                <FaChevronLeft />
              </button>
              <button className="interactive" onClick={handleClickMonth()}>
                <FaChevronRight />
              </button>
            </div>
            <h2>
              {monthsArray[calendar.currentMonth.getMonth()]} {currentYear}
            </h2>
          </div>
          <Button
            loading={auth.loading || auth.refreshing}
            text={'Logout'}
            className={styles.logoutBtn}
            onClick={() => dispatch(logout())}
          />
        </div>
        <div className={styles.calendarBody}>
          <div className={styles.tableHeader}>
            {weekdaysArray.map(weekday => (
              <div key={weekday} className={styles.weekday}>
                <p>{weekday}</p>
              </div>
            ))}
          </div>
          <CalendarDays
            month={calendar.currentMonth}
            changeCurrentDay={day =>
              dispatch(setSelectedDay(new Date(day.year, day.month, day.number)))
            }
          />
        </div>
      </div>
    </>
  );
};
