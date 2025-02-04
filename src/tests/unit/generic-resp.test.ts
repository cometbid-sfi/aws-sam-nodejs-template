import { GenericResponseImpl } from '../../models/response/GenericResponse';
import { ErrorDetail, ResponseCode } from '../../models/response/ResponseCode';
import { ApiParams } from '../../models/response/ApiParams';

describe('GenericResponseImpl', () => {
    const mockPath = '/api/test';
    const mockSuccessCode = ResponseCode.RESOURCE_READ_SUCCESS_CODE;
    const mockErrorCode = ResponseCode.BAD_REQUEST_ERR_CODE;
    const mockMessage = 'Test message';
    const mockDetailMessage = 'Test detail message';

    interface TestData {
        id: string;
        type: string;
    }

    interface TestApiParams extends ApiParams<TestData> {
        data?: TestData;
    }

    const mockData: TestData = {
        id: '123',
        type: 'MOVIE',
    };

    const errorDetails: ErrorDetail[] = [
        { field: 'field1', message: 'error message' },
        { field: 'field2', message: 'error message' },
    ];

    interface TestApiErrParams extends ApiParams<ErrorDetail[]> {
        data?: ErrorDetail[];
    }

    describe('success static method', () => {
        it('should create a successful response with data', () => {
            const response = GenericResponseImpl.success<TestData, TestApiParams>({
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
        });

        it('should create a successful response without optional parameters', () => {
            const response = GenericResponseImpl.success<TestData, TestApiParams>({
                path: mockPath,
                code: mockSuccessCode,
            });

            expect(response.path).toBe(mockPath);
            expect(response.code).toBe(mockSuccessCode);
            expect(response.getData()).toBeUndefined();
            expect(response.isSuccess()).toBe(true);
        });
    });

    describe('error static method', () => {
        it('should create an error response', () => {
            //const errorCode = ResponseCode.BAD_REQUEST_ERR_CODE;
            const response = GenericResponseImpl.error<ErrorDetail[], TestApiErrParams>({
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
            //expect(response.getData()).toEqual(errorDetails);
            expect(response.isSuccess()).toBe(false);
        });
    });

    describe('instance methods', () => {
        let response: GenericResponseImpl<TestData, TestApiParams>;

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
                    traceId: response.traceId,
                    timestamp: response.timestamp,
                    path: response.path,
                    code: response.code,
                    message: response.getMessage(),
                    data: response.getData(),
                }),
            );
        });
    });

    describe('immutability', () => {
        it('should be immutable after creation', () => {
            const response = GenericResponseImpl.success<TestData, TestApiParams>({
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
