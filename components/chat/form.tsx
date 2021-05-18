// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, FormEvent } from 'react';
import styles from './index.module.css';

interface IMessageFormProps {
    handleTextChange(event: ChangeEvent<HTMLTextAreaElement>): void
    handleSubmit(e: FormEvent) : void
    isButtonDisabled: boolean
}

export default function ChatInput(
    { handleTextChange, handleSubmit, isButtonDisabled }: IMessageFormProps
) : JSX.Element {

    return (
        <form className={styles.chatForm} onSubmit={handleSubmit}>
            <textarea className={styles.messageInput} autoComplete="on"
                placeholder="Type a message"
                onChange={handleTextChange}
            />
            <button className={styles.submitButton} type="submit" disabled={isButtonDisabled}>
                <i className="material-icons">send</i>
            </button>
        </form>
    );
}
