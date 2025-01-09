import { FC, useState } from 'react';
import { CalendarDays } from './parts';

import styles from './calendar.module.scss';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const Calendar: FC = () => {
  const [currentDay, setCurrentDay] = useState<Date>(new Date());

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <h2>
          {months[currentDay.getMonth()]} {currentDay.getFullYear()}
        </h2>
      </div>
      <div className={styles.calendarBody}>
        <div className={styles.tableHeader}>
          {weekdays.map(weekday => {
            return (
              <div key={weekday} className={styles.weekday}>
                <p>{weekday}</p>
              </div>
            );
          })}
        </div>
        <CalendarDays
          day={currentDay}
          changeCurrentDay={day => setCurrentDay(new Date(day.year, day.month, day.number))}
        />
      </div>
    </div>
  );
};
