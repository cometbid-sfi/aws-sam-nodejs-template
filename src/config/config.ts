const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, APP_TIMEZONE } = process.env;
const { APP_VERSION, REPORT_URL, MORE_INFO_URL, API_DOC_URL, SUPPORT_EMAIL } = process.env;
/*
export default {
    db_username: DB_USERNAME,
    db_password: DB_PASSWORD,
    db_host: DB_HOST,
    db_port: DB_PORT,
    db_name: DB_NAME,
    app_timezone: APP_TIMEZONE,
};
*/

const config = {
    env: process.env.NODE_ENV || 'development',
    debug: process.env.APP_DEBUG === 'true',
    port: parseInt(process.env.PORT || '3000'),
    app_timezone: APP_TIMEZONE,

    getDatabaseConfig: () => ({
        db_host: DB_HOST,
        db_port: parseInt(DB_PORT || '3306'),
        database: DB_NAME,
        db_username: DB_USERNAME,
        db_password: DB_PASSWORD,
        app_timezone: APP_TIMEZONE,
    }),

    getAppMetadataConfig: () => ({
        apiVersion: APP_VERSION || '1.0.0',
        sendReport: REPORT_URL,
        moreInfo: MORE_INFO_URL,
        apiDocUrl: API_DOC_URL,
        technical: SUPPORT_EMAIL,
    }),
};

export default config;
