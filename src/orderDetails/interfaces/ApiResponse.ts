interface Error {
	statusCode: number;
	error: string;
	message: string;
}

export interface ApiResponse<T> {
	statusCode: number;
	data: T;
	error: Error | null;
}
