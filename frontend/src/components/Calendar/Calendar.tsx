import { FC, MouseEvent, useEffect, useMemo, useState } from 'react';
import { CalendarDays, CreateProjectForm } from './parts';
import { useAppDispatch, useReduxStore } from '../../hooks';
import {
  deleteProject,
  fetchProjects,
  selectProject,
  setCurrentMonth,
  setSelectedDay,
} from '../../redux';
import { months, weekdays } from '../../constants';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button, Dropdown, Modal } from '../index';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Project } from '../../interfaces';
import classNames from 'classnames';

import styles from './calendar.module.scss';
import { unwrapResult } from '@reduxjs/toolkit';

const monthsArray = Object.values(months);
const weekdaysArray = Object.values(weekdays);

export const Calendar: FC = () => {
  const { calendar, auth, projects } = useReduxStore();
  const dispatch = useAppDispatch();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [deletedProjectModal, setDeletedProjectModal] = useState<Project | null>(null);

  useEffect(() => {
    if (!auth.user) return;

    dispatch(fetchProjects());
  }, [auth.user, dispatch, projects.selectedProject]);

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

  const listDropdownProjects = useMemo(
    () =>
      projects.data.map(project => ({
        id: project.id,
        label: project.name,
      })),
    [projects.data],
  );

  const handleOpenDeleteProjectModal =
    (project: Project) => (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setDeletedProjectModal(project);
    };

  const handleDeleteProject = async () => {
    const response =
      deletedProjectModal &&
      (await dispatch(deleteProject(deletedProjectModal.id)).then(unwrapResult));

    if (response) {
      setDeletedProjectModal(null);
    }
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
          <div className={styles.projectActionsWrapper}>
            <Button
              text={'Create project'}
              className={styles.createProjectBtn}
              onClick={() => setIsCreateProjectModalOpen(true)}
            />
            <Dropdown
              list={listDropdownProjects}
              element={({ label: name, id }) => (
                <div className={styles.projectItem}>
                  <p>{name}</p>
                  <button
                    type="button"
                    className="delete"
                    onClick={handleOpenDeleteProjectModal({ name, id })}>
                    <RiDeleteBin6Line />
                  </button>
                </div>
              )}
              onChange={project =>
                dispatch(
                  selectProject({
                    name: project.label,
                    id: project.id,
                  }),
                )
              }
              label="Select project"
            />
          </div>
        </div>
        {projects.selectedProject !== null ? (
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
        ) : (
          <div className="center full">
            <p>Select the project</p>
          </div>
        )}
      </div>
      <Modal active={isCreateProjectModalOpen} setActive={setIsCreateProjectModalOpen}>
        <CreateProjectForm setIsCreateProjectModalOpen={setIsCreateProjectModalOpen} />
      </Modal>
      <Modal active={Boolean(deletedProjectModal)} setActive={() => setDeletedProjectModal(null)}>
        <div className={styles.deleteProjectModalBody}>
          <p className={styles.deleteTitle}>
            Do you really want to delete a project{' '}
            {deletedProjectModal && <span>{deletedProjectModal.name}</span>}
          </p>
          <div className={styles.deltedActions}>
            <Button
              className={styles.cancelBtn}
              text={'Cancel'}
              onClick={() => setDeletedProjectModal(null)}
            />
            <button
              className={classNames('delete', styles.deleteButton)}
              type="button"
              onClick={handleDeleteProject}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
