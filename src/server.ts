import { app } from '@src/app';
import dotenv from 'dotenv';
import { Express } from 'express';
import PostgresDB from '@src/database';
import 'reflect-metadata';

dotenv.config();

interface Database {
	connect(): Promise<void>;
}

export class Server {
	constructor(private app: Express, private db: Database) {}

	start() {
		try {
			const PORT = process.env['PORT'] ?? 4500;

			this.app.listen(PORT, () => console.log(`Listening in ${PORT}`));

			this.db.connect();
		} catch ({ message }) {
			console.error(message);
		}
	}
}

const server = new Server(app, PostgresDB);

server.start();
