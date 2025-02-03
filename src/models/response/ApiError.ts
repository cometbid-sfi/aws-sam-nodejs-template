import { ApiParams, ApiResponseBuilder } from './ApiParams';
import { DEFAULT_DETAILS, DEFAULT_MESSAGES, REQUEST_METHODS, RequestMethod, ResponseData } from './ResponseCode';

export class ApiError<E extends ResponseData> implements ApiParams<E> {
    readonly statusCode: number;
    readonly requestMethod?: RequestMethod;
    readonly message: string;
    readonly detailMessage: string;
    readonly errors?: E;

    constructor(params: ApiParams<E> = {}) {
        this.statusCode = params.statusCode ?? 500;
        this.message = params.message ?? '';
        this.detailMessage = params.detailMessage ?? '';
        this.requestMethod = params.requestMethod;
        this.errors = params.data;
        Object.freeze(this);
    }

    static builder<E extends ResponseData>(): ApiResponseBuilder<E> {
        return new ApiResponseBuilder<E>();
    }

    // Optimized static factory methods
    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static readError<E extends ResponseData>(
        requestMethod: RequestMethod,
        message: string = DEFAULT_MESSAGES.SERVER_ERROR,
        detailMessage: string = DEFAULT_DETAILS.SERVER_ERROR,
        errors?: E,
    ): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 500,
            requestMethod,
            message,
            detailMessage,
            data: errors,
        } as ApiParams<E>;

        return ApiError.buildReadError<E>(params);
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static badRequest<E extends ResponseData>(
        requestMethod: RequestMethod,
        message: string = DEFAULT_MESSAGES.BAD_REQUEST,
        detailMessage: string = DEFAULT_DETAILS.BAD_REQUEST,
        errors?: E,
    ): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 400,
            requestMethod,
            message,
            detailMessage,
            data: errors,
        } as ApiParams<E>;

        return ApiError.buildReadError<E>(params);
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static notFound<E extends ResponseData>(
        requestMethod: RequestMethod,
        message: string = DEFAULT_MESSAGES.NOT_FOUND,
        detailMessage: string = DEFAULT_DETAILS.NOT_FOUND,
        errors?: E,
    ): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 404,
            requestMethod,
            message,
            detailMessage,
            data: errors,
        } as ApiParams<E>;

        return ApiError.buildReadError<E>(params);
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static conflict<E extends ResponseData>(
        requestMethod: RequestMethod,
        message: string = DEFAULT_MESSAGES.CONFLICT,
        detailMessage: string = DEFAULT_DETAILS.CONFLICT,
        errors?: E,
    ): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 409,
            requestMethod,
            message,
            detailMessage,
            data: errors,
        } as ApiParams<E>;

        return ApiError.buildReadError<E>(params);
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static unauthorized<E extends ResponseData>(
        requestMethod: RequestMethod,
        message: string = DEFAULT_MESSAGES.UNAUTHORIZED,
        detailMessage: string = DEFAULT_DETAILS.UNAUTHORIZED,
        errors?: E,
    ): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 401,
            requestMethod,
            message,
            detailMessage,
            data: errors,
        } as ApiParams<E>;

        return ApiError.buildReadError<E>(params);
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static forbidden<E extends ResponseData>(
        requestMethod: RequestMethod,
        message: string = DEFAULT_MESSAGES.FORBIDDEN,
        detailMessage: string = DEFAULT_DETAILS.FORBIDDEN,
        errors?: E,
    ): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 403,
            requestMethod,
            message,
            detailMessage,
            data: errors,
        } as ApiParams<E>;

        return ApiError.buildReadError<E>(params);
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static internalServerError<E extends ResponseData>(
        requestMethod: RequestMethod,
        message: string = DEFAULT_MESSAGES.SERVICE_UNAVAILABLE,
        detailMessage: string = DEFAULT_DETAILS.SERVICE_UNAVAILABLE,
        errors?: E,
    ): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 503,
            requestMethod,
            message,
            detailMessage,
            data: errors,
        } as ApiParams<E>;

        return ApiError.buildReadError<E>(params);
    }

    /**
     *
     * @param message
     * @param detailMessage
     * @returns
     */
    private static buildReadError<D extends ResponseData>(params: ApiParams<D> = {}): ApiError<D> {
        return this.builder<D>()
            .status(params.statusCode ?? 500)
            .message(params.message ?? DEFAULT_MESSAGES.API_ERROR)
            .detailMessage(params.detailMessage ?? DEFAULT_DETAILS.API_ERROR)
            .requestMethod(params.requestMethod ?? REQUEST_METHODS.GET)
            .data(params.data)
            .buildErrorMesssage();
    }
}

// Type guard for ApiResponse
export function isApiError<T>(response: unknown): response is T {
    return response instanceof ApiError;
}
