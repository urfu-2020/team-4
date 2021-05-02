import { Component } from 'react';

import { IUserData } from '../../server/types';
import ContactCard from './contactCard';
import styles from './index.module.css';


interface IContactsProps {
    contacts: IUserData[];
}

export default class Contacts extends Component<IContactsProps> {
    render() : JSX.Element {
        const contacts = this.props.contacts;

        if (!contacts.length) {
            return <p>contacts not found!</p>;
        }

        return (
            <ul className={styles.userList}>
                {contacts.map((user) => <ContactCard user={user}/>)}
            </ul>
        );
    }
}
