/* eslint-disable no-invalid-this */

import { ChangeEvent, Component } from 'react';

import { IMessageData, IUserData } from '../../server/types';
import ChatHeader from './header';
import Messages from './messages';
import MessageForm from './form';
import styles from './index.module.css';

interface IChatProps {
    onSubmit(message: IMessageData): void
    interlocutor: IUserData
    messages: IMessageData[]
    messagesLoading: boolean
}

export default class Chat extends Component<IChatProps, IMessageData> {
    state: IMessageData = {
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
        const { interlocutor, messages, messagesLoading } = this.props;

        const isButtonDisabled = !text;

        return (
            <div className={styles.chatContainer}>
                <ChatHeader interlocutor={interlocutor}/>
                <Messages loading={messagesLoading} messages={messages} />
                <MessageForm
                    handleSubmit={this.handleSubmit}
                    handleTextChange={this.handleTextChange}
                    isButtonDisabled={isButtonDisabled}
                />
            </div>
        );
    }
}
