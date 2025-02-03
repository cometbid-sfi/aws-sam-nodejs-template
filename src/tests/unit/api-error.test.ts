import { ApiError, isApiError } from '../../models/response/ApiError';
import { REQUEST_METHODS, DEFAULT_MESSAGES, DEFAULT_DETAILS, ErrorDetail } from '../../models/response/ResponseCode';

describe('ApiError', () => {
    const errorDetails: ErrorDetail[] = [
        { field: 'field1', message: 'error message' },
        { field: 'field2', message: 'error message' },
    ];

    describe('constructor', () => {
        it('should create an instance with default values', () => {
            const error = new ApiError();

            expect(error.statusCode).toBe(500);
            expect(error.message).toBe('');
            expect(error.detailMessage).toBe('');
            expect(error.requestMethod).toBeUndefined();
            expect(error.errors).toBeUndefined();
        });

        it('should create an instance with provided values', () => {
            const params = {
                statusCode: 400,
                message: 'Bad Request',
                detailMessage: 'Invalid input',
                requestMethod: REQUEST_METHODS.POST,
                data: errorDetails,
            };

            const error = new ApiError<ErrorDetail[]>(params);

            expect(error.statusCode).toBe(400);
            expect(error.message).toBe('Bad Request');
            expect(error.detailMessage).toBe('Invalid input');
            expect(error.requestMethod).toBe(REQUEST_METHODS.POST);
            expect(error.errors).toEqual(errorDetails);
        });
    });

    describe('static factory methods', () => {
        it('should create badRequest error', () => {
            const error = ApiError.badRequest(REQUEST_METHODS.POST);

            expect(error.statusCode).toBe(400);
            expect(error.message).toBe(DEFAULT_MESSAGES.BAD_REQUEST);
            expect(error.detailMessage).toBe(DEFAULT_DETAILS.BAD_REQUEST);
            expect(error.requestMethod).toBe(REQUEST_METHODS.POST);
        });

        it('should create notFound error', () => {
            const error = ApiError.notFound(REQUEST_METHODS.GET);

            expect(error.statusCode).toBe(404);
            expect(error.message).toBe(DEFAULT_MESSAGES.NOT_FOUND);
            expect(error.detailMessage).toBe(DEFAULT_DETAILS.NOT_FOUND);
            expect(error.requestMethod).toBe(REQUEST_METHODS.GET);
        });

        it('should create unauthorized error', () => {
            const error = ApiError.unauthorized(REQUEST_METHODS.GET);

            expect(error.statusCode).toBe(401);
            expect(error.message).toBe(DEFAULT_MESSAGES.UNAUTHORIZED);
            expect(error.detailMessage).toBe(DEFAULT_DETAILS.UNAUTHORIZED);
            expect(error.requestMethod).toBe(REQUEST_METHODS.GET);
        });

        it('should create forbidden error', () => {
            const customMessage = 'Custom forbidden message';
            const customDetail = 'Custom detail message';
            const error = ApiError.forbidden(REQUEST_METHODS.GET, customMessage, customDetail);

            expect(error.statusCode).toBe(403);
            expect(error.message).toBe(customMessage);
            expect(error.detailMessage).toBe(customDetail);
            expect(error.requestMethod).toBe(REQUEST_METHODS.GET);
        });

        it('should create conflict error', () => {
            const error = ApiError.conflict(REQUEST_METHODS.POST);

            expect(error.statusCode).toBe(409);
            expect(error.message).toBe(DEFAULT_MESSAGES.CONFLICT);
            expect(error.detailMessage).toBe(DEFAULT_DETAILS.CONFLICT);
            expect(error.requestMethod).toBe(REQUEST_METHODS.POST);
        });

        it('should create internalServerError', () => {
            const error = ApiError.internalServerError(REQUEST_METHODS.GET);

            expect(error.statusCode).toBe(503);
            expect(error.message).toBe(DEFAULT_MESSAGES.SERVICE_UNAVAILABLE);
            expect(error.detailMessage).toBe(DEFAULT_DETAILS.SERVICE_UNAVAILABLE);
            expect(error.requestMethod).toBe(REQUEST_METHODS.GET);
        });
    });

    describe('isApiError type guard', () => {
        it('should return true for ApiError instances', () => {
            const error = new ApiError();
            expect(isApiError(error)).toBe(true);
        });

        it('should return false for non-ApiError values', () => {
            expect(isApiError(null)).toBe(false);
            expect(isApiError({})).toBe(false);
            expect(isApiError(new Error())).toBe(false);
        });
    });

    describe('builder pattern', () => {
        it('should create error using builder pattern', () => {
            const error = ApiError.builder()
                .status(400)
                .message('Custom message')
                .detailMessage('Custom detail')
                .requestMethod(REQUEST_METHODS.POST)
                .data(errorDetails)
                .buildErrorMesssage();

            expect(error.statusCode).toBe(400);
            expect(error.message).toBe('Custom message');
            expect(error.detailMessage).toBe('Custom detail');
            expect(error.requestMethod).toBe(REQUEST_METHODS.POST);
            expect(error.errors).toEqual(errorDetails);
        });
    });

    describe('immutability', () => {
        it('should be immutable after creation', () => {
            const message = new ApiError({
                statusCode: 500,
                message: 'Test',
            });

            expect(() => {
                (message as any).statusCode = 503;
            }).toThrow();

            expect(() => {
                (message as any).message = 'Modified';
            }).toThrow();
        });
    });
});
