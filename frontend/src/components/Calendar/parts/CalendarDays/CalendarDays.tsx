import { FC } from 'react';
import classNames from 'classNames';
import { createCurrentDays } from '../../utils';

import styles from './calendar-days.module.scss';
import { useReduxStore } from '../../../../hooks';

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

  console.log('holidays', holidays);

  const currentYear = new Date(month.getFullYear(), month.getMonth(), 1).getFullYear();

  console.log('currentYear', currentYear);

  return (
    <div className={styles.tableContent}>
      {currentDays.map(day => {
        const currentStyles = day.currentMonth ? styles.current : '';

        return (
          <div
            key={day.date.toString()}
            className={classNames(styles.calendarDay, currentStyles)}
            onClick={() => changeCurrentDay && changeCurrentDay(day)}>
            <p>{day.number}</p>
          </div>
        );
      })}
    </div>
  );
};
