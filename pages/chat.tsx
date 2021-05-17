/* eslint-disable no-invalid-this */

import Head from 'next/head';
import Error from 'next/error';
import { NextPageContext } from 'next';
import { Component, Fragment } from 'react';

import { IChatData, IMessageData, IUserData } from '../server/types';
import Chat from '../components/chat';
import Loader from '../components/loader';

interface IChatPageProps {
    owner?: IUserData
    contactId?: string
}

interface IChatPageState {
    chat?: IChatData;
    chatLoading: boolean;
    messages: IMessageData[]
    messagesLoading: boolean
}

export default class ChatPage extends Component<IChatPageProps, IChatPageState> {
    static async getInitialProps(
        { query, req, asPath }: NextPageContext
    ): Promise<IChatPageProps> {
        let owner;
        if (req && Object.prototype.hasOwnProperty.call(req, 'user')) {
            // @ts-ignore
            owner = req.user;
        } else if (query.ownerId) {
            owner = await fetch(`/api/contacts/${query.ownerId}`)
                .then((response) => response.json());
        }
        if (!owner) {
            return {};
        }

        const contactId = query.contactId
            ? query.contactId as string
            : asPath.slice(asPath.lastIndexOf('/') + 1);

        return { owner, contactId };
    }

    state: IChatPageState = {
        chat: undefined,
        chatLoading: true,
        messages: [],
        messagesLoading: true
    };

    componentDidMount(): void {
        if (this.props.contactId) {
            Promise.resolve()
                .then(() => {
                    return this.fetchChat();
                })
                .then(() => {
                    return this.fetchMessages();
                });
        }
    }

    fetchChat = (): Promise<void> => {
        if (!this.props.owner || !this.props.contactId) {
            return;
        }

        return fetch('/api/chat/findOrCreate', {
            body: JSON.stringify({ users: [this.props.owner.id, this.props.contactId] }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
            .then((response) => response.json())
            .then((response) => this.setState({
                chat: response.chat,
                chatLoading: false
            }));
    }

    fetchMessages = (): Promise<void> => {
        return fetch(`/api/chat/${this.state.chat.id}/message/list`)
            .then((response) => response.json())
            .then((response) => {
                return response.messages.map((message) => ({
                    id: message.id,
                    text: message.text,
                    timestamp: new Date(message.timestamp),
                    author: message.author
                }));
            })
            .then((messages) => this.setState({
                messages,
                messagesLoading: false
            }));
    }

    handleSubmit = (message: IMessageData): void => {
        const { chat } = this.state;
        if (!chat) {
            return;
        }

        // TODO отправка не работает
        fetch(`/api/chat/${chat.id}/message`, {
            body: JSON.stringify({ message }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
            .then(() => this.fetchMessages());
    }

    private get content(): JSX.Element {
        const { owner } = this.props;
        const { chat, chatLoading, messages, messagesLoading } = this.state;

        if (!owner) {
            return <Error statusCode={404}/>;
        }

        if (chatLoading) {
            return <Loader/>;
        } else if (!chat) {
            return <Error statusCode={404}/>;
        }

        return <Chat
            owner={owner}
            chatName={chat.name}
            messages={messages}
            messagesLoading={messagesLoading}
            onSubmit={this.handleSubmit}/>;
    }

    render(): JSX.Element {
        return (
            <Fragment>
                <Head>
                    <title>Сообщения</title>
                    <link rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                </Head>
                <div className="pageWrapper">
                    {this.content}
                </div>
            </Fragment>
        );
    }
}
