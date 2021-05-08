/* eslint-disable no-invalid-this */

import Head from 'next/head';
import { NextPageContext } from 'next';
import { Component } from 'react';

import { IMessageData, IUserData } from '../server/types';
import Chat from '../components/chat';

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
        companion: undefined,
        companionLoading: true,
        messages: [],
        messagesLoading: true
    };

    componentDidMount(): void {
        this.fetchCompanion();
        this.fetchMessages();
        this.setState({ owner: { id: this.props.ownerId, nickname: '', avatar: '' } });
        // const owner = this.getOwnerFromLocalStorage();
        // if (owner.id && owner.id === this.props.ownerId && owner.avatar && owner.nickname) {
        //     this.setState({
        //         owner: { id: owner.id, nickname: owner.nickname, avatar: owner.avatar }
        //     });
        // } else {
        //     this.fetchContact(this.props.ownerId)
        //         .then((user) => {
        //             this.setState({ owner: user });
        //         });
        // }

        this.fetchContact(this.props.ownerId)
            .then((user) => {
                this.setState({ owner: user });
            });
    }

    // getOwnerFromLocalStorage(): IUserData {
    //     const ownerId: string | null = localStorage.getItem('owner-id');
    //     const nickname: string | null = localStorage.getItem('owner-nickname');
    //     const avatar: string | null = localStorage.getItem('owner-avatar');
    //
    //     return { id: ownerId, nickname, avatar };
    // }

    fetchCompanion = (): void => {
        this.fetchContact(this.props.companionId)
            .then((companion) => this.setState({ companion, companionLoading: false }));
    }

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
            return <p>Загрузка пользователя...</p>;
        } else if (!companion) {
            return <p>Пользователь с таким id не найден!</p>;
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
