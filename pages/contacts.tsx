/* eslint-disable no-invalid-this */

import { Component, Fragment } from 'react';
import Head from 'next/head';

import { IUserData } from '../server/types';
import Contacts from '../components/contacts';
import Loader from '../components/loader';
import { NextPageContext } from 'next';

interface IContactsPageProps {
    owner: IUserData
}

interface IContactsPageState {
    contacts: IUserData[]
    contactsLoading: boolean
}

export default class ContactsPage extends Component<IContactsPageProps, IContactsPageState> {
    static async getInitialProps({ req, query }: NextPageContext): Promise<IContactsPageProps> {
        let owner;
        if (req && Object.prototype.hasOwnProperty.call(req, 'user')) {
            // @ts-ignore
            owner = req.user;
        } else if (query.ownerId) {
            owner = await fetch(`/api/contacts/${query.ownerId}`)
                .then((response) => response.json());
        }

        return { owner };
    }

    state: IContactsPageState = {
        contactsLoading: true,
        contacts: []
    };

    componentDidMount(): void {
        this.fetchContacts();
    }

    fetchContacts = (): void => {
        fetch('/api/contacts')
            .then((response) => response.json())
            .then((response) => this.setState(
                { contactsLoading: false, contacts: response.contacts }
            ));
    }

    private get content(): JSX.Element {
        const { contacts, contactsLoading } = this.state;

        return contactsLoading
            ? <Loader/>
            : <Contacts contacts={contacts} owner={this.props.owner}/>;
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
