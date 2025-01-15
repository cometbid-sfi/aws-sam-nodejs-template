import { ApiResponse } from '../AppResponse';
import { DEFAULT_DETAILS, DEFAULT_MESSAGES, ResponseData, REQUEST_METHODS, RequestMethod } from '../ResponseCode';

// Interface for ApiError constructor
interface ApiErrorParams<E> {
    statusCode?: number;
    path?: string;
    requestMethod?: RequestMethod;
    message?: string;
    detailMessage?: string;
    data?: E;
}

export class ApiError<E extends ResponseData> implements ApiResponse<E> {
    readonly statusCode: number;
    readonly path?: string;
    readonly message: string;
    readonly detailMessage: string;
    readonly errors?: E;

    constructor(params: ApiErrorParams<E> = {}) {
        this.statusCode = params.statusCode ?? 200;
        this.message = params.message ?? '';
        this.detailMessage = params.detailMessage ?? '';
        this.path = params.path;
        this.errors = params.data;
        Object.freeze(this);
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @returns
     */
    static readError<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.SERVER_ERROR,
        detailMessage: string = DEFAULT_DETAILS.SERVER_ERROR,
    ): ApiError<E> {
        return new ApiError({
            statusCode: 500,
            message,
            detailMessage,
            requestMethod: REQUEST_METHODS.GET,
        });
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static badRequest<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.BAD_REQUEST,
        detailMessage: string = DEFAULT_DETAILS.BAD_REQUEST,
        data?: E,
    ): ApiError<E> {
        return new ApiError({
            statusCode: 400,
            message,
            detailMessage,
            data,
            requestMethod: REQUEST_METHODS.GET,
        });
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static notFound<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.NOT_FOUND,
        detailMessage: string = DEFAULT_DETAILS.NOT_FOUND,
        data?: E,
    ): ApiError<E> {
        return new ApiError({
            statusCode: 404,
            message,
            detailMessage,
            data,
            requestMethod: REQUEST_METHODS.GET,
        });
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static conflict<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.CONFLICT,
        detailMessage: string = DEFAULT_DETAILS.CONFLICT,
        data?: E,
    ): ApiError<E> {
        return new ApiError({
            statusCode: 409,
            message,
            detailMessage,
            data,
            requestMethod: REQUEST_METHODS.GET,
        });
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static unauthorized<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.UNAUTHORIZED,
        detailMessage: string = DEFAULT_DETAILS.UNAUTHORIZED,
    ): ApiError<E> {
        return new ApiError({
            statusCode: 401,
            message,
            detailMessage,
            requestMethod: REQUEST_METHODS.GET,
        });
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static forbidden<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.FORBIDDEN,
        detailMessage: string = DEFAULT_DETAILS.FORBIDDEN,
    ): ApiError<E> {
        return new ApiError({
            statusCode: 403,
            message,
            detailMessage,
            requestMethod: REQUEST_METHODS.GET,
        });
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static serverError<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.SERVER_ERROR,
        detailMessage: string = DEFAULT_DETAILS.SERVER_ERROR,
    ): ApiError<E> {
        return new ApiError({
            statusCode: 500,
            message,
            detailMessage,
            requestMethod: REQUEST_METHODS.GET,
        });
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static internalServerError<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.SERVICE_UNAVAILABLE,
        detailMessage: string = DEFAULT_DETAILS.SERVICE_UNAVAILABLE,
    ): ApiError<E> {
        return new ApiError({
            statusCode: 503,
            message,
            detailMessage,
            requestMethod: REQUEST_METHODS.GET,
        });
    }
}
