import { IMessageData, IUserData } from '../../server/types';
import styles from './index.module.css';
import Message from './message';

interface IMessagesProps {
    owner: IUserData
    loading: boolean
    messages: IMessageData[]
}

export default function Chatbox({ owner, loading, messages }: IMessagesProps) : JSX.Element {
    if (loading) {
        return <p className={styles.messages}>Загрузка сообщений</p>;
    }

    return (
        <section className={styles.chatbox}>
            <section className={styles.chatWindow}>
                {
                    messages.map((message) => {
                        return <Message owner={owner} message={message} key={message.id}/>;
                    })
                }
            </section>
        </section>
    );
}
