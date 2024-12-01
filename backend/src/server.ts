import errorHandler from 'errorhandler';
import app from './app';

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}
const PORT = process.env.PORT || 7777;
const ENV = process.env.NODE_ENV || 'development';

/**
 * Start Express server.
 */
app.listen(PORT, () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    PORT,
    ENV,
  );
  console.log('Press CTRL-C to stop\n');
});
