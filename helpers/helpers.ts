import { IUserData } from '../server/types';
import Error from 'next/error';
import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';

export function fetchUser(userId: string) : Promise<IUserData> {
    return fetch(`/api/contacts/${userId}`)
        .then((response) => response.json())
        .then((response) => {
            checkError(response);

            return {
                id: response.user.id.toString(),
                nickname: response.user.githubLogin,
                avatar: response.user.avatar
            };
        });
}

export async function getUser(
    req: IncomingMessage, query: ParsedUrlQuery
) : Promise<IUserData | null> {
    if (req && Object.prototype.hasOwnProperty.call(req, 'user')) {
        // @ts-ignore
        const user = req.user;

        return {
            id: user.id.toString(),
            nickname: user.githubLogin,
            avatar: user.avatar
        };
    } else if (query.ownerId) {
        return await fetchUser(query.ownerId as string);
    }

    return null;
}

export function checkError(response: unknown): void {
    if (Object.prototype.hasOwnProperty.call(response, 'error')) {
        // @ts-ignore
        const error = response.error;
        throw new Error({ statusCode: error.code, title: error.messages });
    }
}
