import { Component } from 'react';

import { IUserData } from '../../server/types';
import ContactCard from './contactCard';
import styles from './index.module.css';

interface IContactsProps {
    contacts: IUserData[];
}

export default class Contacts extends Component<IContactsProps> {
    private get content(): JSX.Element {
        const contacts = this.props.contacts;

        return !contacts.length
            ? <p className={styles.info}>contacts not found!</p>
            : (
                <ul className={styles.userList}>
                    {contacts.map((user) => <ContactCard user={user}/>)}
                </ul>
            );
    }

    render(): JSX.Element {
        return (
            <div className={styles.wrapper}>
                {this.content}
            </div>
        );
    }
}
