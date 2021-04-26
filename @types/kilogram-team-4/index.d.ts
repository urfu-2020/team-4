import { NextServer } from 'next';
import { DefaultQuery } from 'next/router';


declare global {
    namespace Express {
        // Расширяем интерфейс объекта Request
        interface Request {
            // Добавляем ссылку на Next.js сервер, чтобы иметь к нему доступ в роутере
            nextApp: NextServer;
        }

        // Расширяем интерфейс объекта Response
        interface Response {
            // Добавляем функцию renderPage, которая будет использоваться для отрисовки страниц
            // eslint-disable-next-line no-unused-vars
            renderPage(pathname: string, query?: DefaultQuery): void;
        }
    }
}
