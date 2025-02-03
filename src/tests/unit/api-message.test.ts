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
            const testData = { id: 1, type: 'MOVIE' };
            const message = new ApiMessage({
                statusCode: 201,
                message: 'Test message',
                detailMessage: 'Test detail',
                data: testData,
                requestMethod: REQUEST_METHODS.POST,
            });

            expect(message.statusCode).toBe(201);
            expect(message.message).toBe('Test message');
            expect(message.detailMessage).toBe('Test detail');
            expect(message.data).toEqual(testData);
            expect(message.requestMethod).toBe(REQUEST_METHODS.POST);
        });
    });

    describe('static factory methods', () => {
        it('should create read message', () => {
            const testData = { id: 1, type: 'MOVIE' };
            const message = ApiMessage.read(testData);

            expect(message.statusCode).toBe(200);
            expect(message.message).toBe(DEFAULT_MESSAGES.SUCCESS);
            expect(message.detailMessage).toBe(DEFAULT_DETAILS.SUCCESS);
            expect(message.requestMethod).toBe(REQUEST_METHODS.GET);
            expect(message.data).toEqual(testData);
        });

        it('should create created message', () => {
            const testData = { id: 1, type: 'MOVIE' };
            const message = ApiMessage.created(testData);

            expect(message.statusCode).toBe(201);
            expect(message.message).toBe(DEFAULT_MESSAGES.CREATED);
            expect(message.detailMessage).toBe(DEFAULT_DETAILS.CREATED);
            expect(message.requestMethod).toBe(REQUEST_METHODS.POST);
            expect(message.data).toEqual(testData);
        });

        it('should create updated message', () => {
            const testData = { id: 1, type: 'MOVIE' };
            const message = ApiMessage.updated(testData);

            expect(message.statusCode).toBe(200);
            expect(message.message).toBe(DEFAULT_MESSAGES.UPDATED);
            expect(message.detailMessage).toBe(DEFAULT_DETAILS.UPDATED);
            expect(message.requestMethod).toBe(REQUEST_METHODS.PUT);
            expect(message.data).toEqual(testData);
        });

        it('should create deleted message', () => {
            const message = ApiMessage.deleted();

            expect(message.statusCode).toBe(204);
            expect(message.message).toBe(DEFAULT_MESSAGES.DELETED);
            expect(message.detailMessage).toBe(DEFAULT_DETAILS.DELETED);
            expect(message.requestMethod).toBe(REQUEST_METHODS.DELETE);
            expect(message.data).toBeUndefined();
        });
    });

    describe('isApiMessage type guard', () => {
        it('should return true for ApiMessage instances', () => {
            const message = new ApiMessage();
            expect(isApiMessage(message)).toBe(true);
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
