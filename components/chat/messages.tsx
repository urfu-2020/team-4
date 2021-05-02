import { IMessageData } from '../../server/types';
import styles from './index.module.css';

interface IMessagesProps {
    loading: boolean
    messages: IMessageData[]
}

export default function Messages({ loading, messages }: IMessagesProps) : JSX.Element {
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
