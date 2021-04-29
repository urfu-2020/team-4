import { NextServer } from 'next';
import { DefaultQuery } from 'next/router';
// import * as express from 'express';


declare global {
    namespace Express {
        interface Request {
            nextApp: NextServer;
        }

        interface Request {
            user? : Record<string, any>;
        }

        interface Response {
            // eslint-disable-next-line no-unused-vars
            renderPage(pathname: string, query?: DefaultQuery): void;
        }
    }
}
