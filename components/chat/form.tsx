import { ChangeEvent } from 'react';
import styles from './index.module.css';

interface IMessageFormProps {
    handleTextChange(event: ChangeEvent<HTMLTextAreaElement>): void
    handleSubmit() : void
    isButtonDisabled: boolean
}

export default function MessageForm(
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
