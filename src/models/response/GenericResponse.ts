import { AppResponse, AppResponseImpl } from './AppResponse';
import { REQUEST_METHODS, RequestMethod, ResponseCode, ResponseData } from './ResponseCode';
import config from '../../config/config';
import { ApiParams } from './ApiParams';
import { randomUUID } from '../../util/random-util';

/**
 * Generic response interface for API operations
 */
export interface GenericResponse<U, T> {
    readonly traceId: string;
    readonly timestamp: string;
    readonly path: string;
    readonly code: ResponseCode;
    readonly metadata: AppMetadata | null;
    readonly appResponse: AppResponse<T>;

    getHttpStatusCode: () => number;
    getRequestMethod: () => RequestMethod;
    getDetailMessage: () => string;
    getMessage: () => string;
    getStatus: () => string;
    getData: () => U | undefined;
    isSuccess: () => boolean;
    toJSON: () => Record<string, unknown>;
}

// Simplified and readonly metadata interface
type AppMetadata = Readonly<{
    apiVersion: string;
    sendReport?: string;
    moreInfo?: string;
    apiDocUrl?: string;
    technical?: string;
}>;

/**
 * Implementation of GenericResponse
 */
export class GenericResponseImpl<U extends ResponseData, T extends ApiParams<U>> implements GenericResponse<U, T> {
    // Memoized static metadata configuration
    private static readonly DEFAULT_METADATA: AppMetadata = Object.freeze({
        apiVersion: config.getAppMetadataConfig().apiVersion,
        sendReport: config.getAppMetadataConfig().sendReport,
        moreInfo: config.getAppMetadataConfig().moreInfo,
        apiDocUrl: config.getAppMetadataConfig().apiDocUrl,
        technical: config.getAppMetadataConfig().technical,
    });

    readonly traceId: string;
    readonly timestamp: string;
    readonly path: string;
    readonly code: ResponseCode;
    readonly metadata: AppMetadata | null;
    readonly appResponse: AppResponse<T>;

    private constructor(params: {
        traceId?: string;
        timestamp?: string;
        path: string;
        code: ResponseCode;
        appResponse: AppResponse<T>;
    }) {
        this.traceId = params.traceId ?? randomUUID();
        this.timestamp = params.timestamp ?? new Date().toISOString();
        this.metadata = config.includeApiMetadata ? GenericResponseImpl.DEFAULT_METADATA : null;
        this.path = params.path;
        this.code = params.code;
        this.appResponse = params.appResponse;
        Object.freeze(this);
    }

    /**
     * Creates a success response
     */
    static success<E extends ResponseData, T extends ApiParams<E>>(params: {
        message?: string;
        detailMessage?: string;
        requestMethod?: RequestMethod;
        path: string;
        code: ResponseCode;
        data?: E;
    }): GenericResponse<E, T> {
        const apiParams: ApiParams<E> = params;

        const appResponse = AppResponseImpl.createAppResponse<E, T>(apiParams, params.code) as AppResponse<T>;
        const path = params.path;
        const code = params.code;

        console.log(`Success details: ${appResponse.apiResponse.detailMessage}`);
        console.log(`Success message: ${appResponse.apiResponse.message}`);

        return new GenericResponseImpl<E, T>({ path, code, appResponse });
    }

    /**
     * Creates an error response
     */
    static error<E extends ResponseData, T extends ApiParams<E>>(params: {
        message?: string;
        detailMessage?: string;
        requestMethod?: RequestMethod;
        path: string;
        code: ResponseCode;
        errors?: E;
    }): GenericResponse<E, T> {
        const apiParams: ApiParams<E> = params;
        apiParams.data = params.errors;

        //const { message, detailMessage, requestMethod, path, code, errors }: ApiParams<E> = params;

        const appResponse = AppResponseImpl.createAppResponse<E, T>(apiParams, params.code) as AppResponse<T>;
        const path = params.path;
        const code = params.code;
        //console.log(`Bad Request details: ${appResponse.apiResponse.detailMessage}`);
        //console.log(`Bad Request message: ${appResponse.apiResponse.message}`);

        return new GenericResponseImpl<E, T>({ path, code, appResponse });
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
    getData(): U | undefined {
        return this.appResponse.apiResponse.data;
    }

    /**
     * Gets the response message
     */
    getMessage(): string {
        return this.appResponse.apiResponse.message ?? 'message not specified';
    }

    /**
     * Gets the detailed message
     */
    getDetailMessage(): string {
        return this.appResponse.apiResponse.detailMessage ?? 'detailed message not specified';
    }

    /**
     * Gets the response message
     */
    getRequestMethod(): RequestMethod {
        return this.appResponse.apiResponse.requestMethod ?? REQUEST_METHODS.GET;
    }

    /**
     * Gets the response message
     */
    getStatus(): string {
        return this.appResponse.status;
    }

    /**
     * Gets the response message
     */
    isSuccess(): boolean {
        return this.appResponse.success;
    }

    /**
     * Creates a copy with new path
     */
    /*
    withPath(path: string): GenericResponse<U, T> {
        return new GenericResponseImpl({
            ...this,
            path,
        });
    }
        */

    /**
     * Creates a copy with new code
     */
    /*
    withCode(code: ResponseCode): GenericResponse<U, T> {
        return new GenericResponseImpl({
            ...this,
            code,
        });
    }
        */

    /**
     * Converts to plain object
     */
    toJSON(): Record<string, unknown> {
        return {
            metadata: this.metadata,
            traceId: this.traceId,
            timestamp: this.timestamp,
            success: this.isSuccess(),
            status: this.getStatus(),
            requestMethod: this.getRequestMethod(),
            path: this.path,
            code: this.code,
            statusCode: this.getHttpStatusCode(),
            message: this.getMessage(),
            detailMessage: this.getDetailMessage(),
            data: this.getData(),
            //appResponse: this.appResponse,
        };
    }
}
