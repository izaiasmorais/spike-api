export interface DefaultSuccessResponse<T> {
	success: true;
	error: null;
	data: T;
}

export interface DefaultErrorResponse {
	success: false;
	error: string;
	data: null;
}
