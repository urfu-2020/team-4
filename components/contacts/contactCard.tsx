import { IUserData } from '../../server/types';
import styles from './index.module.css';
import Link from 'next/link';

interface IContactProps {
    user: IUserData
}

export default function ContactCard({ user }: IContactProps) : JSX.Element {
    const linkHref = { pathname: '/chat', query: { id: user.id } };

    return (
        <li className={styles.userCard} key={user.id}>
            <div className={styles.avatarContainer}>
                <img src={user.avatar} alt="avatar"
                    className={styles.avatarImage}/>
            </div>
            <Link as={`/contacts/${user.id}`} href={linkHref}>
                <a className={styles.userName}>{user.nickname}</a>
            </Link>
        </li>
    );
}
