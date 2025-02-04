import { GenericResponseImpl } from '../../models/response/GenericResponse';
import {
    DEFAULT_DETAILS,
    DEFAULT_MESSAGES,
    Entity,
    ErrorDetail,
    REQUEST_METHODS,
    ResponseCode,
    ResponseStatus,
} from '../../models/response/ResponseCode';

describe('GenericResponseImpl', () => {
    const mockPath = '/api/test';
    const mockSuccessCode = ResponseCode.RESOURCE_READ_SUCCESS_CODE;
    const mockErrorCode = ResponseCode.BAD_REQUEST_ERR_CODE;
    const mockMessage = 'Test message';
    const mockDetailMessage = 'Test detail message';

    const mockData: Entity = {
        id: '123',
        type: 'MOVIE',
    };

    const errorDetails: ErrorDetail[] = [
        { field: 'field1', message: 'error message' },
        { field: 'field2', message: 'error message' },
    ];

    describe('success static method', () => {
        it('should create a successful response with data', () => {
            const response = GenericResponseImpl.success<Entity>({
                message: mockMessage,
                detailMessage: mockDetailMessage,
                path: mockPath,
                code: mockSuccessCode,
                data: mockData,
            });

            expect(response.traceId).toBeDefined();
            expect(response.timestamp).toBeDefined();
            expect(response.path).toBe(mockPath);
            expect(response.code).toBe(mockSuccessCode);
            expect(response.getMessage()).toBe(mockMessage);
            expect(response.getDetailMessage()).toBe(mockDetailMessage);
            expect(response.getData()).toEqual(mockData);
            expect(response.isSuccess()).toBe(true);
            expect(response.getStatus()).toBe(ResponseStatus.SUCCESS);
            expect(response.getRequestMethod()).toBe(REQUEST_METHODS.GET);
            expect(response.getHttpStatusCode()).toBe(200);
        });

        it('should create a successful response without optional parameters', () => {
            const response = GenericResponseImpl.success<Entity>({
                path: mockPath,
                code: mockSuccessCode,
            });

            expect(response.traceId).toBeDefined();
            expect(response.timestamp).toBeDefined();
            expect(response.path).toBe(mockPath);
            expect(response.code).toBe(mockSuccessCode);
            expect(response.getMessage()).toBe(DEFAULT_MESSAGES.SUCCESS);
            expect(response.getDetailMessage()).toBe(DEFAULT_DETAILS.SUCCESS);
            expect(response.getData()).toBeUndefined();
            expect(response.isSuccess()).toBe(true);
            expect(response.getStatus()).toBe(ResponseStatus.SUCCESS);
            expect(response.getRequestMethod()).toBe(REQUEST_METHODS.GET);
            expect(response.getHttpStatusCode()).toBe(200);
        });
    });

    describe('error static method', () => {
        it('should create an error response', () => {
            //const errorCode = ResponseCode.BAD_REQUEST_ERR_CODE;
            const response = GenericResponseImpl.error<ErrorDetail[]>({
                message: mockMessage,
                detailMessage: mockDetailMessage,
                path: mockPath,
                code: mockErrorCode,
                errors: errorDetails,
            });

            expect(response.traceId).toBeDefined();
            expect(response.timestamp).toBeDefined();
            expect(response.path).toBe(mockPath);
            expect(response.code).toBe(mockErrorCode);
            expect(response.getMessage()).toBe(mockMessage);
            expect(response.getDetailMessage()).toBe(mockDetailMessage);
            expect(response.getData()).toEqual(errorDetails);
            expect(response.isSuccess()).toBe(false);
            expect(response.getStatus()).toBe(ResponseStatus.ERROR);
            expect(response.getRequestMethod()).toBe(REQUEST_METHODS.GET);
            expect(response.getHttpStatusCode()).toBe(400);
        });

        it('should create a error response without optional parameters', () => {
            const response = GenericResponseImpl.error<Entity>({
                path: mockPath,
                code: mockErrorCode,
            });

            expect(response.traceId).toBeDefined();
            expect(response.timestamp).toBeDefined();
            expect(response.path).toBe(mockPath);
            expect(response.code).toBe(mockErrorCode);
            expect(response.getMessage()).toBe(DEFAULT_MESSAGES.BAD_REQUEST);
            expect(response.getDetailMessage()).toBe(DEFAULT_DETAILS.BAD_REQUEST);
            expect(response.getData()).toBeUndefined();
            expect(response.isSuccess()).toBe(false);
            expect(response.getStatus()).toBe(ResponseStatus.ERROR);
            expect(response.getRequestMethod()).toBe(REQUEST_METHODS.GET);
            expect(response.getHttpStatusCode()).toBe(400);
        });
    });

    describe('instance methods', () => {
        let response: GenericResponseImpl<Entity>;

        beforeEach(() => {
            response = GenericResponseImpl.success({
                message: mockMessage,
                path: mockPath,
                code: mockSuccessCode,
                data: mockData,
            });
        });

        it('should get HTTP status code', () => {
            expect(response.getHttpStatusCode()).toBeDefined();
        });

        it('should convert to JSON correctly', () => {
            const json = response.toJSON();

            expect(json).toEqual(
                expect.objectContaining({
                    metadata: response.metadata,
                    traceId: response.traceId,
                    timestamp: response.timestamp,
                    success: response.isSuccess(),
                    status: response.getStatus(),
                    requestMethod: response.getRequestMethod(),
                    statusCode: response.getHttpStatusCode(),
                    path: response.path,
                    code: response.code,
                    message: response.getMessage(),
                    detailMessage: response.getDetailMessage(),
                    data: response.getData(),
                }),
            );
        });
    });

    describe('immutability', () => {
        it('should be immutable after creation', () => {
            const response = GenericResponseImpl.success<Entity>({
                path: mockPath,
                code: mockSuccessCode,
            });

            expect(() => {
                (response as any).path = 'new-path';
            }).toThrow();

            expect(() => {
                (response as any).code = 'new-code';
            }).toThrow();
        });
    });
});
