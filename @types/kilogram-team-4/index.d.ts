import { DefaultQuery } from 'next/router';

declare global {
    namespace Express {
        interface Request {
            user? : Record<string, any>;
        }

        interface Response {
            renderPage(pathname: string, query?: DefaultQuery): void;
        }
    }
}
