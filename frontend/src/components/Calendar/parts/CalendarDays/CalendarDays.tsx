import { FC } from 'react';
import classNames from 'classNames';
import { createCurrentDays } from '../../utils';

import styles from './calendar-days.module.scss';

type Day = {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  selected: boolean;
  year: number;
};

type Props = {
  day: Date;
  changeCurrentDay?: (day: Day) => void;
};

export const CalendarDays: FC<Props> = ({ day, changeCurrentDay }) => {
  const currentDays = createCurrentDays(day);

  return (
    <div className={styles.tableContent}>
      {currentDays.map(day => {
        return (
          <div
            key={day.date.toString()}
            className={classNames(
              styles.calendarDay,
              day.currentMonth ? styles.current : '',
              day.selected ? styles.selected : '',
            )}
            onClick={() => changeCurrentDay && changeCurrentDay(day)}>
            <p>{day.number}</p>
          </div>
        );
      })}
    </div>
  );
};
