import { FC, useEffect, useMemo } from 'react';
import { useAppDispatch, useReduxStore } from '../../hooks';
import { Dropdown, LoadingScreen } from '../../components';
import { fetchAvailableCountries, updateUserInfo } from '../../redux';

import styles from './settings.module.scss';

export const SettingsPage: FC = () => {
  const { countries, auth } = useReduxStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAvailableCountries());
  }, [dispatch]);

  const countriesOptions = useMemo(
    () =>
      countries.data.map(country => ({
        id: country.countryCode,
        label: country.name,
      })),
    [countries.data],
  );

  const findSelectedCountry = useMemo(
    () => countries.data.find(country => country.countryCode === auth.user?.countryCode),
    [auth.user?.countryCode, countries.data],
  );

  return (
    <>
      {auth.loading && <LoadingScreen />}
      <div className={styles.settingsWrapper}>
        <Dropdown
          list={countriesOptions}
          element={item => <p className="interactive">{item.label}</p>}
          value={
            findSelectedCountry !== undefined
              ? {
                  id: findSelectedCountry.countryCode,
                  label: findSelectedCountry.name,
                }
              : undefined
          }
          onChange={country => {
            dispatch(
              updateUserInfo({
                countryCode: country.id,
              }),
            );
          }}
        />
      </div>
    </>
  );
};
