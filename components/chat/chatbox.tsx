import { IMessageData, IUserData } from '../../server/types';
import styles from './index.module.css';
import Message from './message';
import Loader from '../loader';
import { useEffect, useRef } from 'react';


interface IMessagesProps {
    owner: IUserData
    loading: boolean
    messages: IMessageData[]
}

export default function Chatbox({ owner, loading, messages }: IMessagesProps) : JSX.Element {
    if (loading) {
        return <Loader/>;
    }

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        // @ts-ignore
        messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    };
    useEffect(scrollToBottom, [messages]);

    // @ts-ignore
    const refElement = <div ref={messagesEndRef} />;

    return (
        <section className={styles.chatbox}>
            <section className={styles.chatWindow}>
                {
                    messages.map((message) => {
                        return <Message owner={owner} message={message} key={message.id}/>;
                    })
                }
                {refElement}
            </section>
        </section>
    );
}