import { ApiMessage, isApiMessage } from '../../models/response/ApiMessage';
import { DEFAULT_DETAILS, DEFAULT_MESSAGES, REQUEST_METHODS } from '../../models/response/ResponseCode';

describe('ApiMessage', () => {
    describe('constructor', () => {
        it('should create instance with default values', () => {
            const message = new ApiMessage();

            expect(message.statusCode).toBe(200);
            expect(message.message).toBe('');
            expect(message.detailMessage).toBe('');
            expect(message.data).toBeUndefined();
            expect(message.requestMethod).toBeUndefined();
        });

        it('should create instance with provided values', () => {
            const testData = { id: '1', type: 'MOVIE' };
            const response = new ApiMessage({
                statusCode: 201,
                message: 'Test message',
                detailMessage: 'Test detail',
                data: testData,
                requestMethod: REQUEST_METHODS.POST,
            });

            expect(response.statusCode).toBe(201);
            expect(response.message).toBe('Test message');
            expect(response.detailMessage).toBe('Test detail');
            expect(response.data).toEqual(testData);
            expect(response.requestMethod).toBe(REQUEST_METHODS.POST);
        });
    });

    describe('static factory methods', () => {
        it('should create read message', () => {
            const testData = { id: '1', type: 'MOVIE' };
            const params = {
                data: testData,
            };
            const response = ApiMessage.read(params);

            expect(response.statusCode).toBe(200);
            expect(response.message).toBe(DEFAULT_MESSAGES.SUCCESS);
            expect(response.detailMessage).toBe(DEFAULT_DETAILS.SUCCESS);
            expect(response.requestMethod).toBe(REQUEST_METHODS.GET);
            expect(response.data).toEqual(testData);
        });

        it('should create created message', () => {
            const testData = { id: '1', type: 'MOVIE' };
            const params = {
                data: testData,
            };

            const response = ApiMessage.created(params);

            expect(response.statusCode).toBe(201);
            expect(response.message).toBe(DEFAULT_MESSAGES.CREATED);
            expect(response.detailMessage).toBe(DEFAULT_DETAILS.CREATED);
            expect(response.requestMethod).toBe(REQUEST_METHODS.POST);
            expect(response.data).toEqual(testData);
        });

        it('should create updated message', () => {
            const testData = { id: '1', type: 'MOVIE' };
            const params = {
                data: testData,
            };
            const response = ApiMessage.updated(params);

            expect(response.statusCode).toBe(200);
            expect(response.message).toBe(DEFAULT_MESSAGES.UPDATED);
            expect(response.detailMessage).toBe(DEFAULT_DETAILS.UPDATED);
            expect(response.requestMethod).toBe(REQUEST_METHODS.PUT);
            expect(response.data).toEqual(testData);
        });

        it('should create deleted message', () => {
            const response = ApiMessage.deleted();

            expect(response.statusCode).toBe(204);
            expect(response.message).toBe(DEFAULT_MESSAGES.DELETED);
            expect(response.detailMessage).toBe(DEFAULT_DETAILS.DELETED);
            expect(response.requestMethod).toBe(REQUEST_METHODS.DELETE);
            expect(response.data).toBeUndefined();
        });
    });

    describe('isApiMessage type guard', () => {
        it('should return true for ApiMessage instances', () => {
            const response = new ApiMessage();
            expect(isApiMessage(response)).toBe(true);
        });

        it('should return false for non-ApiMessage values', () => {
            expect(isApiMessage(null)).toBe(false);
            expect(isApiMessage(undefined)).toBe(false);
            expect(isApiMessage({})).toBe(false);
            expect(isApiMessage({ statusCode: 200 })).toBe(false);
        });
    });

    describe('immutability', () => {
        it('should be immutable after creation', () => {
            const message = new ApiMessage({
                statusCode: 200,
                message: 'Test',
            });

            expect(() => {
                (message as any).statusCode = 400;
            }).toThrow();

            expect(() => {
                (message as any).message = 'Modified';
            }).toThrow();
        });
    });
});
