import { ApiResponse } from '../GenericResponse';

class ApiError implements ApiResponse {
    status: number;
    message: string;
    path?: string;
    timestamp: string;
    traceId?: string;
    requestMethod: string;

    constructor() {
        this.status = 500;
        this.message = '';
        this.requestMethod = '';
        this.timestamp = new Date().toISOString();
    }

    // Static factory methods
    static builder(): ApiErrorBuilder {
        return new ApiErrorBuilder();
    }

    static badRequest(message: string): ApiResponse {
        return ApiError.builder().status(400).message(message).build();
    }

    static unauthorized(message: string | undefined = 'Unauthorized'): ApiResponse {
        return ApiError.builder().status(401).message(message).build();
    }

    static forbidden(message: string | undefined = 'Forbidden'): ApiResponse {
        return ApiError.builder().status(403).message(message).build();
    }

    static notFound(message: string | undefined = 'Resource not found'): ApiResponse {
        return ApiError.builder().status(404).message(message).build();
    }

    static methodNotAllowed(message: string | undefined = 'Method not allowed'): ApiResponse {
        return ApiError.builder().status(405).message(message).build();
    }

    static conflict(message: string | undefined = 'Conflict'): ApiResponse {
        return ApiError.builder().status(409).message(message).build();
    }

    static internalServer(message: string | undefined = 'Internal server error'): ApiResponse {
        return ApiError.builder().status(500).message(message).build();
    }

    static serviceUnavailable(message: string | undefined = 'Service unavailable'): ApiResponse {
        return ApiError.builder().status(503).message(message).build();
    }

    static error(message: string): ApiResponse {
        return ApiError.builder().status(500).message(message).build();
    }

    toJSON(): ApiResponse {
        return {
            status: this.status,
            message: this.message,
            path: this.path,
            timestamp: this.timestamp,
            traceId: this.traceId,
        } as ApiResponse;
    }

    // Builder-style methods for optional fields
    withPath(path: string): ApiError {
        this.path = path;
        return this;
    }

    withTraceId(traceId: string): ApiError {
        this.traceId = traceId;
        return this;
    }
}

class ApiErrorBuilder {
    private apiError: ApiError;

    constructor() {
        this.apiError = new ApiError();
    }

    status(status: number): ApiErrorBuilder {
        this.apiError.status = status;
        return this;
    }

    message(message: string): ApiErrorBuilder {
        this.apiError.message = message;
        return this;
    }

    withPath(path: string): ApiErrorBuilder {
        this.apiError.path = path;
        return this;
    }

    withTraceId(traceId: string): ApiErrorBuilder {
        this.apiError.traceId = traceId;
        return this;
    }

    withTimestamp(timestamp: string): ApiErrorBuilder {
        this.apiError.timestamp = timestamp;
        return this;
    }

    build(): ApiResponse {
        if (!this.message) {
            throw new Error('Message is required');
        }
        return { ...this.apiError } as ApiResponse;
    }
}
