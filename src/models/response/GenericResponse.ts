import { randomUUID } from 'crypto';
import { ApiResponse, AppResponse, AppResponseImpl } from './AppResponse';
import { ResponseCode, ResponseData } from './ResponseCode';

/**
 * Generic response interface for API operations
 */
export interface GenericResponse<T> {
    readonly traceId: string;
    readonly timestamp: string;
    readonly path?: string;
    readonly code: ResponseCode;
    readonly appResponse: AppResponse<T>;
}

/**
 * Implementation of GenericResponse
 */
export class GenericResponseImpl<U extends ResponseData, T extends ApiResponse<U>> implements GenericResponse<T> {
    readonly traceId: string;
    readonly timestamp: string;
    readonly path?: string;
    readonly code: ResponseCode;
    readonly appResponse: AppResponse<T>;

    private constructor(params: {
        traceId?: string;
        timestamp?: string;
        path?: string;
        code: ResponseCode;
        appResponse: AppResponse<T>;
    }) {
        this.traceId = params.traceId ?? randomUUID();
        this.timestamp = params.timestamp ?? new Date().toISOString();
        this.path = params.path;
        this.code = params.code;
        this.appResponse = params.appResponse;
        Object.freeze(this);
    }

    /**
     * Creates a success response
     */
    static success<E extends ResponseData, T extends ApiResponse<E>>(params: {
        message: string;
        detailMessage?: string;
        path?: string;
        code: ResponseCode;
        includeMetadata: boolean;
        data?: E;
    }): GenericResponse<T> {
        const {
            message = 'Operation successful',
            detailMessage = 'The operation completed successfully',
            path,
            code,
            includeMetadata,
            data,
        } = params;

        const appResponse = AppResponseImpl.createAppResponse<E>(
            code,
            message,
            detailMessage,
            includeMetadata,
            data,
        ) as AppResponse<T>;

        return new GenericResponseImpl<E, T>({
            path,
            code,
            appResponse,
        });
    }

    /**
     * Creates an error response
     */
    static error<E extends ResponseData, T extends ApiResponse<E>>(params: {
        message: string;
        detailMessage?: string;
        path?: string;
        code: ResponseCode;
        includeMetadata: boolean;
        errors?: E;
    }): GenericResponse<T> {
        const { message, detailMessage = message, path, code, includeMetadata, errors } = params;

        const appResponse = AppResponseImpl.createAppResponse<E>(
            code,
            message,
            detailMessage,
            includeMetadata,
            errors,
        ) as AppResponse<T>;

        return new GenericResponseImpl<E, T>({
            path,
            code,
            appResponse,
        });
    }
    /**
     * Creates a response from existing AppResponse
     */
    static fromAppResponse<T extends ApiResponse<ResponseData>>(params: {
        path?: string;
        code: ResponseCode;
        appResponse: AppResponse<T>;
    }): GenericResponse<T> {
        return new GenericResponseImpl(params);
    }

    /**
     * Gets the HTTP status code
     */
    getHttpStatusCode(): number {
        return this.appResponse.apiResponse.statusCode ?? 500;
    }

    /**
     * Gets the response data if available
     */
    getData(): T['data'] | undefined {
        return this.appResponse.apiResponse.data;
    }

    /**
     * Gets the response message
     */
    getMessage(): string {
        return this.appResponse.apiResponse.message;
    }

    /**
     * Gets the detailed message
     */
    getDetailMessage(): string {
        return this.appResponse.apiResponse.detailMessage;
    }

    /**
     * Creates a copy with new path
     */
    withPath(path: string): GenericResponse<T> {
        return new GenericResponseImpl({
            ...this,
            path,
        });
    }

    /**
     * Creates a copy with new code
     */
    withCode(code: ResponseCode): GenericResponse<T> {
        return new GenericResponseImpl({
            ...this,
            code,
        });
    }

    /**
     * Converts to plain object
     */
    toJSON(): Record<string, unknown> {
        return {
            traceId: this.traceId,
            timestamp: this.timestamp,
            path: this.path,
            code: this.code,
            httpStatus: this.getHttpStatusCode(),
            appResponse: this.appResponse,
        };
    }
}
