import { IMessageData, IUserData } from '../../server/types';
import classNames from 'classnames';
import styles from './index.module.css';

interface IMessageProps {
    owner: IUserData
    message: IMessageData
}

export default function Message({ owner, message }: IMessageProps): JSX.Element {
    const cls = [styles.messageContainer];
    if (message.author.id === owner.id) {
        cls.push(styles.messageSelf);
    }
    const timestamp = message.timestamp.toLocaleTimeString().slice(0, -3) + ' ' +
        message.timestamp.toLocaleDateString();

    return (
        <article className={classNames(...cls)}>
            <div className={styles.messageBox}>
                <img className={styles.avatar} src={message.author.avatar} alt="avatar"/>
                <div className={styles.messageContent}>
                    <div className={styles.messageText}>
                        <p className={styles.messageText}>{message.text}</p>
                    </div>
                    <span className={styles.timestamp}>
                        <span className={styles.username}>{message.author.nickname}</span>&bull;
                        <span className={styles.postTime}>{timestamp}</span>
                    </span>
                </div>
            </div>
        </article>
    );
}
