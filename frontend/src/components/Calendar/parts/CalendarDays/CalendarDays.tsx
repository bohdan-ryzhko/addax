import { FC, useCallback, useMemo } from 'react';
import classNames from 'classNames';
import { toast } from 'react-toastify';

import { createCurrentDays } from '../../utils';
import { useReduxStore } from '../../../../hooks';
import { getFormattedDate } from '../../../../utils';

import styles from './calendar-days.module.scss';

const today = new Date();
const formattedToday = getFormattedDate(today);

type Day = {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  today: boolean;
  year: number;
};

type Props = {
  month: Date;
  changeCurrentDay?: (day: Day) => void;
};

export const CalendarDays: FC<Props> = ({ month, changeCurrentDay }) => {
  const { holidays } = useReduxStore();
  const currentDays = createCurrentDays(month);

  const holidaysMap = useMemo(() => {
    const map = new Map<string, string>();

    holidays.data.forEach(holiday => {
      map.set(holiday.date, holiday.name);
    });

    return map;
  }, [holidays.data]);

  const handleDayClick = useCallback(
    (day: Day) => {
      const formattedDay = getFormattedDate(day.date);
      const holidayName = holidaysMap.get(formattedDay);

      if (holidayName) {
        return toast.info('Today is holiday');
      }

      if (changeCurrentDay) {
        return changeCurrentDay(day);
      }
    },
    [changeCurrentDay, holidaysMap],
  );

  return (
    <div className={styles.tableContent}>
      {currentDays.map(day => {
        const currentStyles = day.currentMonth ? styles.current : '';
        const isToday = formattedToday === getFormattedDate(day.date);
        const formattedDay = getFormattedDate(day.date);
        const holidayName = holidaysMap.get(formattedDay);

        return (
          <div
            key={day.date.toString()}
            className={classNames(
              styles.calendarDay,
              holidayName ? styles.disabled : '',
              currentStyles,
            )}
            onClick={() => handleDayClick(day)}>
            <p className={classNames(isToday ? styles.today : '')}>
              {day.number}{' '}
              {holidayName && <span className={styles.holidayName}>{holidayName}</span>}
            </p>
          </div>
        );
      })}
    </div>
  );
};
