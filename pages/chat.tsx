/* eslint-disable no-invalid-this */

import Link from 'next/link';
import Head from 'next/head';
import { NextPageContext } from 'next';
import { Component, Fragment } from 'react';

import { IMessageData, IUserData } from '../server/types';
import Chat from '../components/chat';

interface IChatPageProps {
    id: string;
}

interface IChatPageState {
    interlocutor?: IUserData;
    interlocutorLoading: boolean;
    messages: IMessageData[];
    messagesLoading: boolean;
}

export default class ChatPage extends Component<IChatPageProps, IChatPageState> {
    static async getInitialProps({ query }: NextPageContext): Promise<IChatPageProps> {
        let id = '';
        if (query.id) {
            id = query.id as string;
        }

        return { id };
    }

    state: IChatPageState = {
        interlocutor: undefined,
        interlocutorLoading: true,
        messages: [],
        messagesLoading: true
    };

    componentDidMount() : void {
        this.fetchInterlocutor();
    }

    fetchInterlocutor = (): void => {
        fetch(`/api/contacts/${this.props.id}`)
            .then((response) => response.json())
            .then((interlocutor) => this.setState({ interlocutor, interlocutorLoading: false }));
    }

    fetchMessages = (): void => {
        fetch('/api/messages')
            .then((response) => response.json())
            .then((messages) => this.setState({ messages, messagesLoading: false }));
    }

    handleSubmit = (message: IMessageData): void => {
        fetch('/api/messages', {
            body: JSON.stringify({ message }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(this.fetchMessages);
    }

    private get content(): JSX.Element {
        const { interlocutor, interlocutorLoading, messages, messagesLoading } = this.state;

        if (interlocutorLoading) {
            return <p>Загрузка пользователя...</p>;
        } else if (!interlocutor) {
            return <p>Пользователь с таким id не найден!</p>;
        }

        return <Chat
            interlocutor={interlocutor}
            messages={messages}
            messagesLoading={messagesLoading}
            onSubmit={this.handleSubmit}/>;
    }

    render() : JSX.Element {

        return (
            <Fragment>
                <Head>
                    <title>Сообщения</title>
                </Head>
                <Link as="/contacts" href="/contacts"><a>Назад</a></Link>
                {this.content}
            </Fragment>
        );
    }
}
