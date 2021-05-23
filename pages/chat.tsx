/* eslint-disable no-invalid-this */

import Head from 'next/head';
import Error from 'next/error';
import { NextPageContext } from 'next';
import { Component, Fragment } from 'react';

import { IChatData, IMessageData, IUserData } from '../server/types';
import Chat from '../components/chat';
import Loader from '../components/loader';
import { checkError, fetchUser, getUser } from '../helpers/helpers';

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
        const owner = await getUser(req, query);
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

    // eslint-disable-next-line no-undef
    timeId: NodeJS.Timeout = null

    componentDidMount(): void {
        // @ts-ignore
        window.props = this.props;

        Promise.resolve()
            .then(() => {
                return this.fetchChat();
            })
            .then(() => {
                return this.fetchMessages();
            })
            .catch((err) => {
                this.setState({ chatLoading: false, messagesLoading: false });
                console.error('Error: ', err);
            });
        this.timeId = setInterval(() => this.fetchMessagesOnChange(), 5000);
    }

    componentWillUnmount(): void {
        clearInterval(this.timeId);
    }

    fetchChat = (): Promise<void> => {
        if (!this.props.owner || !this.props.contactId) {
            throw new Error({ statusCode: 400, title: 'contact not found' });
        }

        this.setState({ chatLoading: true });

        let chat;

        return fetch('/api/chat/findOrCreate', {
            body: JSON.stringify({ users: [this.props.owner.id, this.props.contactId] }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
        })
            .then((response) => response.json())
            .then((response) => {
                checkError(response);
                chat = response.chat;

                return response.chat.users;
            })
            .then((ids) => {
                return Promise.all(ids.map((userId) => fetchUser(userId)));
            })
            .then((users) => {
                users.forEach((user) => {
                    checkError(user);
                });
                chat.users = users;
                chat.name = chat.name ??
                    chat.users.find((user) => user.id === this.props.contactId).nickname;

                this.setState({ chat, chatLoading: false });
            });
    }

    fetchMessagesOnChange = (): Promise<void> => {
        if (!this.state.chat) {
            throw new Error({ statusCode: 400, title: 'chat not found' });
        }
        const chat = this.state.chat;

        return fetch(`/api/chat/${chat.id}/message/list?page=1&limit=0`)
            .then((response) => response.json())
            .then((response) => {
                checkError(response);
                if (response.count !== this.state.messages.length) {
                    return this.fetchMessages();
                }
            });
    }

    fetchMessages = (): Promise<void> => {
        if (!this.state.chat) {
            throw new Error({ statusCode: 400, title: 'chat not found' });
        }
        this.setState({ messagesLoading: true });

        const chat = this.state.chat;

        return fetch(`/api/chat/${chat.id}/message/list`)
            .then((response) => response.json())
            .then((response) => {
                checkError(response);

                return response.messages.map((message) => ({
                    id: message.id,
                    value: message.value,
                    createdAt: new Date(message.createdAt),
                    author: chat.users.find((user) => {
                        return user.id === message.authorId;
                    })
                }));
            })
            .then((messages) => this.setState({
                messages,
                messagesLoading: false
            }));
    }

    handleSubmit = (message: { value }): void => {
        const { chat } = this.state;
        if (!chat) {
            return;
        }

        fetch(`/api/chat/${chat.id}/message`, {
            body: JSON.stringify({ message: message.value }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
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
            chat={chat}
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
                {this.content}
            </Fragment>
        );
    }
}
