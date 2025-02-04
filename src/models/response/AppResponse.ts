import { ApiParams } from './ApiParams';
import { ApiError } from './ApiError';
import { ResponseData, ResponseCode, ResponseStatus } from './ResponseCode';
import { ApiMessage } from './ApiMessage';

// Simplified response interface with discriminated union
export interface AppResponse<U extends ResponseData> {
    readonly success: boolean;
    readonly status: ResponseStatus;
    readonly apiResponse: ApiParams<U>;
}

/**
 * AppResponse Implementation
 */
export class AppResponseImpl<U extends ResponseData> implements AppResponse<U> {
    readonly success: boolean;
    readonly status: ResponseStatus;
    readonly apiResponse: ApiParams<U>;

    constructor(success: boolean, status: ResponseStatus, appResponse: ApiParams<U>) {
        this.success = success;
        this.status = status;
        this.apiResponse = appResponse;
        Object.freeze(this); // Make instance immutable
    }

    // Static factory methods with improved type safety
    private static success<U extends ResponseData>(appResponse: ApiMessage<U>): AppResponse<U> {
        return new AppResponseImpl<U>(true, ResponseStatus.SUCCESS, appResponse);
    }

    private static error<U extends ResponseData>(appResponse: ApiError<U>): AppResponse<U> {
        console.log(`Response Data final Error spot: ${appResponse.errors}`);

        const params: ApiParams<U> = {
            statusCode: appResponse.statusCode,
            requestMethod: appResponse.requestMethod,
            message: appResponse.message,
            detailMessage: appResponse.detailMessage,
            data: appResponse.errors,
        } as ApiParams<U>;

        return new AppResponseImpl<U>(false, ResponseStatus.ERROR, params);
    }

    /**
     *
     * @param code
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static createAppResponse<U extends ResponseData>(params: ApiParams<U> = {}, code: ResponseCode): AppResponse<U> {
        switch (code) {
            case ResponseCode.RESOURCE_READ_SUCCESS_CODE:
                const readResponse = ApiMessage.read<U>(params);

                // Read success response
                return AppResponseImpl.success<U>(readResponse) as AppResponse<U>;
            case ResponseCode.RESOURCE_CREATED_CODE:
                const createdResponse = ApiMessage.created<U>(params);

                // Create success response
                return AppResponseImpl.success<U>(createdResponse) as AppResponse<U>;
            case ResponseCode.RESOURCE_UPDATED_CODE:
                const updatedResponse = ApiMessage.updated<U>(params);

                // Update success response
                return AppResponseImpl.success<U>(updatedResponse) as AppResponse<U>;
            case ResponseCode.RESOURCE_DELETED_CODE:
                const deletedResponse = ApiMessage.deleted<U>();

                // Delete success response
                return AppResponseImpl.success<U>(deletedResponse) as AppResponse<U>;
            case ResponseCode.BAD_REQUEST_ERR_CODE:
                const badReqResponse = ApiError.badRequest<U>(params);

                console.log(`Response Data Inside BAD_REQUEST_ERR_CODE: ${badReqResponse.errors}`);
                //console.log(`Bad Request detail Message: ${badReqResponse.detailMessage}`);
                //console.log(`Bad Request Message: ${badReqResponse.message}`);
                //console.log(`Bad Request detail errors: ${badReqResponse.errors}`);
                //console.log(`Bad Request status code: ${badReqResponse.statusCode}`);

                //const badReqResponse: ApiError<U> = response;
                // badReqResponse.data = response.errors;

                // Error response
                return AppResponseImpl.error<U>(badReqResponse) as AppResponse<U>;
            case ResponseCode.UNAUTHORIZED_ACCESS_ERR_CODE:
                const unauthorizedResponse = ApiError.unauthorized<U>(params);
                // Error response
                return AppResponseImpl.error<U>(unauthorizedResponse) as AppResponse<U>;
            case ResponseCode.CONFLICT_ERR_CODE:
                const conflictResponse = ApiError.conflict<U>(params);

                // Error response
                return AppResponseImpl.error<U>(conflictResponse) as AppResponse<U>;
            case ResponseCode.EMP_NOT_FOUND_ERR_CODE:
            case ResponseCode.USER_NOT_FOUND_ERR_CODE:
            case ResponseCode.ACCOUNT_NOT_FOUND_ERR_CODE:
                const notfoundResponse = ApiError.notFound<U>(params);

                // Error response
                return AppResponseImpl.error<U>(notfoundResponse) as AppResponse<U>;
            case ResponseCode.APP_SERVER_ERR_CODE:
            case ResponseCode.INTERNAL_SERVER_ERR_CODE:
            case ResponseCode.UNAVAILABLE_SERVICE_ERR_CODE:
                const internalServerErrorResponse = ApiError.internalServerError<U>(params);

                // Error response
                return AppResponseImpl.error<U>(internalServerErrorResponse) as AppResponse<U>;
            default:
                const serverErrorResponse = ApiError.readError<U>(params);

                // Error response
                return AppResponseImpl.error<U>(serverErrorResponse) as AppResponse<U>;
        }
    }
}
