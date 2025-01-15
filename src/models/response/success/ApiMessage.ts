import { ApiResponse } from '../AppResponse';
import { DEFAULT_DETAILS, DEFAULT_MESSAGES, ResponseData, REQUEST_METHODS, RequestMethod } from '../ResponseCode';

// Interface for ApiMessage constructor
interface ApiMessageParams<E> {
    statusCode?: number;
    path?: string;
    requestMethod?: RequestMethod;
    message?: string;
    detailMessage?: string;
    data?: E;
}

export class ApiMessage<E extends ResponseData> implements ApiResponse<E> {
    readonly statusCode: number;
    readonly path?: string;
    readonly message: string;
    readonly detailMessage: string;
    readonly data?: E;

    constructor(params: ApiMessageParams<E> = {}) {
        this.statusCode = params.statusCode ?? 200;
        this.path = params.path;
        this.message = params.message ?? '';
        this.detailMessage = params.detailMessage ?? '';
        this.data = params.data;
        Object.freeze(this);
    }

    static builder<E extends ResponseData>(): ApiMessageBuilder<E> {
        return new ApiMessageBuilder<E>();
    }

    // Optimized static factory methods
    static read<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.SUCCESS,
        detailMessage: string = DEFAULT_DETAILS.SUCCESS,
        data?: E,
    ): ApiMessage<E> {
        return new ApiMessage({
            statusCode: 200,
            message,
            detailMessage,
            data,
            requestMethod: REQUEST_METHODS.GET,
        });
    }

    static created<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.CREATED,
        detailMessage: string = DEFAULT_DETAILS.CREATED,
        data?: E,
    ): ApiMessage<E> {
        return new ApiMessage({
            statusCode: 201,
            message,
            detailMessage,
            data,
            requestMethod: REQUEST_METHODS.POST,
        });
    }

    static updated<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.UPDATED,
        detailMessage: string = DEFAULT_DETAILS.UPDATED,
        data?: E,
    ): ApiMessage<E> {
        return new ApiMessage({
            statusCode: 200,
            message,
            detailMessage,
            data,
            requestMethod: REQUEST_METHODS.PUT,
        });
    }

    static deleted<E extends ResponseData>(
        message: string = DEFAULT_MESSAGES.DELETED,
        detailMessage: string = DEFAULT_DETAILS.DELETED,
    ): ApiMessage<E> {
        return new ApiMessage({
            statusCode: 204,
            message,
            detailMessage,
            requestMethod: REQUEST_METHODS.DELETE,
        });
    }
}

class ApiMessageBuilder<E extends ResponseData> {
    private params: ApiMessageParams<E> = {
        statusCode: 200,
        message: '',
        detailMessage: '',
        requestMethod: REQUEST_METHODS.GET,
    };

    /**
     * Sets the status code
     */
    status(statusCode: number): this {
        this.params.statusCode = statusCode;
        return this;
    }

    /**
     * Sets the request path
     */
    path(path: string): this {
        this.params.path = path;
        return this;
    }

    /**
     * Sets the response message
     */
    message(message: string): this {
        this.params.message = message;
        return this;
    }

    /**
     * Sets the detailed message
     */
    detailMessage(detailMessage: string): this {
        this.params.detailMessage = detailMessage;
        return this;
    }

    /**
     * Sets the request method
     */
    requestMethod(method: RequestMethod): this {
        this.params.requestMethod = method;
        return this;
    }

    /**
     * Sets the response data
     */
    data(data: E | undefined): this {
        this.params.data = data;
        return this;
    }

    /**
     * Validates the required fields before building
     */
    private validateRequiredFields(): void {
        const { message, detailMessage, requestMethod, statusCode } = this.params;

        if (!message) {
            throw new Error('Message is required');
        }
        if (!detailMessage) {
            throw new Error('Detail message is required');
        }
        if (!requestMethod) {
            throw new Error('Request method is required');
        }
        if (!statusCode || statusCode < 100 || statusCode > 599) {
            throw new Error('Valid status code is required');
        }
    }

    /**
     * Builds the ApiMessage instance
     */
    build(): ApiMessage<E> {
        this.validateRequiredFields();
        return new ApiMessage(this.params);
    }

    /**
     * Creates a success response
     */
    static success<D extends ResponseData>(data?: D): ApiMessage<D> {
        return new ApiMessageBuilder<D>()
            .status(200)
            .message(DEFAULT_MESSAGES.SUCCESS)
            .detailMessage(DEFAULT_DETAILS.SUCCESS)
            .requestMethod(REQUEST_METHODS.GET)
            .data(data)
            .build();
    }

    /**
     * Creates a created response
     */
    static created<D extends ResponseData>(data: D): ApiMessage<D> {
        return new ApiMessageBuilder<D>()
            .status(201)
            .message(DEFAULT_MESSAGES.CREATED)
            .detailMessage(DEFAULT_DETAILS.CREATED)
            .requestMethod(REQUEST_METHODS.POST)
            .data(data)
            .build();
    }

    /**
     * Creates an updated response
     */
    static updated<D extends ResponseData>(data: D): ApiMessage<D> {
        return new ApiMessageBuilder<D>()
            .status(200)
            .message(DEFAULT_MESSAGES.UPDATED)
            .detailMessage(DEFAULT_DETAILS.UPDATED)
            .requestMethod(REQUEST_METHODS.PUT)
            .data(data)
            .build();
    }

    /**
     * Creates a deleted response
     */
    static deleted<D extends ResponseData>(): ApiMessage<D> {
        return new ApiMessageBuilder<D>()
            .status(204)
            .message(DEFAULT_MESSAGES.DELETED)
            .detailMessage(DEFAULT_DETAILS.DELETED)
            .requestMethod(REQUEST_METHODS.DELETE)
            .build();
    }
}

// Type guard for ApiResponse
export function isApiMessage<T>(response: unknown): response is T {
    return response instanceof ApiMessage;
}
