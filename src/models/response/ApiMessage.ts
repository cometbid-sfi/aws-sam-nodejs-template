import { ApiParams, ApiResponseBuilder } from './ApiParams';
import { DEFAULT_DETAILS, DEFAULT_MESSAGES, ResponseData, REQUEST_METHODS, RequestMethod } from './ResponseCode';

export class ApiMessage<E extends ResponseData> implements ApiParams<E> {
    readonly statusCode: number;
    readonly requestMethod?: RequestMethod;
    readonly message: string;
    readonly detailMessage: string;
    readonly data?: E;

    constructor(params: ApiParams<E> = {}) {
        this.statusCode = params.statusCode ?? 200;
        this.requestMethod = params.requestMethod;
        this.message = params.message ?? '';
        this.detailMessage = params.detailMessage ?? '';
        this.data = params.data;
        Object.freeze(this);
    }

    static builder<E extends ResponseData>(): ApiResponseBuilder<E> {
        return new ApiResponseBuilder<E>();
    }

    // Optimized static factory methods
    static read<E extends ResponseData>(data?: E): ApiMessage<E> {
        return ApiMessage.buildReadMessage<E>(data);
    }

    static created<E extends ResponseData>(data?: E): ApiMessage<E> {
        return ApiMessage.buildCreatedMessage<E>(data);
    }

    static updated<E extends ResponseData>(data?: E): ApiMessage<E> {
        return ApiMessage.buildUpdatedMessage<E>(data);
    }

    static deleted<E extends ResponseData>(): ApiMessage<E> {
        return ApiMessage.buildDeletedMessage<E>();
    }

    /**
     * Creates a success response
     */
    private static buildReadMessage<D extends ResponseData>(data?: D): ApiMessage<D> {
        return this.builder<D>()
            .status(200)
            .message(DEFAULT_MESSAGES.SUCCESS)
            .detailMessage(DEFAULT_DETAILS.SUCCESS)
            .requestMethod(REQUEST_METHODS.GET)
            .data(data)
            .buildSuccessMesssage();
    }

    /**
     * Creates a created response
     */
    private static buildCreatedMessage<D extends ResponseData>(data?: D): ApiMessage<D> {
        return new ApiResponseBuilder<D>()
            .status(201)
            .message(DEFAULT_MESSAGES.CREATED)
            .detailMessage(DEFAULT_DETAILS.CREATED)
            .requestMethod(REQUEST_METHODS.POST)
            .data(data)
            .buildSuccessMesssage();
    }

    /**
     * Creates an updated response
     */
    private static buildUpdatedMessage<D extends ResponseData>(data?: D): ApiMessage<D> {
        return new ApiResponseBuilder<D>()
            .status(200)
            .message(DEFAULT_MESSAGES.UPDATED)
            .detailMessage(DEFAULT_DETAILS.UPDATED)
            .requestMethod(REQUEST_METHODS.PUT)
            .data(data)
            .buildSuccessMesssage();
    }

    /**
     * Creates a deleted response
     */
    private static buildDeletedMessage<D extends ResponseData>(): ApiMessage<D> {
        return new ApiResponseBuilder<D>()
            .status(204)
            .message(DEFAULT_MESSAGES.DELETED)
            .detailMessage(DEFAULT_DETAILS.DELETED)
            .requestMethod(REQUEST_METHODS.DELETE)
            .buildSuccessMesssage();
    }
}

// Type guard for ApiResponse
export function isApiMessage<T>(response: unknown): response is T {
    return response instanceof ApiMessage;
}
