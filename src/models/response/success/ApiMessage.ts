import { ApiResponse } from '../GenericResponse';

class ApiMessage implements ApiResponse {
    message: string;
    data?: unknown;
    requestMethod: string;
    statusCode: number;
    code?: string | undefined;
    detailMessage: string;

    constructor() {
        this.statusCode = 200;
        this.message = '';
        this.detailMessage = '';
        this.requestMethod = '';
    }

    static builder(): ApiMessageBuilder {
        return new ApiMessageBuilder();
    }

    // Static factory methods for common responses
    static success(message: string | undefined = 'Success', data?: unknown): ApiResponse {
        return ApiMessage.builder().status(200).message(message).data(data).build();
    }

    static created(message: string | undefined = 'Resource created', data?: unknown): ApiResponse {
        return ApiMessage.builder().status(201).message(message).data(data).build();
    }

    static updated(message: string | undefined = 'Resource updated', data?: unknown): ApiResponse {
        return ApiMessage.builder().status(202).message(message).data(data).build();
    }

    static deleted(message: string | undefined = 'Resource deleted', data?: unknown): ApiResponse {
        return ApiMessage.builder().status(204).message(message).data(data).build();
    }
}
