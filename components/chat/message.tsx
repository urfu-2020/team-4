import { IMessageData, IUserData } from '../../server/types';
import classNames from 'classnames';
import styles from './index.module.css';

interface IMessageProps {
    owner: IUserData
    message: IMessageData
}

export default function Message({ owner, message }: IMessageProps): JSX.Element {
    const cls = [styles.msgContainer];
    if (message.author.id === owner.id) {
        cls.push(styles.msgSelf);
    }
    const timestamp = message.timestamp.toLocaleTimeString().slice(0, -3) + ' ' +
        message.timestamp.toLocaleDateString();

    return (
        <article className={classNames(...cls)}>
            <div className={styles.msgBox}>
                <img className={styles.userImg} src={message.author.avatar} alt="avatar"/>
                <div className={styles.flr}>
                    <div className={styles.messages}>
                        <p className={styles.msg}>{message.text}</p>
                    </div>
                    <span className={styles.timestamp}>
                        <span className={styles.username}>{message.author.nickname}</span>&bull;
                        <span className={styles.posttime}>{timestamp}</span>
                    </span>
                </div>
            </div>
        </article>
    );
}
