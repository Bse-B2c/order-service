import { NextFunction, Request, Response } from 'express';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { verify } from 'jsonwebtoken';

export const verifyRoles =
	(roles?: Array<number>) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			const userRoles = req.user?.roles;
			const containsRoles = roles?.some(e => userRoles?.includes(e));

			if (!containsRoles)
				throw new HttpException({
					statusCode: HttpStatusCode.FORBIDDEN,
					message: 'Access denied',
				});

			next();
		} catch (e) {
			next(e);
		}
	};

export const ensureAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authToken = req.headers.authorization;

		if (!authToken) {
			throw new HttpException({
				statusCode: HttpStatusCode.UNAUTHORIZED,
				message: 'Token is missing',
			});
		}

		const [, token] = authToken.split(' ');

		verify(token, process.env['SECRET'] ?? 'secret', (error, decoded: any) => {
			if (error)
				throw new HttpException({
					statusCode: HttpStatusCode.UNAUTHORIZED,
					message: 'Token invalid',
				});

			if (decoded)
				req.user = { name: decoded.name, roles: decoded.roles, id: decoded.id };
		});

		next();
	} catch (e) {
		next(e);
	}
};
