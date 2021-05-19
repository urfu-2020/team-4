import { IUserData } from '../../server/types';
import styles from './index.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import { Component } from 'react';

interface IContactProps {
    user: IUserData
    owner: IUserData
}

export default class ContactCard extends Component<IContactProps> {
    render(): JSX.Element {
        const { user, owner } = this.props;
        const linkHref = {
            pathname: '/chat',
            query: { 'contactId': user.id, 'ownerId': owner.id }
        };

        return (
            <Link as={`/contacts/${user.id}`} href={linkHref}>
                <li className={styles.userCard}>
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
}

