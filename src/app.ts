import express from 'express';
import { router } from '@src/routes';
import { appMiddleware } from '@middleware/app';
import { errorHandler } from '@bse-b2c/common';

const app = express();

appMiddleware(app);

app.use(router);
app.use(errorHandler);

export { app };
