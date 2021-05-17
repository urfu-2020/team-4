import { Component } from 'react';

import { IUserData } from '../../server/types';
import ContactCard from './contactCard';
import styles from './index.module.css';

interface IContactsProps {
    contacts: IUserData[];
    owner: IUserData
}

export default class Contacts extends Component<IContactsProps> {
    private get content(): JSX.Element {
        const contacts = this.props.contacts;

        return !contacts.length
            ? <p className={styles.info}>У вас ещё нет контактов :(</p>
            : (
                <ul className={styles.userList}>
                    {
                        contacts.map((user) =>
                            <ContactCard key={user.id}
                                user={user}
                                owner={this.props.owner}
                            />)
                    }
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
