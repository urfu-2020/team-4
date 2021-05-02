/* eslint-disable no-invalid-this */

import { Component, Fragment } from 'react';
import { IUserData } from '../server/types';

import Contacts from '../components/contacts';

interface IContactsPageProps {
    contacts: IUserData[];
}

interface IContactsPageState {
    contacts: IUserData[];
    loading: boolean;
}

export default class ContactsPage extends Component<IContactsPageProps, IContactsPageState> {
    state: IContactsPageState = {
        loading: true,
        contacts: []
    };

    componentDidMount(): void {
        this.fetchContacts();
    }

    fetchContacts = (): void => {
        fetch('/api/contacts')
            .then((response) => response.json())
            .then((response) => this.setState({ loading: false, contacts: response.contacts }));
    }

    render(): JSX.Element {
        const { contacts, loading } = this.state;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (!contacts.length) {
            return <p>contacts not found!</p>;
        }

        return (
            <Fragment>
                <Contacts contacts={contacts}/>
            </Fragment>
        );
    }
}
