import { IMessageData, IUserData } from '../../server/types';
import classNames from 'classnames';
import styles from './index.module.css';

interface IMessageProps {
    owner: IUserData
    message: IMessageData
    users: IUserData[]
}

export default function Message({ owner, message, users }: IMessageProps): JSX.Element {

    const author = users.find((user) => {
        return user.id.toString() === message.author.id.toString();
    });

    const cls = [styles.messageContainer];
    if (author.id.toString() === owner.id.toString()) {
        cls.push(styles.messageSelf);
    }
    const timestamp = message.createdAt.toLocaleTimeString().slice(0, -3) + ' ' +
        message.createdAt.toLocaleDateString();

    return (
        <article className={classNames(...cls)}>
            <div className={styles.messageBox}>
                <img className={styles.avatar} src={author.avatar} alt="avatar"/>
                <div className={styles.messageContent}>
                    <div className={styles.messageText}>
                        <p className={styles.messageText}>{message.value}</p>
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
