import { FC, useCallback, useMemo } from 'react';
import classNames from 'classNames';
import { toast } from 'react-toastify';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { GoPlus } from 'react-icons/go';

import { createCurrentDays } from '../../utils';
import { useAppDispatch, useReduxStore } from '../../../../hooks';
import { getFormattedDate } from '../../../../utils';
import { Task } from '../../../../interfaces';

import styles from './calendar-days.module.scss';
import { updateDndTasksById, updateTaskById } from '../../../../redux';

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
  const { holidays, tasks, countries } = useReduxStore();
  const dispatch = useAppDispatch();
  const currentDays = createCurrentDays(month);

  const holidaysMap = useMemo(() => {
    const map = new Map<string, string>();

    holidays.data.forEach(holiday => {
      map.set(holiday.date, holiday.name);
    });

    return map;
  }, [holidays.data]);

  const tasksMap = useMemo(() => {
    const map = new Map<string, Task[]>();

    tasks.data.forEach(task => {
      const formattedTaskDate = task.date;
      const existingTasks = map.get(formattedTaskDate) || [];
      map.set(formattedTaskDate, [...existingTasks, task]);
    });

    return map;
  }, [tasks.data]);

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

  const handleDragEnd = (result: DropResult) => {
    console.log('result', result);
    if (!countries.selectedCountry?.countryCode) return;

    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceDate = source.droppableId;
    const destDate = destination.droppableId;

    const sourceTasks = Array.from(tasksMap.get(sourceDate) || []);
    const destTasks = Array.from(tasksMap.get(destDate) || []);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceDate === destDate) {
      sourceTasks.splice(destination.index, 0, movedTask);
      tasksMap.set(sourceDate, sourceTasks);
    } else {
      destTasks.splice(destination.index, 0, movedTask);
      tasksMap.set(sourceDate, sourceTasks);
      tasksMap.set(destDate, destTasks);
    }

    dispatch(
      updateDndTasksById({
        id: result.draggableId,
        order: result.destination.index,
      }),
    );

    dispatch(
      updateTaskById({
        id: result.draggableId,
        date: result.destination.droppableId,
        order: result.destination.index,
        countryCode: countries.selectedCountry.countryCode,
        reason: result.reason,
      }),
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.tableContent}>
        {currentDays.map(day => {
          const currentStyles = day.currentMonth ? styles.current : '';
          const isToday = formattedToday === getFormattedDate(day.date);
          const formattedDay = getFormattedDate(day.date);
          const holidayName = holidaysMap.get(formattedDay);
          const tasksList = tasksMap.get(formattedDay);

          return (
            <div
              key={day.date.toString()}
              className={classNames(
                styles.calendarDay,
                holidayName ? styles.disabled : '',
                currentStyles,
              )}>
              <div className={styles.cardTop}>
                <p className={classNames(isToday ? styles.today : '')}>
                  {day.number}{' '}
                  {holidayName && <span className={styles.holidayName}>{holidayName}</span>}
                </p>
                <button
                  className={classNames(
                    'interactive',
                    styles.createTask,
                    holidayName ? styles.disabled : '',
                  )}
                  type="button"
                  onClick={() => handleDayClick(day)}>
                  <GoPlus size="1rem" />
                </button>
              </div>
              <Droppable droppableId={formattedDay}>
                {provided => (
                  <ul
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.tasksList}>
                    {tasksList &&
                      [...tasksList]
                        .sort((a, b) => a.order - b.order)
                        .map((task, index) => (
                          <Draggable
                            isDragDisabled={!countries.selectedCountry}
                            key={task.id}
                            draggableId={task.id}
                            index={index}>
                            {provided => (
                              <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className={styles.taskItem}>
                                <p className={styles.description}>{task.description}</p>
                              </li>
                            )}
                          </Draggable>
                        ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
