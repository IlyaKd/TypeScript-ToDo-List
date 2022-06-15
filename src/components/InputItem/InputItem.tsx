import React, { ChangeEvent, FC, useState } from 'react';
import classnames from 'classnames';
import styles from './InputItem.module.css';
import buttonImg from './img/button.svg';
import { IItems } from '../types/types';

interface InputItemProps {
  items: IItems[],
  onClickAdd: (inputValue: string) => void,
}

const InputItem: FC<InputItemProps> = ({ items, onClickAdd }) => {

  const initialstate = {
    inputValue: '',
    error: false,
    repeat: false,
  };

  const [inputValue, setInputValue] = useState<string>(initialstate.inputValue);
  const [error, setError] = useState<boolean>(initialstate.error);
  const [repeat, setRepeat] = useState<boolean>(initialstate.repeat);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue === '') {
      setError(true);
      setRepeat(false);
    } else if (items.find(item => item.value === inputValue)) {
      setRepeat(true);
    } else {
      setInputValue('');
      setError(false);
      setRepeat(false);
      onClickAdd(inputValue);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={classnames({
        [styles.form]: true,
        [styles.error]: error,
        [styles.repeat]: repeat,
        [styles.maxLengthInputValue]: inputValue.length === 240,
      })}>
      <input
        type='text'
        placeholder={'Просто введите сюда название дела...'}
        maxLength={240}
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
        className={styles.input}
      />
      <button className={styles.btn}>
        <img src={buttonImg} alt='Button' />
      </button>
    </form>
  );
}

export default InputItem;
