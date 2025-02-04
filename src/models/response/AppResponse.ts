import { ApiParams } from './ApiParams';
import { ApiError } from './ApiError';
import { ResponseData, ResponseCode, RequestMethod, REQUEST_METHODS, ErrorDetail } from './ResponseCode';
import { ApiMessage } from './ApiMessage';

// Use a const enum for status types to improve performance
const enum ResponseStatus {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

// Simplified response interface with discriminated union
export interface AppResponse<T> {
    readonly success: boolean;
    readonly status: ResponseStatus;
    readonly apiResponse: T;
}

// Simplified params interface
interface AppResponseParams<T> {
    readonly response: T;
}

/**
 * AppResponse Implementation
 */
export class AppResponseImpl<U extends ResponseData, T extends ApiParams<U>> implements AppResponse<T> {
    readonly success: boolean;
    readonly status: ResponseStatus;
    readonly apiResponse: T;

    constructor(success: boolean, status: ResponseStatus, apiResponse: T) {
        this.success = success;
        this.status = status;
        this.apiResponse = apiResponse;
        Object.freeze(this); // Make instance immutable
    }

    // Static factory methods with improved type safety

    private static success<U extends ResponseData, T extends ApiParams<U>>({
        response,
    }: AppResponseParams<T>): AppResponse<T> {
        return new AppResponseImpl(true, ResponseStatus.SUCCESS, response);
    }

    private static error<U extends ResponseData, T extends ApiParams<U>>({
        response,
    }: AppResponseParams<T>): AppResponse<T> {
        return new AppResponseImpl(false, ResponseStatus.ERROR, response);
    }

    /**
     *
     * @param code
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static createAppResponse<U extends ResponseData, T extends ApiParams<U>>(
        params: ApiParams<U> = {},
        code: ResponseCode,
    ): AppResponse<T> {
        switch (code) {
            case ResponseCode.RESOURCE_READ_SUCCESS_CODE:
                const readResponse = ApiMessage.read<U>(params);

                // Read success response
                return AppResponseImpl.success<U, ApiMessage<U>>({
                    response: readResponse,
                }) as AppResponse<T>;
            case ResponseCode.RESOURCE_CREATED_CODE:
                const createdResponse = ApiMessage.created<U>(params);

                // Create success response
                return AppResponseImpl.success<U, ApiMessage<U>>({
                    response: createdResponse,
                }) as AppResponse<T>;
            case ResponseCode.RESOURCE_UPDATED_CODE:
                const updatedResponse = ApiMessage.updated<U>(params);

                // Update success response
                return AppResponseImpl.success<U, ApiMessage<U>>({
                    response: updatedResponse,
                }) as AppResponse<T>;
            case ResponseCode.RESOURCE_DELETED_CODE:
                const deletedResponse = ApiMessage.deleted<U>();

                // Delete success response
                return AppResponseImpl.success<U, ApiMessage<U>>({
                    response: deletedResponse,
                }) as AppResponse<T>;
            case ResponseCode.BAD_REQUEST_ERR_CODE:
                const badReqResponse = ApiError.badRequest<U>(params);

                //console.log(`Bad Request detail Message: ${badReqResponse.detailMessage}`);
                //console.log(`Bad Request Message: ${badReqResponse.message}`);
                //console.log(`Bad Request detail errors: ${badReqResponse.errors}`);
                //console.log(`Bad Request status code: ${badReqResponse.statusCode}`);

                // Error response
                return AppResponseImpl.error<U, ApiError<U>>({
                    response: badReqResponse,
                }) as AppResponse<T>;
            case ResponseCode.UNAUTHORIZED_ACCESS_ERR_CODE:
                const unauthorizedResponse = ApiError.unauthorized<U>(params);
                // Error response
                return AppResponseImpl.error<U, ApiError<U>>({
                    response: unauthorizedResponse,
                }) as AppResponse<T>;
            case ResponseCode.CONFLICT_ERR_CODE:
                const conflictResponse = ApiError.conflict<U>(params);

                // Error response
                return AppResponseImpl.error<U, ApiError<U>>({
                    response: conflictResponse,
                }) as AppResponse<T>;
            case ResponseCode.EMP_NOT_FOUND_ERR_CODE:
            case ResponseCode.USER_NOT_FOUND_ERR_CODE:
            case ResponseCode.ACCOUNT_NOT_FOUND_ERR_CODE:
                const notfoundResponse = ApiError.notFound<U>(params);

                // Error response
                return AppResponseImpl.error<U, ApiError<U>>({
                    response: notfoundResponse,
                }) as AppResponse<T>;
            case ResponseCode.APP_SERVER_ERR_CODE:
            case ResponseCode.INTERNAL_SERVER_ERR_CODE:
            case ResponseCode.UNAVAILABLE_SERVICE_ERR_CODE:
                const internalServerErrorResponse = ApiError.internalServerError<U>(params);

                // Error response
                return AppResponseImpl.error<U, ApiError<U>>({
                    response: internalServerErrorResponse,
                }) as AppResponse<T>;
            default:
                const serverErrorResponse = ApiError.readError<U>(params);

                // Error response
                return AppResponseImpl.error<U, ApiError<U>>({
                    response: serverErrorResponse,
                }) as AppResponse<T>;
        }
    }
}
