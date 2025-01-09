import { useEffect } from 'react';
import { useAppDispatch, useReduxStore } from './hooks';
import { fetchAvailableCountries } from './redux';
import { Calendar } from './components';

function App() {
  const dispatch = useAppDispatch();
  const { countries } = useReduxStore();

  console.log('countries', countries);

  useEffect(() => {
    dispatch(fetchAvailableCountries());
  }, [dispatch]);

  return <Calendar />;
}

export default App;
