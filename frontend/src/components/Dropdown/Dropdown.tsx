import { ReactNode, useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useOutsideClick } from '../../hooks';

import styles from './Dropdown.module.scss';

type Props<T> = {
  list: T[];
  element: (item: T) => ReactNode;
  onChange?: (item: T) => void;
  value?: T | null;
  label?: string;
};

export const Dropdown = <T extends { id: string; label: string }>({
  list,
  element,
  onChange,
  value,
  label = 'Select country',
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(value || null);

  useEffect(() => {
    if (value) setSelectedItem(value);
  }, [value]);

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  const dropdownRef = useOutsideClick<HTMLDivElement>(() => open && handleToggle());

  const handleChange = (item: T) => {
    setSelectedItem(item);
    onChange && onChange(item);
    open && handleToggle();
  };

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button type="button" className={styles.dropdown__button} onClick={handleToggle}>
        {selectedItem ? selectedItem.label : label}
        <span className={styles.dropdown__buttonIcon}>
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {open && (
        <div className={styles.dropdown__menu}>
          {list.length > 0 ? (
            <ul className={styles.menuList}>
              {list.map(item => (
                <li key={item.id} className="interactive" onClick={() => handleChange(item)}>
                  {element(item)}
                </li>
              ))}
            </ul>
          ) : (
            <p>List is empty</p>
          )}
        </div>
      )}
    </div>
  );
};
