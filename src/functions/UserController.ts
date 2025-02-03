// Using static methods
/*
const successResponse = GenericResponseBuilder.success(userData);
const errorResponse = GenericResponseBuilder.error<UserResponse>('Invalid input');
const notFoundResponse = GenericResponseBuilder.notFound<UserResponse>('User');
const unauthorizedResponse = GenericResponseBuilder.unauthorized<UserResponse>();
const badRequestResponse = GenericResponseBuilder.badRequest<UserResponse>('Missing required fields');
const conflictResponse = GenericResponseBuilder.conflict<UserResponse>('Resource already exists');
const forbiddenResponse = GenericResponseBuilder.forbidden<UserResponse>();
const tooManyRequestsResponse = GenericResponseBuilder.tooManyRequests<UserResponse>('Too many requests');
const internalServerErrorResponse = GenericResponseBuilder.internalServerError<UserResponse>('Internal server error');
const serviceUnavailableResponse = GenericResponseBuilder.serviceUnavailable<UserResponse>('Service unavailable');
const gatewayTimeoutResponse = GenericResponseBuilder.gatewayTimeout<UserResponse>('Gateway timeout');
const insufficientStorageResponse = GenericResponseBuilder.insufficientStorage<UserResponse>('Insufficient storage');
const notImplementedResponse = GenericResponseBuilder.notImplemented<UserResponse>('Not implemented');
const networkAuthenticationRequiredResponse = GenericResponseBuilder.networkAuthenticationRequired<UserResponse>(
    'Network authentication required',
);
const payloadTooLargeResponse = GenericResponseBuilder.payloadTooLarge<UserResponse>('Payload too large');
const requestTimeoutResponse = GenericResponseBuilder.requestTimeout<UserResponse>('Request timeout');
const variantAlsoNegotiatesResponse =
    GenericResponseBuilder.variantAlsoNegotiates<UserResponse>('Variant also negotiates');
const insufficientSpaceOnResourceResponse = GenericResponseBuilder.insufficientSpaceOnResource<UserResponse>(
    'Insufficient space on resource',
);
const networkConnectTimeoutErrorResponse = GenericResponseBuilder.networkConnectTimeoutError<UserResponse>(
    'Network connect timeout error',
);
const networkReadTimeoutErrorResponse =
    GenericResponseBuilder.networkReadTimeoutError<UserResponse>('Network read timeout error');
const methodNotAllowedResponse = GenericResponseBuilder.methodNotAllowed<UserResponse>('Method not allowed');
const proxyAuthenticationRequiredResponse = GenericResponseBuilder.proxyAuthenticationRequired<UserResponse>(
    'Proxy authentication required',
);
const requestHeaderFieldsTooLargeResponse = GenericResponseBuilder.requestHeaderFieldsTooLarge<UserResponse>(
    'Request header fields too large',
);
const unprocessableEntityResponse = GenericResponseBuilder.unprocessableEntity<UserResponse>('Unprocessable entity');
const lockedResponse = GenericResponseBuilder.locked<UserResponse>('Resource locked');
const failedDependencyResponse = GenericResponseBuilder.failedDependency<UserResponse>('Failed dependency');
const preconditionRequiredResponse = GenericResponseBuilder.preconditionRequired<UserResponse>('Precondition required');
const preconditionFailedResponse = GenericResponseBuilder.preconditionFailed<UserResponse>('Precondition failed');
*/
/*
import { ApiResponse } from '../models/response/AppResponse';
import { GenericResponse } from '../models/response/GenericResponse';

// Example usage in an API context
class UserController {
    static async getUser(id: string): Promise<GenericResponse<ApiResponse>> {
        try {
            const user = await findUser(id);
            if (!user) {
                return GenericResponseBuilder.notFound<ApiResponse>('User');
            }
            return GenericResponseBuilder.success(user);
        } catch (error: any) {
            return GenericResponseBuilder.error<ApiResponse>(error.message);
        }
    }

    static async createUser(userData: ApiResponse): Promise<GenericResponse<ApiResponse>> {
        try {
            const newUser = await saveUser(userData);
            return GenericResponseBuilder.success(newUser, 'User created successfully');
        } catch (error) {
            return GenericResponseBuilder.error<ApiResponse>('Failed to create user');
        }
    }
}
*/
