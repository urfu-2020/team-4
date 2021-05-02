import { IUserData } from '../../server/types';
import styles from './index.module.css';

interface IChatHeaderProps {
    interlocutor: IUserData
}

export default function ChatHeader({ interlocutor }: IChatHeaderProps) : JSX.Element {
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
