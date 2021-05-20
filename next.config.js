/* eslint-disable @typescript-eslint/no-var-requires */
const packageJson = require('./package.json');

module.exports = {
    useFileSystemPublicRoutes: false,
    externalResolver: true,
    env: {
        staticBasePath: process.env.NODE_ENV === 'production'
            ? `//${packageJson.name}.surge.sh/`
            : '/'
    }
};
