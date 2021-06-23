import { IMessageData, IUserData } from '../../server/types';
import classNames from 'classnames';
import styles from './index.module.css';

interface IMessageProps {
    owner: IUserData
    message: IMessageData
}

export default function Message({ owner, message }: IMessageProps): JSX.Element {
    const { value, createdAt, author } = message;

    const cls = [styles.messageContainer];
    if (author.id === owner.id) {
        cls.push(styles.messageSelf);
    }

    const timestamp = createdAt.toLocaleTimeString().slice(0, -3) + ' ' +
        createdAt.toLocaleDateString();

    return (
        <article className={classNames(...cls)}>
            <div className={styles.messageBox}>
                <img className={styles.avatar} src={author.avatar} alt="avatar"/>
                <div className={styles.messageContent}>
                    <div className={styles.messageText}>
                        <p className={styles.messageText}>{value}</p>
                    </div>
                    <span className={styles.timestamp}>
                        <span className={styles.username}>{author.nickname}</span>&bull;
                        <span className={styles.postTime}>{timestamp}</span>
                    </span>
                </div>
            </div>
        </article>
    );
}
