import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';

export const appMiddleware = (app: Express) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors());
	app.use(morgan('dev'));
};
