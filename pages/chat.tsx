/* eslint-disable no-invalid-this */

import Head from 'next/head';
import Error from 'next/error';
import { NextPageContext } from 'next';
import { Component } from 'react';

import { IMessageData, IUserData } from '../server/types';
import Chat from '../components/chat';
import Loader from '../components/loader';

interface IChatPageProps {
    companionId: string;
    ownerId: string;
}

interface IChatPageState {
    owner?: IUserData;
    companion?: IUserData;
    companionLoading: boolean;
    messages: IMessageData[];
    messagesLoading: boolean;
}

export default class ChatPage extends Component<IChatPageProps, IChatPageState> {
    static async getInitialProps({ query, req }: NextPageContext): Promise<IChatPageProps> {
        let companionId;
        if (query.id) {
            companionId = query.id as string;
        }

        let ownerId;
        if (req && Object.prototype.hasOwnProperty.call(req, 'user')) {
            // @ts-ignore
            ownerId = req.user as string;
        }

        return { ownerId, companionId };
    }

    state: IChatPageState = {
        owner: undefined,
        companion: undefined,
        companionLoading: true,
        messages: [],
        messagesLoading: true
    };

    componentDidMount(): void {
        this.fetchCompanion();
        this.fetchMessages();
        this.setState({ owner: { id: this.props.ownerId, nickname: '', avatar: '' } });

        this.fetchContact(this.props.ownerId)
            .then((user) => {
                this.setState({ owner: user });
            });
    }

    fetchCompanion = (): void => {
        this.fetchContact(this.props.companionId)
            .then((companion) => this.setState({ companion, companionLoading: false }));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchContact = (id: string): Promise<any> => {
        return fetch(`/api/contacts/${id}`)
            .then((response) => response.json());
    }

    fetchMessages = (): void => {
        fetch('/api/messages')
            .then((response) => response.json())
            .then((response) => this.setState({
                messages: response.messages
            }))
            .then(() => {
                for (const message of this.state.messages) {
                    message.timestamp = new Date(message.timestamp);
                }
            })
            .then(() => this.setState({ messagesLoading: false }));
    }

    handleSubmit = (message: IMessageData): void => {
        fetch('/api/messages', {
            body: JSON.stringify({ message }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(this.fetchMessages);
    }

    private get content(): JSX.Element {
        const { owner, companion, companionLoading, messages, messagesLoading } = this.state;

        if (companionLoading) {
            return <Loader/>;
        } else if (!companion) {
            return <Error statusCode={404}/>;
        }

        return <Chat
            owner={owner}
            chatName={companion.nickname}
            messages={messages}
            messagesLoading={messagesLoading}
            onSubmit={this.handleSubmit}/>;
    }

    render(): JSX.Element {
        return (
            <div>
                <Head>
                    <title>Сообщения</title>
                    <link rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                </Head>
                {this.content}
            </div>
        );
    }
}
