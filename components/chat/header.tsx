import styles from './index.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import { IUserData } from '../../server/types';

interface IChatHeaderProps {
    chatName: string
    owner: IUserData
}

export default function ChatHeader({ chatName, owner }: IChatHeaderProps) : JSX.Element {
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

            <span className={styles.chatTitle}>{chatName}</span>
        </div>
    );
}
