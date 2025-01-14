import { randomUUID } from 'crypto';

export interface ApiResponse {
    statusCode: number;
    path?: string;
    requestMethod: string;
    message: string;
    detailMessage: string;
    data?: unknown;
}

interface ApiMessage extends ApiResponse {
    readonly status: ResponseStatus;
}

interface ApiError extends ApiResponse {
    readonly status: ResponseStatus;
}

interface GenericResponse<T extends ApiResponse> {
    traceId?: string;
    timestamp?: string;
    path?: string;
    code?: ErrorCode;
    apiResponse: T;
}

class GenericResponseBuilder<T extends ApiResponse> {
    private response: GenericResponse<T> = {
        traceId: randomUUID(),
        timestamp: new Date().toISOString(),
        path: '',
        code: ErrorCode.APP_DEFINED_ERR_CODE,
        apiResponse: null as unknown as T,
    };

    setData(data: T): GenericResponseBuilder<T> {
        this.response.apiResponse = data;
        return this;
    }

    setCode(code: ErrorCode): GenericResponseBuilder<T> {
        this.response.code = code;
        return this;
    }

    setPath(path: string): GenericResponseBuilder<T> {
        this.response.path = path;
        return this;
    }

    setApiResponse(apiResponse: T): GenericResponseBuilder<T> {
        this.response.apiResponse = apiResponse;
        return this;
    }

    build(): GenericResponse<T> {
        return { ...this.response };
    }

    // Static factory methods
    public static success<T extends ApiResponse>(
        message = 'Operation successful',
        detailMessage: string,
        path: string,
        code: ErrorCode,
        data?: T,
    ): GenericResponse<ApiMessage> {
        const successResponse: ApiMessage = GenericResponseBuilder.createApiResponse(
            code,
            message,
            detailMessage,
            data,
        );

        return new GenericResponseBuilder<ApiMessage>()
            .setPath(path)
            .setCode(code)
            .setApiResponse(successResponse)
            .build();
    }

    public static error<T extends ApiResponse>(
        message: string,
        detailMessage: string,
        path: string,
        code: ErrorCode,
    ): GenericResponse<ApiError> {
        const errorResponse: ApiError = GenericResponseBuilder.createApiResponse(code, message, detailMessage);

        return new GenericResponseBuilder<ApiError>().setPath(path).setCode(code).setApiResponse(errorResponse).build();
    }

    /**
     *
     * @param code
     * @param message
     * @param detailMessage
     * @param data
     * @returns
     */
    static createApiResponse(code: ErrorCode, message: string, detailMessage: string, data?: any) {
        switch (code) {
            case '200':
                return ApiResponseBuilder.success(message, detailMessage, 'GET');
            case '201':
                return ApiResponseBuilder.created(message, detailMessage);
            case '400':
                return ApiResponseBuilder.badRequest(message, detailMessage, 'POST');
            case '404':
                return ApiResponseBuilder.notFound(message, detailMessage, 'GET');
            case '500':
                return ApiResponseBuilder.internalServerError(message, detailMessage, 'GET');
            default:
                return ApiResponseBuilder.serverError(message, detailMessage, 'GET');
        }
    }
}

export class ApiResponseBuilder {
    private readonly response: ApiResponse = {
        statusCode: 500, // Default status code
        requestMethod: 'UNKNOWN',
        message: '',
        detailMessage: '',
        data: undefined,
    };

    setStatusCode(statusCode: number): ApiResponseBuilder {
        this.response.statusCode = statusCode;
        return this;
    }

    setPath(path: string): ApiResponseBuilder {
        this.response.path = path;
        return this;
    }

    setRequestMethod(method: string): ApiResponseBuilder {
        this.response.requestMethod = method;
        return this;
    }

    setMessage(message: string): ApiResponseBuilder {
        this.response.message = message;
        return this;
    }

    setDetailMessage(detailMessage: string): ApiResponseBuilder {
        this.response.detailMessage = detailMessage;
        return this;
    }

    setData(data: unknown): ApiResponseBuilder {
        this.response.data = data;
        return this;
    }

    build(): ApiResponse {
        // Validate required fields
        if (!this.response.message) {
            throw new Error('Message is required');
        }
        if (!this.response.detailMessage) {
            throw new Error('Detail message is required');
        }

        return { ...this.response };
    }

    // Static factory methods for common response types
    static success(message: string, detailMessage: string, requestMethod: string): ApiResponse {
        return new ApiResponseBuilder()
            .setStatusCode(200)
            .setRequestMethod(requestMethod)
            .setMessage(message)
            .setDetailMessage(detailMessage)
            .build();
    }

    static created(message: string, detailMessage: string): ApiResponse {
        return new ApiResponseBuilder()
            .setStatusCode(201)
            .setRequestMethod('POST')
            .setMessage(message)
            .setDetailMessage(detailMessage)
            .build();
    }

    static updated(message: string, detailMessage: string): ApiResponse {
        return new ApiResponseBuilder()
            .setStatusCode(200)
            .setRequestMethod('PUT')
            .setMessage(message)
            .setDetailMessage(detailMessage)
            .build();
    }

    static deleted(message: string, detailMessage: string): ApiResponse {
        return new ApiResponseBuilder()
            .setStatusCode(200)
            .setRequestMethod('DELETE')
            .setMessage(message)
            .setDetailMessage(detailMessage)
            .build();
    }

    static badRequest(message: string, detailMessage: string, requestMethod: string): ApiResponse {
        return new ApiResponseBuilder()
            .setStatusCode(400)
            .setMessage(message)
            .setDetailMessage(detailMessage)
            .setRequestMethod(requestMethod)
            .build();
    }

    static notFound(message: string, detailMessage: string): ApiResponse {
        return new ApiResponseBuilder()
            .setStatusCode(404)
            .setMessage(message)
            .setDetailMessage(detailMessage)
            .setRequestMethod('GET')
            .build();
    }

    static internalServerError(message: string, detailMessage: string, requestMethod: string): ApiResponse {
        return new ApiResponseBuilder()
            .setStatusCode(503)
            .setMessage(message)
            .setDetailMessage(detailMessage)
            .setRequestMethod(requestMethod)
            .build();
    }

    static serverError(message: string, detailMessage: string, requestMethod: string): ApiResponse {
        return new ApiResponseBuilder()
            .setStatusCode(500)
            .setMessage(message)
            .setDetailMessage(detailMessage)
            .setRequestMethod(requestMethod)
            .build();
    }
}

//=======================================================================
// Using the builder directly
const customResponse = new ApiResponseBuilder()
    .setStatusCode(200)
    .setPath('/api/users')
    .setRequestMethod('GET')
    .setMessage('User retrieved successfully')
    .setDetailMessage('User with ID 123 was found')
    .build();

// Using static factory methods
const successResponse = ApiResponseBuilder.success(
    'Operation completed successfully',
    'The requested operation was completed without errors',
);

const errorResponse = ApiResponseBuilder.badRequest('Invalid input', 'The provided email address is not valid');

const notFoundResponse = ApiResponseBuilder.notFound('Resource not found', 'The requested user does not exist');

// Using with GenericResponse
const genericResponse = new GenericResponseBuilder<ApiResponse>()
    .setData(ApiResponseBuilder.success('Operation successful', 'The operation completed successfully'))
    .build();
//=======================================================================
