/* eslint-disable no-invalid-this */

import { ChangeEvent, Component } from 'react';

import { IMessageData, IUserData } from '../../server/types';
import styles from './index.module.css';

interface IChatProps {
    onSubmit(message: IMessageData): void
    interlocutor: IUserData
    messages: IMessageData[]
    messagesLoading: boolean
}

export default class Chat extends Component<IChatProps, IMessageData> {
    // В состоянии храним текущие значения полей ввода
    state: IMessageData = {
        text: ''
    };

    // Для обработки изменения каждого из полей создаем свой обработчик
    // Используем стрелочные функции, чтобы избежать надобности
    // явно привязывать контекст при передаче
    // обработчика в качестве аргумента
    handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({ text: event.target.value });
    }

    handleSubmit = (): void => {
        this.props.onSubmit(this.state);

        // После отправки формы очищаем её
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

interface IChatHeaderProps {
    interlocutor: IUserData
}

function ChatHeader({ interlocutor }: IChatHeaderProps) : JSX.Element {
    return (
        <div className={styles.chatHeader}>
            <div className={styles.headerAvatarContainer}>
                <img src={interlocutor.avatar} alt="avatar"
                    className={styles.headerAvatarImage}/>
            </div>
            <div className={styles.headerUsername}>
                {interlocutor.nickname}
            </div>
        </div>
    );
}

interface IMessagesProps {
    loading: boolean
    messages: IMessageData[]
}

function Messages({ loading, messages }: IMessagesProps) : JSX.Element {
    if (loading) {
        return <p className={styles.messages}>Загрузка сообщений</p>;
    }

    return (
        <ul className={styles.messages}>{
            messages.map((message) => {
                return <li>{message.text}</li>;
            })
        }
        </ul>
    );
}

interface IMessageFormProps {
    handleTextChange(event: ChangeEvent<HTMLTextAreaElement>): void
    handleSubmit() : void
    isButtonDisabled: boolean
}

function MessageForm(
    { handleTextChange, handleSubmit, isButtonDisabled }: IMessageFormProps
) : JSX.Element {
    return (
        <div className={styles.messageForm}>
            <label className={styles.chat} htmlFor="message-form"/>
            <textarea id="message-form"
                className={styles.messageFormInput}
                onChange={handleTextChange}/>
            <button type="submit"
                className={styles.sendMessageButton}
                disabled={isButtonDisabled}
                onClick={handleSubmit}>Отправить</button>
        </div>
    );
}
