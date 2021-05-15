/* eslint-disable no-invalid-this */

import { Component, Fragment } from 'react';
import Head from 'next/head';

import { IUserData } from '../server/types';
import Contacts from '../components/contacts';
import Loader from '../components/loader';

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

    private get content(): JSX.Element {
        const { contacts, loading } = this.state;

        return loading
            ? <Loader/>
            : <Contacts contacts={contacts}/>;
    }

    render(): JSX.Element {
        return (
            <Fragment>
                <Head>
                    <title>Контакты</title>
                </Head>
                <div className="pageWrapper">
                    {this.content}
                </div>
            </Fragment>
        );
    }
}
