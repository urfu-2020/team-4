import Link from 'next/link';

import { IUserData } from '../../server/types';
import styles from './index.module.css';


interface IUsersProps {
    contacts: IUserData[];
}

export default function Contacts({ contacts }: IUsersProps) : JSX.Element {

    return (
        <ul className={styles.userList}>{
            contacts.map((user) => {
                return (
                    <li className={styles.userCard} key={user.id}>
                        <div className={styles.avatarContainer}>
                            <img src={user.avatar} alt="avatar"
                                className={styles.avatarImage}/>
                        </div>
                        <Link as={`/contacts/${user.id}`} href={`/contacts/${user.id}`}>
                            <a className={styles.userName}>{user.nickname}</a>
                        </Link>
                    </li>
                );
            })
        }</ul>
    );
}
