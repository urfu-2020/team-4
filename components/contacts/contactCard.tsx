import { IUserData } from '../../server/types';
import styles from './index.module.css';
import Link from 'next/link';
import classNames from 'classnames';

interface IContactProps {
    user: IUserData
}

export default function ContactCard({ user }: IContactProps): JSX.Element {
    const linkHref = { pathname: '/chat', query: { id: user.id } };

    return (
        <Link as={`/contacts/${user.id}`} href={linkHref}>
            <li className={styles.userCard} key={user.id}>
                <div className={classNames(styles.avatarContainer, styles.column)}>
                    <img src={user.avatar} alt="avatar"
                        className={styles.avatarImage}/>
                </div>
                <div className={classNames(styles.infoContainer, styles.column)}>
                    <span className={styles.userName}>{user.nickname}</span>
                </div>
            </li>
        </Link>
    );
}
