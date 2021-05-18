import styles from './index.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import { IChatData, IUserData } from '../../server/types';

interface IChatHeaderProps {
    chat: IChatData
    owner: IUserData
}

export default function ChatHeader({ chat, owner }: IChatHeaderProps) : JSX.Element {
    const iconBackClasses = classNames('material-icons', styles.navigateBefore);
    const linkHref = {
        pathname: '/contacts',
        query: { 'ownerId': owner.id }
    };

    return (
        <div className={styles.chatHeader}>
            <Link as="/contacts" href={linkHref}>
                <i className={iconBackClasses}>navigate_before</i>
            </Link>

            <span className={styles.chatTitle}>{chat.name}</span>
        </div>
    );
}
