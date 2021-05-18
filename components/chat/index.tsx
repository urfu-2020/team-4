/* eslint-disable no-invalid-this */

// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, Component, FormEvent } from 'react';

import { IChatData, IMessageData, IUserData } from '../../server/types';
import ChatHeader from './header';
import Chatbox from './chatbox';
import ChatInput from './form';
import styles from './index.module.css';

interface IInputData {
    value: string
}

interface IChatProps {
    onSubmit(message: IInputData): void
    owner: IUserData
    chat: IChatData
    messages: IMessageData[]
    messagesLoading: boolean
}

export default class Chat extends Component<IChatProps, IInputData> {
    state: IInputData = {
        value: ''
    };

    handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        this.props.onSubmit(this.state);

        this.setState({ value: '' });
    }

    render(): JSX.Element {
        const { value } = this.state;
        const { owner, chat, messages, messagesLoading } = this.props;

        const isButtonDisabled = !value;

        return (
            <div className={styles.wrapper}>
                <ChatHeader chat={chat} owner={owner}/>
                <Chatbox
                    owner={owner}
                    loading={messagesLoading}
                    messages={messages}
                    chat={chat}
                />
                <ChatInput
                    handleSubmit={this.handleSubmit}
                    handleTextChange={this.handleTextChange}
                    isButtonDisabled={isButtonDisabled}
                />
            </div>
        );
    }
}
