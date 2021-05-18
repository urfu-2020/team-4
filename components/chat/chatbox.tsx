import { IChatData, IMessageData, IUserData } from '../../server/types';
import styles from './index.module.css';
import Message from './message';
import Loader from '../loader';
import { useEffect, useRef } from 'react';

interface IMessagesProps {
    owner: IUserData
    loading: boolean
    messages: IMessageData[]
    chat: IChatData
}

export default function Chatbox({ owner, loading, messages, chat }: IMessagesProps) : JSX.Element {
    if (loading) {
        return <Loader/>;
    }

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    };
    useEffect(scrollToBottom, [messages]);

    const refElement = <div ref={messagesEndRef} />;

    return (
        <section className={styles.chatbox}>
            <section className={styles.chatWindow}>
                {
                    messages.map((message) => {
                        return <Message key={message.id}
                            owner={owner}
                            message={message}
                            users={chat.users}/>;
                    })
                }
                {refElement}
            </section>
        </section>
    );
}
