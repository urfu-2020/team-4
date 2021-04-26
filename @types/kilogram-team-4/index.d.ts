import { NextServer } from 'next';
import { DefaultQuery } from 'next/router';


declare global {
    namespace Express {
        interface Request {
            nextApp: NextServer;
        }

        interface Response {
            // eslint-disable-next-line no-unused-vars
            renderPage(pathname: string, query?: DefaultQuery): void;
        }
    }
}
