/* eslint-disable no-invalid-this */

import { ChangeEvent, Component } from 'react';

import { IMessageData, IUserData } from '../../server/types';
import ChatHeader from './header';
import Chatbox from './chatbox';
import ChatInput from './form';
import styles from './index.module.css';

interface IInputData {
    text: string
}

interface IChatProps {
    onSubmit(message: IInputData): void
    owner: IUserData
    chatName: string
    messages: IMessageData[]
    messagesLoading: boolean
}

export default class Chat extends Component<IChatProps, IInputData> {
    state: IInputData = {
        text: ''
    };

    handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({ text: event.target.value });
    }

    handleSubmit = (): void => {
        this.props.onSubmit(this.state);

        this.setState({ text: '' });
    }

    render(): JSX.Element {
        const { text } = this.state;
        const { owner, chatName, messages, messagesLoading } = this.props;

        const isButtonDisabled = !text;

        return (
            <div className={styles.wrapper}>
                <ChatHeader chatName={chatName} owner={owner}/>
                <Chatbox owner={owner} loading={messagesLoading} messages={messages}/>
                <ChatInput
                    handleSubmit={this.handleSubmit}
                    handleTextChange={this.handleTextChange}
                    isButtonDisabled={isButtonDisabled}
                />
            </div>
        );
    }
}
