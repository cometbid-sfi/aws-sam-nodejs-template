export const enum ResponseCode {
    SYS_DEFINED_ERR_CODE = 'SYSTEM-ERR',
    APP_DEFINED_ERR_CODE = 'APP-DEF-001',
    APP_SERVER_ERR_CODE = 'APP-SER-001',
    AUTHENTICATION_ERR_CODE = 'AUTH-ERR-001',
    BAD_REQUEST_ERR_CODE = 'BAD-REQ-001',
    BLOCKED_PROFILE_REQUEST_ERR_CODE = 'BLKD-REQ-001',
    CONSTRAINT_VIOLATION_ERR_CODE = 'INV-DATA-001',
    EVENT_PROCESSING_ERR_CODE = 'EVENT-001',
    IMAGE_CONVERSION_ERR_CODE = 'IMG-CONV-001',
    INVALID_PARAMETER_ERR_CODE = 'INV-PARAM-001',
    INVALID_INPUT_ERR_CODE = 'INV-INPUT-001',
    MAX_LOGIN_ATTEMPT_ERR_CODE = 'MAX-LOGIN-ATT-001',
    EMP_NOT_FOUND_ERR_CODE = 'EMP-NF-001',
    INVALID_PASSWORD_ERR_CODE = 'INV-PASWD-001',
    UNAUTHENTICATED_REQUEST_ERR_CODE = 'UN-AUTH-001',
    UNAUTHORIZED_ACCESS_ERR_CODE = 'UN-ACCESS-001',
    EXPIRED_SESSION_ERR_CODE = 'EXP-SESSION-001',
    TOO_MANY_REQUEST_ERR_CODE = 'ILLE_REQ_001',
    INVALID_ACTIVATION_TOKEN_ERR_CODE = 'INV-ATOKEN-001',
    INVALID_JWT_TOKEN_ERR_CODE = 'INV-JTOKEN-001',
    UNAUTHENTICATED_USER_ERR_CODE = 'USR-UNAUTH-001',
    UNUSUAL_LOCATION_ERR_CODE = 'UN-LOC-001',
    INVALID_ACCOUNT_ERR_CODE = 'INV-ACCT-001',
    UNVERIFIED_ACCOUNT_ERR_CODE = 'UNV-ACCT-001',
    ACCT_TYPE_NOT_FOUND_ERR_CODE = 'ACTYP-NF-001',
    INACTIVE_MERCHANT_ERR_CODE = 'NA-M-001',
    INACTIVE_ACCOUNT_ERR_CODE = 'NA-ACCT-001',
    INACTIVE_PROFILE_ERR_CODE = 'NA-USR-001',
    INSUFFICIENT_FUND_ERR_CODE = 'INS-FUND-001',
    MAX_MEMBER_ALLOWED_ERR_CODE = 'MAX-MEM-001',
    MAX_USER_ALLOWED_ERR_CODE = 'MAX-USR-001',
    MEMBER_EXIST_ERR_CODE = 'MEM-EXIST-001',
    MERCHANT_EXIST_ERR_CODE = 'M-EXIST-001',
    MERCHANT_NOT_FOUND_ERR_CODE = 'M-NF-001',
    ACCOUNT_NOT_FOUND_ERR_CODE = 'ACCT-NF-001',
    EMP_EXIST_ERR_CODE = 'EMP-EXIST-001',
    USER_EXIST_ERR_CODE = 'USR-EXIST-001',
    USER_NOT_FOUND_ERR_CODE = 'USR-NF-001',
    EXPIRED_PROFILE_ERR_CODE = 'USR-EXP-001',
    DISABLED_PROFILE_ERR_CODE = 'USR-DIS-001',
    NOATTRIBUTES_PROFILE_ERR_CODE = 'USR-NOATTR-001',
    LOCKED_PROFILE_ERR_CODE = 'USR-LOCK-001',
    UNVERIFIED_PROFILE_ERR_CODE = 'USR-UNV-001',
    CONNECTION_TIMEOUT_ERR_CODE = 'TIMEOUT-001',
    REQUEST_TIMEOUT_ERR_CODE = 'TIMEOUT-002',
    UNAVAILABLE_SERVICE_ERR_CODE = 'UN-SERV-001',
    INVALID_NEWLOCATION_TOKEN_ERR_CODE = 'INV-LOCTOKEN-001',
    RESOURCE_EXIST_ERR_CODE = 'RSC-EXIST-001',
    RESOURCE_CONVERSION_ERR_CODE = 'RSC-CONV-001',
    HTTP_MEDIATYPE_NOT_SUPPORTED = 'HTTP-ERR-0002',
    HTTP_MESSAGE_NOT_WRITABLE = 'HTTP-ERR-0003',
    HTTP_MEDIA_TYPE_NOT_ACCEPTABLE = 'HTTP-ERR-0004',
    JSON_PARSE_ERROR = 'HTTP-ERR-0005',
    HTTP_MESSAGE_NOT_READABLE = 'HTTP-ERR-0006',
    HTTP_REQUEST_METHOD_NOT_SUPPORTED = 'HTTP-REQ-METHOD-0001',
    ILLEGAL_ARGUMENT_EXCEPTION = 'ILL-ARG-0001',
    RESOURCE_CREATED_CODE = 'RSC-CREATED-001',
    RESOURCE_UPDATED_CODE = 'RSC-UPDATED-001',
    RESOURCE_DELETED_CODE = 'RSC-DELETED-001',
    INTERNAL_SERVER_ERR_CODE = 'SERVER-ERR-CODE',
    RESOURCE_READ_SUCCESS_CODE = 'RSC-READ-SUCCESS-001',
    VALIDATION_ERR_CODE = 'VALIDATION_ERR_CODE',
    BUSINESS_ERR_CODE = 'BUSINESS_ERR_CODE',
    SECURITY_ERR_CODE = 'SECURITY_ERR_CODE',
    DATABASE_ERR_CODE = 'DATABASE_ERR_CODE',
    NETWORK_ERR_CODE = 'NETWORK_ERR_CODE',
    INTEGRATION_ERR_CODE = 'INTEGRATION_ERR_CODE',
    GATEWAY_TIMEOUT_ERR_CODE = 'GATEWAY_TIMEOUT_ERR_CODE',
    BAD_GATEWAY_ERR_CODE = 'BAD_GATEWAY_ERR_CODE',
    NOT_IMPLEMENTED_ERR_CODE = 'NOT_IMPLEMENTED_ERR_CODE',
    SERVICE_UNAVAILABLE_ERR_CODE = 'SERVICE_UNAVAILABLE_ERR_CODE',
    CONFLICT_ERR_CODE = 'CONFLICT_ERR_CODE',
    PRECONDITION_FAILED_ERR_CODE = 'PRECONDITION_FAILED_ERR_CODE',
    UNPROCESSABLE_ENTITY_ERR_CODE = 'UNPROCESSABLE_ENTITY_ERR_CODE',
    FORBIDDEN_ERR_CODE = 'FORBIDDEN_ERR_CODE',
    METHOD_NOT_ALLOWED_ERR_CODE = 'METHOD_NOT_ALLOWED_ERR_CODE',
    TOO_MANY_REQUESTS_ERR_CODE = 'TOO_MANY_REQUESTS_ERR_CODE',
    RESOURCE_NOT_FOUND_ERR_CODE = 'RESOURCE_NOT_FOUND_ERR_CODE',
}

/**
 * Maps ResponseCode to HTTP status code
 */
export const ResponseCodeMapping: Record<ResponseCode, number> = {
    // Success mappings
    [ResponseCode.RESOURCE_READ_SUCCESS_CODE]: 200,
    [ResponseCode.RESOURCE_CREATED_CODE]: 201,
    [ResponseCode.RESOURCE_UPDATED_CODE]: 200,
    [ResponseCode.RESOURCE_DELETED_CODE]: 204,

    // Client error mappings
    [ResponseCode.BAD_REQUEST_ERR_CODE]: 400,
    [ResponseCode.UNAUTHORIZED_ACCESS_ERR_CODE]: 401,
    [ResponseCode.FORBIDDEN_ERR_CODE]: 403,
    [ResponseCode.EMP_NOT_FOUND_ERR_CODE]: 404,
    [ResponseCode.USER_NOT_FOUND_ERR_CODE]: 404,
    [ResponseCode.ACCOUNT_NOT_FOUND_ERR_CODE]: 404,
    [ResponseCode.RESOURCE_NOT_FOUND_ERR_CODE]: 404,
    [ResponseCode.METHOD_NOT_ALLOWED_ERR_CODE]: 405,
    [ResponseCode.CONFLICT_ERR_CODE]: 409,
    [ResponseCode.PRECONDITION_FAILED_ERR_CODE]: 412,
    [ResponseCode.UNPROCESSABLE_ENTITY_ERR_CODE]: 422,
    [ResponseCode.TOO_MANY_REQUESTS_ERR_CODE]: 429,

    // Server error mappings
    [ResponseCode.INTERNAL_SERVER_ERR_CODE]: 500,
    [ResponseCode.APP_SERVER_ERR_CODE]: 500,
    [ResponseCode.NOT_IMPLEMENTED_ERR_CODE]: 501,
    [ResponseCode.BAD_GATEWAY_ERR_CODE]: 502,
    [ResponseCode.SERVICE_UNAVAILABLE_ERR_CODE]: 503,
    [ResponseCode.GATEWAY_TIMEOUT_ERR_CODE]: 504,

    // Custom error mappings
    [ResponseCode.APP_DEFINED_ERR_CODE]: 500,
    [ResponseCode.VALIDATION_ERR_CODE]: 400,
    [ResponseCode.BUSINESS_ERR_CODE]: 422,
    [ResponseCode.SECURITY_ERR_CODE]: 403,
    [ResponseCode.DATABASE_ERR_CODE]: 500,
    [ResponseCode.NETWORK_ERR_CODE]: 503,
    [ResponseCode.INTEGRATION_ERR_CODE]: 502,
    [ResponseCode.SYS_DEFINED_ERR_CODE]: 0,
    [ResponseCode.AUTHENTICATION_ERR_CODE]: 0,
    [ResponseCode.BLOCKED_PROFILE_REQUEST_ERR_CODE]: 0,
    [ResponseCode.CONSTRAINT_VIOLATION_ERR_CODE]: 0,
    [ResponseCode.EVENT_PROCESSING_ERR_CODE]: 0,
    [ResponseCode.IMAGE_CONVERSION_ERR_CODE]: 0,
    [ResponseCode.INVALID_PARAMETER_ERR_CODE]: 0,
    [ResponseCode.INVALID_INPUT_ERR_CODE]: 0,
    [ResponseCode.MAX_LOGIN_ATTEMPT_ERR_CODE]: 0,
    [ResponseCode.INVALID_PASSWORD_ERR_CODE]: 0,
    [ResponseCode.UNAUTHENTICATED_REQUEST_ERR_CODE]: 0,
    [ResponseCode.EXPIRED_SESSION_ERR_CODE]: 0,
    [ResponseCode.TOO_MANY_REQUEST_ERR_CODE]: 0,
    [ResponseCode.INVALID_ACTIVATION_TOKEN_ERR_CODE]: 0,
    [ResponseCode.INVALID_JWT_TOKEN_ERR_CODE]: 0,
    [ResponseCode.UNAUTHENTICATED_USER_ERR_CODE]: 0,
    [ResponseCode.UNUSUAL_LOCATION_ERR_CODE]: 0,
    [ResponseCode.INVALID_ACCOUNT_ERR_CODE]: 0,
    [ResponseCode.UNVERIFIED_ACCOUNT_ERR_CODE]: 0,
    [ResponseCode.ACCT_TYPE_NOT_FOUND_ERR_CODE]: 0,
    [ResponseCode.INACTIVE_MERCHANT_ERR_CODE]: 0,
    [ResponseCode.INACTIVE_ACCOUNT_ERR_CODE]: 0,
    [ResponseCode.INACTIVE_PROFILE_ERR_CODE]: 0,
    [ResponseCode.INSUFFICIENT_FUND_ERR_CODE]: 0,
    [ResponseCode.MAX_MEMBER_ALLOWED_ERR_CODE]: 0,
    [ResponseCode.MAX_USER_ALLOWED_ERR_CODE]: 0,
    [ResponseCode.MEMBER_EXIST_ERR_CODE]: 0,
    [ResponseCode.MERCHANT_EXIST_ERR_CODE]: 0,
    [ResponseCode.MERCHANT_NOT_FOUND_ERR_CODE]: 0,
    [ResponseCode.EMP_EXIST_ERR_CODE]: 0,
    [ResponseCode.USER_EXIST_ERR_CODE]: 0,
    [ResponseCode.EXPIRED_PROFILE_ERR_CODE]: 0,
    [ResponseCode.DISABLED_PROFILE_ERR_CODE]: 0,
    [ResponseCode.NOATTRIBUTES_PROFILE_ERR_CODE]: 0,
    [ResponseCode.LOCKED_PROFILE_ERR_CODE]: 0,
    [ResponseCode.UNVERIFIED_PROFILE_ERR_CODE]: 0,
    [ResponseCode.CONNECTION_TIMEOUT_ERR_CODE]: 0,
    [ResponseCode.REQUEST_TIMEOUT_ERR_CODE]: 0,
    [ResponseCode.UNAVAILABLE_SERVICE_ERR_CODE]: 0,
    [ResponseCode.INVALID_NEWLOCATION_TOKEN_ERR_CODE]: 0,
    [ResponseCode.RESOURCE_EXIST_ERR_CODE]: 0,
    [ResponseCode.RESOURCE_CONVERSION_ERR_CODE]: 0,
    [ResponseCode.HTTP_MEDIATYPE_NOT_SUPPORTED]: 0,
    [ResponseCode.HTTP_MESSAGE_NOT_WRITABLE]: 0,
    [ResponseCode.HTTP_MEDIA_TYPE_NOT_ACCEPTABLE]: 0,
    [ResponseCode.JSON_PARSE_ERROR]: 0,
    [ResponseCode.HTTP_MESSAGE_NOT_READABLE]: 0,
    [ResponseCode.HTTP_REQUEST_METHOD_NOT_SUPPORTED]: 0,
    [ResponseCode.ILLEGAL_ARGUMENT_EXCEPTION]: 0,
};

/**
 * Helper function to get HTTP status code from ResponseCode
 */
export function getHttpStatusCode(code: ResponseCode): number {
    return ResponseCodeMapping[code] ?? 500;
}

/**
 * Helper function to check if ResponseCode is a success code
 */
export function isSuccessCode(code: ResponseCode): boolean {
    const statusCode = ResponseCodeMapping[code];
    return statusCode >= 200 && statusCode < 300;
}

/**
 * Helper function to check if ResponseCode is an error code
 */
export function isErrorCode(code: ResponseCode): boolean {
    return !isSuccessCode(code);
}

// ResponseCode.ts
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export const REQUEST_METHODS: Readonly<Record<string, RequestMethod>> = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
} as const;

/**
 * Default response messages
 */
export const DEFAULT_MESSAGES = Object.freeze({
    // Success messages
    SUCCESS: 'Operation successful',
    READ: 'Read operation completed successfully',
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',

    // Error messages
    BAD_REQUEST: 'Invalid request parameters',
    UNAUTHORIZED: 'Authentication required',
    FORBIDDEN: 'Access denied',
    NOT_FOUND: 'Resource not found',
    CONFLICT: 'Resource conflict',
    VALIDATION_ERROR: 'Validation failed',
    SERVER_ERROR: 'Internal server error',
    SERVICE_UNAVAILABLE: 'Service temporarily unavailable',

    // Authentication messages
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful',
    TOKEN_EXPIRED: 'Authentication token expired',
    INVALID_CREDENTIALS: 'Invalid credentials',

    // Data messages
    DATA_FETCH_SUCCESS: 'Data retrieved successfully',
    DATA_UPDATE_SUCCESS: 'Data updated successfully',
    DATA_DELETE_SUCCESS: 'Data deleted successfully',

    // User messages
    USER_CREATED: 'User created successfully',
    USER_UPDATED: 'User profile updated',
    USER_DELETED: 'User account deleted',
    USER_NOT_FOUND: 'User not found',
    USER_EXISTS: 'User already exists',

    // Account messages
    ACCOUNT_CREATED: 'Account created successfully',
    ACCOUNT_UPDATED: 'Account updated successfully',
    ACCOUNT_DELETED: 'Account deleted successfully',
    ACCOUNT_NOT_FOUND: 'Account not found',
    ACCOUNT_EXISTS: 'Account already exists',

    // Permission messages
    PERMISSION_DENIED: 'Permission denied',
    INSUFFICIENT_PRIVILEGES: 'Insufficient privileges',
    ACCESS_RESTRICTED: 'Access restricted',

    // File messages
    FILE_UPLOAD_SUCCESS: 'File uploaded successfully',
    FILE_DELETE_SUCCESS: 'File deleted successfully',
    FILE_NOT_FOUND: 'File not found',
    INVALID_FILE_TYPE: 'Invalid file type',

    // System messages
    SYSTEM_ERROR: 'System error occurred',
    MAINTENANCE_MODE: 'System under maintenance',
    RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',

    // Integration messages
    INTEGRATION_ERROR: 'Integration error occurred',
    API_ERROR: 'API error occurred',
    EXTERNAL_SERVICE_ERROR: 'External service error',
} as const);

/**
 * Default response details
 */
export const DEFAULT_DETAILS = Object.freeze({
    // Success details
    SUCCESS: 'The operation completed successfully',
    READ: 'The requested read operation was completed successfully',
    CREATED: 'The requested resource was created successfully',
    UPDATED: 'The requested resource was updated successfully',
    DELETED: 'The requested resource was deleted successfully',

    // Error details
    BAD_REQUEST: 'The request contains invalid parameters or payload',
    UNAUTHORIZED: 'Please provide valid authentication credentials',
    FORBIDDEN: 'You do not have permission to perform this action',
    NOT_FOUND: 'The requested resource could not be found',
    CONFLICT: 'The request conflicts with existing data',
    VALIDATION_ERROR: 'The request data failed validation checks',
    SERVER_ERROR: 'An unexpected error occurred while processing the request',
    SERVICE_UNAVAILABLE: 'The service is temporarily unavailable. Please try again later',

    // Authentication details
    LOGIN_SUCCESS: 'User authentication completed successfully',
    LOGOUT_SUCCESS: 'User session terminated successfully',
    TOKEN_EXPIRED: 'The authentication token has expired. Please login again',
    INVALID_CREDENTIALS: 'The provided credentials are invalid or incorrect',

    // Data operation details
    DATA_FETCH_SUCCESS: 'The requested data was retrieved successfully',
    DATA_UPDATE_SUCCESS: 'The data was updated successfully in the system',
    DATA_DELETE_SUCCESS: 'The data was permanently deleted from the system',

    // User operation details
    USER_CREATED: 'New user account has been created in the system',
    USER_UPDATED: 'User profile information has been updated',
    USER_DELETED: 'User account has been permanently deleted',
    USER_NOT_FOUND: 'The specified user account does not exist',
    USER_EXISTS: 'A user account with these details already exists',

    // Account operation details
    ACCOUNT_CREATED: 'New account has been created successfully',
    ACCOUNT_UPDATED: 'Account information has been updated',
    ACCOUNT_DELETED: 'Account has been permanently deleted',
    ACCOUNT_NOT_FOUND: 'The specified account does not exist',
    ACCOUNT_EXISTS: 'An account with these details already exists',

    // Permission details
    PERMISSION_DENIED: 'You do not have the required permissions',
    INSUFFICIENT_PRIVILEGES: 'Your account lacks the necessary privileges',
    ACCESS_RESTRICTED: 'Access to this resource is restricted',

    // File operation details
    FILE_UPLOAD_SUCCESS: 'The file was uploaded successfully to the system',
    FILE_DELETE_SUCCESS: 'The file was permanently deleted from the system',
    FILE_NOT_FOUND: 'The requested file could not be found',
    INVALID_FILE_TYPE: 'The provided file type is not supported',

    // System details
    SYSTEM_ERROR: 'A system error occurred. Please contact support',
    MAINTENANCE_MODE: 'The system is undergoing scheduled maintenance',
    RATE_LIMIT_EXCEEDED: 'Request rate limit has been exceeded',

    // Integration details
    INTEGRATION_ERROR: 'An error occurred with external integration',
    API_ERROR: 'An error occurred while processing the API request',
    EXTERNAL_SERVICE_ERROR: 'An error occurred with an external service',
} as const);

/**
 * Type for message keys
 */
export type MessageKey = keyof typeof DEFAULT_MESSAGES;

/**
 * Type for detail keys
 */
export type DetailKey = keyof typeof DEFAULT_DETAILS;

/**
 * Helper function to get message with fallback
 */
export function getMessage(key: MessageKey, fallback?: string): string {
    return DEFAULT_MESSAGES[key] ?? fallback ?? DEFAULT_MESSAGES.SERVER_ERROR;
}

/**
 * Helper function to get detail with fallback
 */
export function getDetail(key: DetailKey, fallback?: string): string {
    return DEFAULT_DETAILS[key] ?? fallback ?? DEFAULT_DETAILS.SERVER_ERROR;
}

/**
 * Helper function to create message-detail pair
 */
export function createMessagePair(
    messageKey: MessageKey,
    detailKey?: DetailKey,
): {
    message: string;
    detailMessage: string;
} {
    return {
        message: getMessage(messageKey),
        detailMessage: getDetail(detailKey ?? (messageKey as DetailKey)),
    };
}

export interface Entity {
    id: string;
    type: string;
}

export interface ErrorDetail {
    field: string;
    message: string;
}

export type ResponseData = ErrorDetail[] | Entity;
