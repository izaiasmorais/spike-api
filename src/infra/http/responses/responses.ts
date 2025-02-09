export const defaultHttpErrorResponse = (error: string) => {
	return {
		success: false,
		error,
		data: null,
	};
};

export const defaultSuccessResponse = (data?: unknown) => {
	return {
		success: true,
		error: null,
		data: data || null,
	};
};
