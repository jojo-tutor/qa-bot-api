import mongoose from 'mongoose';
import logger from 'utils/logger';

const database = ({ onSuccess }) => {
  const dbOptions = { useNewUrlParser: true };
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, dbOptions)
    .then(() => {
      logger.info('Successfully connected to database', 'mongoose');
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch(err => logger.error(err.message, 'mongoose'));

  return mongoose;
};

export default database;
