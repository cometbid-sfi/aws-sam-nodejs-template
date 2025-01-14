import config from '../../config/config';
import { ApiResponse } from './GenericResponse';

// Use a const enum for status types to improve performance
const enum ResponseStatus {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

// Simplified and readonly metadata interface
type AppMetadata = Readonly<{
    apiVersion: string;
    sendReport?: string;
    moreInfo?: string;
    apiDocUrl?: string;
    technical?: string;
}>;

// Simplified response interface with discriminated union
interface AppResponse {
    readonly success: boolean;
    readonly status: ResponseStatus;
    readonly metadata?: AppMetadata | null;
    readonly response: ApiResponse;
}

// Simplified params interface
interface AppResponseParams {
    readonly response: ApiResponse;
    readonly includeMetadata?: boolean;
}

/**
 * AppResponse Implementation
 */
class AppResponseImpl implements AppResponse {
    // Memoized static metadata configuration
    private static readonly DEFAULT_METADATA: AppMetadata = Object.freeze({
        apiVersion: config.getAppMetadataConfig().apiVersion,
        sendReport: config.getAppMetadataConfig().sendReport,
        moreInfo: config.getAppMetadataConfig().moreInfo,
        apiDocUrl: config.getAppMetadataConfig().apiDocUrl,
        technical: config.getAppMetadataConfig().technical,
    });

    readonly success: boolean;
    readonly status: ResponseStatus;
    readonly metadata: AppMetadata | null;
    readonly response: ApiResponse;

    constructor(
        success: boolean,
        status: ResponseStatus,
        response: ApiResponse,
        includeMetadata: boolean | undefined = true,
    ) {
        this.success = success;
        this.status = status;
        this.response = response;
        this.metadata = includeMetadata ? AppResponseImpl.DEFAULT_METADATA : null;
        Object.freeze(this); // Make instance immutable
    }

    // Static factory methods with improved type safety
    static success({ response, includeMetadata }: AppResponseParams): AppResponse {
        return new AppResponseImpl(true, ResponseStatus.SUCCESS, response, includeMetadata);
    }

    static error({ response, includeMetadata }: AppResponseParams): AppResponse {
        return new AppResponseImpl(false, ResponseStatus.ERROR, response, includeMetadata);
    }

    // Optional builder pattern if needed for more complex scenarios
    static builder(): AppResponseBuilder {
        return new AppResponseBuilder();
    }
}

// Optimized builder with better type safety
class AppResponseBuilder {
    private success!: boolean;
    private status: ResponseStatus = ResponseStatus.ERROR;
    private response?: ApiResponse;

    setSuccess(success: boolean): this {
        this.success = success;
        return this;
    }

    setStatus(status: ResponseStatus): this {
        this.status = status;
        return this;
    }

    setResponse(response: ApiResponse): this {
        this.response = response;
        return this;
    }

    build(includeMetadata: boolean | undefined = true): AppResponse {
        if (!this.response) {
            throw new Error('Response is required');
        }

        return new AppResponseImpl(this.success, this.status, this.response, includeMetadata);
    }
}

//===========================================================
const apiResponse = {
    message: 'An error occurred',
    code: 'ERROR_CODE',
    statusCode: 500,
    detailMessage: 'Error details',
    status: ResponseStatus.ERROR,
    requestMethod: 'GET',
    requestId: 'XXXXXXXXXX',
    timestamp: new Date().toISOString(),
};

// Success response
const successResponse = AppResponseImpl.success({
    response: apiResponse,
    includeMetadata: true,
});

const errorApiResponse = {
    message: 'An error occurred',
    code: 'ERROR_CODE',
    statusCode: 500,
    detailMessage: 'Error details',
    status: ResponseStatus.ERROR,
    requestMethod: 'GET',
    requestId: 'XXXXXXXXXX',
    timestamp: new Date().toISOString(),
};

// Error response
const errorResponse = AppResponseImpl.error({
    response: errorApiResponse,
    includeMetadata: false,
});

// Using builder for complex scenarios
const customResponse = AppResponseImpl.builder()
    .setSuccess(true)
    .setStatus(ResponseStatus.SUCCESS)
    .setResponse(apiResponse)
    .build(true);
//============================================================
