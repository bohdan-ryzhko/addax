import { Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import classNames from 'classNames';
import { IoMdClose } from 'react-icons/io';

import styles from './modal.module.scss';

type Props = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
} & Required<PropsWithChildren>;

export const Modal: FC<Props> = ({ children, active, setActive }) => {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setActive(false);
    }, 300);
  };

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    }
  }, [active]);

  if (!active) return null;

  return ReactDom.createPortal(
    <div className={classNames(styles.modalWrapper, isVisible ? styles.active : '')}>
      <div className={styles.modal}>
        {children}
        <button onClick={closeModal} className={styles.closeBtn}>
          <IoMdClose />
        </button>
      </div>
    </div>,
    document.getElementById('modal')!,
  );
};
