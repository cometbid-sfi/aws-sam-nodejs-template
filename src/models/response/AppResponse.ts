import config from '../../config/config';
import { ApiError } from './error/ApiError';
import { ResponseData, RequestMethod, ResponseCode } from './ResponseCode';
import { ApiMessage } from './success/ApiMessage';

// Use a const enum for status types to improve performance
const enum ResponseStatus {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface ApiResponse<E> {
    statusCode?: number;
    path?: string;
    requestMethod?: RequestMethod;
    message: string;
    detailMessage: string;
    data?: E;
}

// Simplified response interface with discriminated union
export interface AppResponse<T> {
    readonly success: boolean;
    readonly status: ResponseStatus;
    // readonly metadata?: AppMetadata | null;
    readonly apiResponse: T;
}

// Simplified params interface
interface AppResponseParams<T> {
    readonly response: T;
    //readonly includeMetadata: boolean;
}

/**
 * AppResponse Implementation
 */
export class AppResponseImpl<U extends ResponseData, T extends ApiResponse<U>> implements AppResponse<T> {
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
    static success<U extends ResponseData, T extends ApiResponse<U>>({
        response,
    }: AppResponseParams<T>): AppResponse<T> {
        return new AppResponseImpl(true, ResponseStatus.SUCCESS, response);
    }

    static error<U extends ResponseData, T extends ApiResponse<U>>({ response }: AppResponseParams<T>): AppResponse<T> {
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
    static createAppResponse<U extends ResponseData>(
        code: ResponseCode,
        message: string,
        detailMessage: string,
        data?: U,
    ): AppResponse<ApiMessage<U>> {
        switch (code) {
            case ResponseCode.RESOURCE_READ_SUCCESS_CODE:
                const readResponse = ApiMessage.read<U>(message, detailMessage, data);
                return AppResponseImpl.success<U, ApiMessage<U>>({
                    response: readResponse,
                });
            case ResponseCode.RESOURCE_CREATED_CODE:
                const createdResponse = ApiMessage.created<U>(message, detailMessage, data);
                return AppResponseImpl.success<U, ApiMessage<U>>({
                    response: createdResponse,
                });
            case ResponseCode.RESOURCE_UPDATED_CODE:
                const updatedResponse = ApiMessage.updated<U>(message, detailMessage, data);
                return AppResponseImpl.success<U, ApiMessage<U>>({
                    response: updatedResponse,
                });
            case ResponseCode.RESOURCE_DELETED_CODE:
                const deletedResponse = ApiMessage.updated<U>(message, detailMessage, data);
                return AppResponseImpl.success<U, ApiMessage<U>>({
                    response: deletedResponse,
                });
            case ResponseCode.BAD_REQUEST_ERR_CODE:
                const badReqResponse = ApiError.badRequest<U>(message, detailMessage, data);
                // Error response
                return AppResponseImpl.error<U, ApiMessage<U>>({
                    response: badReqResponse,
                });
            case ResponseCode.EMP_NOT_FOUND_ERR_CODE:
            case ResponseCode.USER_NOT_FOUND_ERR_CODE:
            case ResponseCode.ACCOUNT_NOT_FOUND_ERR_CODE:
                const notfoundResponse = ApiError.notFound<U>(message, detailMessage, data);
                // Error response
                return AppResponseImpl.error<U, ApiMessage<U>>({
                    response: notfoundResponse,
                });
            case ResponseCode.APP_SERVER_ERR_CODE:
            case ResponseCode.INTERNAL_SERVER_ERR_CODE:
            case ResponseCode.UNAVAILABLE_SERVICE_ERR_CODE:
                const internalServerErrorResponse = ApiError.internalServerError<U>(message, detailMessage);
                // Error response
                return AppResponseImpl.error<U, ApiMessage<U>>({
                    response: internalServerErrorResponse,
                });
            default:
                const serverErrorResponse = ApiError.internalServerError<U>(message, detailMessage);
                // Error response
                return AppResponseImpl.error<U, ApiMessage<U>>({
                    response: serverErrorResponse,
                });
        }
    }
}
