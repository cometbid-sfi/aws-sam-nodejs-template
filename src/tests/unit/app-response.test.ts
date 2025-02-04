import { AppResponseImpl } from '../../models/response/AppResponse';
import {
    DEFAULT_DETAILS,
    DEFAULT_MESSAGES,
    ErrorDetail,
    REQUEST_METHODS,
    ResponseCode,
} from '../../models/response/ResponseCode';

describe('AppResponseImpl', () => {
    // Test data
    const mockData = { id: '1', type: 'MOVIE' };

    const errorDetails: ErrorDetail[] = [
        { field: 'field1', message: 'error message' },
        { field: 'field2', message: 'error message' },
    ];

    describe('createAppResponse', () => {
        describe('Success cases', () => {
            it('should create a successful read response', () => {
                const response = AppResponseImpl.createAppResponse(
                    {
                        requestMethod: REQUEST_METHODS.GET,
                        data: mockData,
                    },
                    ResponseCode.RESOURCE_READ_SUCCESS_CODE,
                );

                expect(response.success).toBe(true);
                expect(response.status).toBe('SUCCESS');
                expect(response.apiResponse).toBeDefined();

                expect(response.apiResponse.message).toBeDefined();
                expect(response.apiResponse.detailMessage).toBeDefined();
                expect(response.apiResponse.data).toBeDefined();
                expect(response.apiResponse.requestMethod).toBeDefined();
                expect(response.apiResponse.statusCode).toBeDefined();

                expect(response.apiResponse.detailMessage).toBe(DEFAULT_DETAILS.SUCCESS);
                expect(response.apiResponse.data).toBe(mockData);
                expect(response.apiResponse.message).toBe(DEFAULT_MESSAGES.SUCCESS);
                expect(response.apiResponse.statusCode).toBe(200);
                expect(response.apiResponse.requestMethod).toBe(REQUEST_METHODS.GET);
            });

            it('should create a successful create response', () => {
                const response = AppResponseImpl.createAppResponse(
                    {
                        requestMethod: REQUEST_METHODS.POST,
                        data: mockData,
                    },
                    ResponseCode.RESOURCE_CREATED_CODE,
                );

                expect(response.success).toBe(true);
                expect(response.status).toBe('SUCCESS');
                expect(response.apiResponse).toBeDefined();

                expect(response.apiResponse.message).toBeDefined();
                expect(response.apiResponse.detailMessage).toBeDefined();
                expect(response.apiResponse.data).toBeDefined();
                expect(response.apiResponse.requestMethod).toBeDefined();
                expect(response.apiResponse.statusCode).toBeDefined();

                expect(response.apiResponse.detailMessage).toBe(DEFAULT_DETAILS.CREATED);
                expect(response.apiResponse.data).toBe(mockData);
                expect(response.apiResponse.message).toBe(DEFAULT_MESSAGES.CREATED);
                expect(response.apiResponse.statusCode).toBe(201);
                expect(response.apiResponse.requestMethod).toBe(REQUEST_METHODS.POST);
            });

            it('should create a successful update response', () => {
                const response = AppResponseImpl.createAppResponse(
                    {
                        requestMethod: REQUEST_METHODS.PUT,
                        data: mockData,
                    },
                    ResponseCode.RESOURCE_UPDATED_CODE,
                );

                expect(response.success).toBe(true);
                expect(response.status).toBe('SUCCESS');
                expect(response.apiResponse).toBeDefined();

                expect(response.apiResponse.message).toBeDefined();
                expect(response.apiResponse.detailMessage).toBeDefined();
                expect(response.apiResponse.data).toBeDefined();
                expect(response.apiResponse.requestMethod).toBeDefined();
                expect(response.apiResponse.statusCode).toBeDefined();

                expect(response.apiResponse.detailMessage).toBe(DEFAULT_DETAILS.UPDATED);
                expect(response.apiResponse.data).toBe(mockData);
                expect(response.apiResponse.message).toBe(DEFAULT_MESSAGES.UPDATED);
                expect(response.apiResponse.statusCode).toBe(200);
                expect(response.apiResponse.requestMethod).toBe(REQUEST_METHODS.PUT);
            });

            it('should create a successful delete response', () => {
                const response = AppResponseImpl.createAppResponse(
                    {
                        requestMethod: REQUEST_METHODS.DELETE,
                        data: mockData,
                    },
                    ResponseCode.RESOURCE_DELETED_CODE,
                );

                expect(response.success).toBe(true);
                expect(response.status).toBe('SUCCESS');
                expect(response.apiResponse).toBeDefined();

                expect(response.apiResponse.message).toBeDefined();
                expect(response.apiResponse.detailMessage).toBeDefined();
                expect(response.apiResponse.data).toBeUndefined();
                expect(response.apiResponse.requestMethod).toBeDefined();
                expect(response.apiResponse.statusCode).toBeDefined();

                expect(response.apiResponse.detailMessage).toBe(DEFAULT_DETAILS.DELETED);
                expect(response.apiResponse.message).toBe(DEFAULT_MESSAGES.DELETED);
                expect(response.apiResponse.statusCode).toBe(204);
                expect(response.apiResponse.requestMethod).toBe(REQUEST_METHODS.DELETE);
            });
        });

        describe('Error cases', () => {
            it('should create a bad request error response', () => {
                const response = AppResponseImpl.createAppResponse<ErrorDetail[]>(
                    {
                        requestMethod: REQUEST_METHODS.GET,
                        message: 'Bad Request',
                        detailMessage: 'Invalid input',
                        data: errorDetails,
                    },
                    ResponseCode.BAD_REQUEST_ERR_CODE,
                );

                expect(response.success).toBe(false);
                expect(response.status).toBe('ERROR');
                expect(response.apiResponse).toBeDefined();

                expect(response.apiResponse.message).toBeDefined();
                expect(response.apiResponse.detailMessage).toBeDefined();
                expect(response.apiResponse.data).toBeDefined();
                expect(response.apiResponse.requestMethod).toBeDefined();
                expect(response.apiResponse.statusCode).toBeDefined();

                expect(response.apiResponse.detailMessage).toBe('Invalid input');
                expect(response.apiResponse.message).toBe('Bad Request');
                expect(response.apiResponse.statusCode).toBe(400);
                expect(response.apiResponse.requestMethod).toBe(REQUEST_METHODS.GET);
            });

            it('should create an unauthorized error response', () => {
                const response = AppResponseImpl.createAppResponse<ErrorDetail[]>(
                    {
                        requestMethod: REQUEST_METHODS.GET,
                        message: 'Unauthorized',
                        detailMessage: 'Invalid credentials',
                        data: errorDetails,
                    },
                    ResponseCode.UNAUTHORIZED_ACCESS_ERR_CODE,
                );

                expect(response.success).toBe(false);
                expect(response.status).toBe('ERROR');
                expect(response.apiResponse).toBeDefined();

                expect(response.apiResponse.message).toBeDefined();
                expect(response.apiResponse.detailMessage).toBeDefined();
                expect(response.apiResponse.data).toBeDefined();
                expect(response.apiResponse.requestMethod).toBeDefined();
                expect(response.apiResponse.statusCode).toBeDefined();

                expect(response.apiResponse.detailMessage).toBe('Invalid credentials');
                expect(response.apiResponse.message).toBe('Unauthorized');
                expect(response.apiResponse.statusCode).toBe(401);
                expect(response.apiResponse.requestMethod).toBe(REQUEST_METHODS.GET);
            });

            it('should create a not found error response', () => {
                const response = AppResponseImpl.createAppResponse<ErrorDetail[]>(
                    {
                        requestMethod: REQUEST_METHODS.GET,
                        message: 'Not Found',
                        detailMessage: 'Resource not found',
                        data: errorDetails,
                    },
                    ResponseCode.USER_NOT_FOUND_ERR_CODE,
                );

                expect(response.success).toBe(false);
                expect(response.status).toBe('ERROR');
                expect(response.apiResponse).toBeDefined();

                expect(response.apiResponse.message).toBeDefined();
                expect(response.apiResponse.detailMessage).toBeDefined();
                expect(response.apiResponse.data).toBeDefined();
                expect(response.apiResponse.requestMethod).toBeDefined();
                expect(response.apiResponse.statusCode).toBeDefined();

                expect(response.apiResponse.detailMessage).toBe('Resource not found');
                expect(response.apiResponse.message).toBe('Not Found');
                expect(response.apiResponse.statusCode).toBe(404);
                expect(response.apiResponse.requestMethod).toBe(REQUEST_METHODS.GET);
            });

            it('should create a conflict error response', () => {
                const response = AppResponseImpl.createAppResponse<ErrorDetail[]>(
                    {
                        requestMethod: REQUEST_METHODS.POST,
                        message: 'Resource already exist',
                        detailMessage: 'It seems user with the username already exist.',
                        data: errorDetails,
                    },
                    ResponseCode.CONFLICT_ERR_CODE,
                );

                expect(response.success).toBe(false);
                expect(response.status).toBe('ERROR');
                expect(response.apiResponse).toBeDefined();

                expect(response.apiResponse.message).toBeDefined();
                expect(response.apiResponse.detailMessage).toBeDefined();
                expect(response.apiResponse.data).toBeDefined();
                expect(response.apiResponse.requestMethod).toBeDefined();
                expect(response.apiResponse.statusCode).toBeDefined();

                expect(response.apiResponse.detailMessage).toBe('It seems user with the username already exist.');
                expect(response.apiResponse.message).toBe('Resource already exist');
                expect(response.apiResponse.statusCode).toBe(409);
                expect(response.apiResponse.requestMethod).toBe(REQUEST_METHODS.POST);
            });

            it('should create an internal server error response', () => {
                const response = AppResponseImpl.createAppResponse<ErrorDetail[]>(
                    {
                        requestMethod: REQUEST_METHODS.GET,
                        message: 'Internal Server Error',
                        detailMessage: 'Something went wrong',
                        data: errorDetails,
                    },
                    ResponseCode.INTERNAL_SERVER_ERR_CODE,
                );

                expect(response.success).toBe(false);
                expect(response.status).toBe('ERROR');
                expect(response.apiResponse).toBeDefined();

                expect(response.apiResponse.message).toBeDefined();
                expect(response.apiResponse.detailMessage).toBeDefined();
                expect(response.apiResponse.data).toBeDefined();
                expect(response.apiResponse.requestMethod).toBeDefined();
                expect(response.apiResponse.statusCode).toBeDefined();

                expect(response.apiResponse.detailMessage).toBe('Something went wrong');
                expect(response.apiResponse.message).toBe('Internal Server Error');
                expect(response.apiResponse.statusCode).toBe(503);
                expect(response.apiResponse.requestMethod).toBe(REQUEST_METHODS.GET);
            });

            it('should create a default error response for unknown error codes', () => {
                const response = AppResponseImpl.createAppResponse<ErrorDetail[]>(
                    {
                        requestMethod: REQUEST_METHODS.GET,
                        message: 'Unknown Error',
                        detailMessage: 'Unknown error occurred',
                        data: errorDetails,
                    },
                    '999' as ResponseCode, // Unknown code
                );

                expect(response.success).toBe(false);
                expect(response.status).toBe('ERROR');
                expect(response.apiResponse).toBeDefined();

                expect(response.apiResponse.message).toBeDefined();
                expect(response.apiResponse.detailMessage).toBeDefined();
                expect(response.apiResponse.data).toBeDefined();
                expect(response.apiResponse.requestMethod).toBeDefined();
                expect(response.apiResponse.statusCode).toBeDefined();

                expect(response.apiResponse.detailMessage).toBe('Unknown error occurred');
                expect(response.apiResponse.message).toBe('Unknown Error');
                expect(response.apiResponse.statusCode).toBe(500);
                expect(response.apiResponse.requestMethod).toBe(REQUEST_METHODS.GET);
            });
        });
    });

    describe('Immutability', () => {
        it('should create immutable response objects', () => {
            const response = AppResponseImpl.createAppResponse(
                {
                    requestMethod: REQUEST_METHODS.GET,
                    data: errorDetails,
                },
                ResponseCode.ACCOUNT_NOT_FOUND_ERR_CODE,
            );

            expect(() => {
                (response as any).success = false;
            }).toThrow();

            expect(() => {
                (response as any).status = 'ERROR';
            }).toThrow();

            expect(() => {
                (response as any).apiResponse = null;
            }).toThrow();
        });
    });
});
