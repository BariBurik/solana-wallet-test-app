import styles from './Modal.module.scss';
import { FC, ReactNode, useEffect, useState } from 'react';

interface ModalProps {
    isHidden: boolean;
    setIsHidden: (value: boolean) => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({isHidden, setIsHidden, children}) => {
    // Функция определяющая клик вне модального окна и закрывающая его
    function handleModalClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            setIsHidden(true)
        }
    }

    useEffect(() => {
        // Запись модального окна в переменную
        const modal = document.querySelector(`.${styles.modal}`);
        // Закрытие модального окна
        if (isHidden) {
            modal?.classList.add(styles.hide);
        } 
        // Открытие модального окна
        else {
            modal?.classList.remove(styles.hide);
        }
    }, [isHidden]);
    

    return (
        <div onClick={handleModalClick} className={`${styles.modal} ${isHidden ? styles.hide : ''}`}>
            <div className={styles.modal_content}>
                {children}
                <button onClick={() => setIsHidden(true)} className={styles.btn_close}>&#x2715;</button>
            </div>
        </div>
    );
}

export default Modal;