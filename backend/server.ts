import app from './app';
import mongoose from 'mongoose';

const port = 4000;

const { DB_URL = '' } = process.env;

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Database connection successful, listening: http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
