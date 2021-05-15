import styles from './index.module.css';
import Link from 'next/link';
import classNames from 'classnames';

interface IChatHeaderProps {
    chatName: string
}

export default function ChatHeader({ chatName }: IChatHeaderProps) : JSX.Element {
    const iconBackClasses = classNames('material-icons', styles.navigateBefore);

    return (
        <div className={styles.chatHeader}>
            <Link as="/contacts" href="/contacts">
                <i className={iconBackClasses}>navigate_before</i>
            </Link>

            <span className={styles.chatTitle}>{chatName}</span>
        </div>
    );
}
