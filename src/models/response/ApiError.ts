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
    static readError<E extends ResponseData>(apiParams: ApiParams<E> = {}): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 500,
            requestMethod: apiParams.requestMethod,
            message: apiParams.message ?? DEFAULT_MESSAGES.SERVER_ERROR,
            detailMessage: apiParams.detailMessage ?? DEFAULT_DETAILS.SERVER_ERROR,
            data: apiParams.data,
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
    static badRequest<E extends ResponseData>(apiParams: ApiParams<E> = {}): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 400,
            requestMethod: apiParams.requestMethod,
            message: apiParams.message ?? DEFAULT_MESSAGES.BAD_REQUEST,
            detailMessage: apiParams.detailMessage ?? DEFAULT_DETAILS.BAD_REQUEST,
            data: apiParams.data,
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
    static notFound<E extends ResponseData>(apiParams: ApiParams<E> = {}): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 404,
            requestMethod: apiParams.requestMethod,
            message: apiParams.message ?? DEFAULT_MESSAGES.NOT_FOUND,
            detailMessage: apiParams.detailMessage ?? DEFAULT_DETAILS.NOT_FOUND,
            data: apiParams.data,
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
    static conflict<E extends ResponseData>(apiParams: ApiParams<E> = {}): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 409,
            requestMethod: apiParams.requestMethod,
            message: apiParams.message ?? DEFAULT_MESSAGES.CONFLICT,
            detailMessage: apiParams.detailMessage ?? DEFAULT_DETAILS.CONFLICT,
            data: apiParams.data,
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
    static unauthorized<E extends ResponseData>(apiParams: ApiParams<E> = {}): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 401,
            requestMethod: apiParams.requestMethod,
            message: apiParams.message ?? DEFAULT_MESSAGES.UNAUTHORIZED,
            detailMessage: apiParams.detailMessage ?? DEFAULT_DETAILS.UNAUTHORIZED,
            data: apiParams.data,
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
    static forbidden<E extends ResponseData>(apiParams: ApiParams<E> = {}): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 403,
            requestMethod: apiParams.requestMethod,
            message: apiParams.message ?? DEFAULT_MESSAGES.FORBIDDEN,
            detailMessage: apiParams.detailMessage ?? DEFAULT_DETAILS.FORBIDDEN,
            data: apiParams.data,
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
    static internalServerError<E extends ResponseData>(apiParams: ApiParams<E> = {}): ApiError<E> {
        const params: ApiParams<E> = {
            statusCode: 503,
            requestMethod: apiParams.requestMethod,
            message: apiParams.message ?? DEFAULT_MESSAGES.SERVICE_UNAVAILABLE,
            detailMessage: apiParams.detailMessage ?? DEFAULT_DETAILS.SERVICE_UNAVAILABLE,
            data: apiParams.data,
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
