/* eslint-disable no-invalid-this */

import { Component, Fragment } from 'react';
import Head from 'next/head';

import { IUserData } from '../server/types';
import Contacts from '../components/contacts';
import Loader from '../components/loader';
import { NextPageContext } from 'next';
import { checkError, getUser } from '../helpers/helpers';

interface IContactsPageProps {
    owner?: IUserData
}

interface IContactsPageState {
    contacts: IUserData[]
    contactsLoading: boolean
}

export default class ContactsPage extends Component<IContactsPageProps, IContactsPageState> {
    static async getInitialProps({ req, query }: NextPageContext): Promise<IContactsPageProps> {
        const owner = await getUser(req, query);

        return { owner };
    }

    state: IContactsPageState = {
        contactsLoading: true,
        contacts: []
    };

    componentDidMount(): void {
        this.fetchContacts()
            .catch((err) => {
                this.setState({ contactsLoading: false });
                console.error('Error: ', err);
            });
    }

    fetchContacts = (): Promise<void> => {
        this.setState({ contactsLoading: true });

        return fetch('/api/contacts')
            .then((response) => response.json())
            .then((response) => {
                checkError(response);
                this.setState(
                    { contactsLoading: false, contacts: response.users }
                );
            });
    }

    private get content(): JSX.Element {
        const { owner } = this.props;
        const { contacts, contactsLoading } = this.state;

        return contactsLoading
            ? <Loader/>
            : <Contacts contacts={contacts} owner={owner}/>;
    }

    render(): JSX.Element {
        return (
            <Fragment>
                <Head>
                    <title>Контакты</title>
                </Head>
                {this.content}
            </Fragment>
        );
    }
}
