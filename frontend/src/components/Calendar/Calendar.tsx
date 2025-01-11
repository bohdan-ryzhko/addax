import { FC } from 'react';
import { CalendarDays } from './parts';
import { useAppDispatch, useReduxStore } from '../../hooks';
import { setCurrentMonth, setSelectedCountry, setSelectedDay } from '../../redux';
import { Dropdown } from '..';
import { months, weekdays } from '../../constants';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import styles from './calendar.module.scss';

const monthsArray = Object.values(months);
const weekdaysArray = Object.values(weekdays);

export const Calendar: FC = () => {
  const { calendar, countries } = useReduxStore();
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

  const dropdownList = countries.data.map(({ countryCode, name }) => ({
    id: countryCode,
    label: name,
  }));

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
          <Dropdown
            list={dropdownList}
            element={item => <p>{item.label}</p>}
            onChange={selectCountry =>
              dispatch(
                setSelectedCountry({
                  countryCode: selectCountry.id,
                  name: selectCountry.label,
                }),
              )
            }
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
