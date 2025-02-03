import { ApiError } from './ApiError';
import { ApiMessage } from './ApiMessage';
import { REQUEST_METHODS, RequestMethod, ResponseData, ErrorDetail } from './ResponseCode';

// Interface for ApiMessage constructor
export interface ApiParams<E> {
    statusCode?: number;
    //path?: string;
    requestMethod?: RequestMethod;
    message?: string;
    detailMessage?: string;
    data?: E;
}

export class ApiResponseBuilder<E extends ResponseData> {
    private params: ApiParams<E> = {
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
    buildSuccessMesssage(): ApiMessage<E> {
        this.validateRequiredFields();
        return new ApiMessage(this.params);
    }

    /**
     * Builds the ApiMessage instance
     */
    buildErrorMesssage(): ApiError<E> {
        this.validateRequiredFields();

        const data = this.params.data;

        if (data) {
            if (!Array.isArray(data)) {
                throw new Error('Invalid data: should be an Array of ErrorDetail');
            }
            const myData = data as unknown as ErrorDetail[];
            const result = myData.every((it) => 'field' in it && 'message' in it);

            if (!result) {
                throw new Error('Invalid data: field and message required');
            }
        }
        return new ApiError(this.params);
    }
}
