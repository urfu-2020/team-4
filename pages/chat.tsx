/* eslint-disable no-invalid-this */

import Head from 'next/head';
import Error from 'next/error';
import { NextPageContext } from 'next';
import { Component, Fragment } from 'react';

import { IChatData, IMessageData, IUserData } from '../server/types';
import Chat from '../components/chat';
import Loader from '../components/loader';

interface IChatPageProps {
    chatId?: string;
    ownerId: string;
}

interface IChatPageState {
    owner?: IUserData;
    chat?: IChatData;
    chatLoading: boolean;
    messages: IMessageData[];
    messagesLoading: boolean;
}

export default class ChatPage extends Component<IChatPageProps, IChatPageState> {
    static async getInitialProps({ query, req }: NextPageContext): Promise<IChatPageProps> {
        let ownerId;
        if (req && Object.prototype.hasOwnProperty.call(req, 'user')) {
            // @ts-ignore
            ownerId = req.user as string;
        }

        return { ownerId, chatId: query.id as string };
    }

    state: IChatPageState = {
        owner: undefined,
        chat: undefined,
        chatLoading: true,
        messages: [],
        messagesLoading: true
    };

    componentDidMount(): void {
        this.fetchChat();
        this.fetchMessages();
        this.fetchOwner();
    }

    fetchOwner = (): void => {
        this.setState({ owner: { id: this.props.ownerId, nickname: '', avatar: '' } });
        this.fetchContact(this.props.ownerId)
            .then((response) => {
                this.setState({ owner: response.user });
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchContact = (id: string): Promise<any> => {
        return fetch(`/api/contacts/${id}`)
            .then((response) => response.json());
    }

    fetchChat = (): void => {
        fetch(`/api/chat/${this.props.chatId}`)
            .then((response) => response.json())
            .then((response) => this.setState({
                chat: response.chat,
                chatLoading: false
            }));
    }

    fetchMessages = (): void => {
        fetch('/api/messages')
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
        fetch('/api/messages', {
            body: JSON.stringify({ message }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        }).then(this.fetchMessages);
    }

    private get content(): JSX.Element {
        const { owner, chat, chatLoading, messages, messagesLoading } = this.state;

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
