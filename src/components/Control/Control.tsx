import React, { FC } from 'react';
import classnames from 'classnames';
import styles from './Control.module.css';
import { IItems } from '../types/types';

interface ControlProps {
  items: IItems[],
  filter: string,
  onClickFilter: (id: string) => void,
}

const Control: FC<ControlProps> = ({ items, filter, onClickFilter }) => {

  let activeItems = items.filter(item => !item.isDone).length;
  let doneItems = items.filter(item => item.isDone).length;

  return (
    <div className={styles.flex}>
      <button className={
        classnames({
          [styles.btn]: true,
          [styles.btn_active]: filter === 'done'
        })}
        onClick={() => onClickFilter('done')}>Завершённые:
        <span className={styles.items_count}>{doneItems}</span>
      </button>
      <button className={
        classnames({
          [styles.btn]: true,
          [styles.btn_active]: filter === 'active'
        })}
        onClick={() => onClickFilter('active')}>Незавершённые:
        <span className={styles.items_count}>{activeItems}</span>
      </button>
      <button className={
        classnames({
          [styles.btn]: true,
          [styles.btn_active]: filter === 'all'
        })}
        onClick={() => onClickFilter('all')}>Все</button>
    </div>
  );
}

export default Control;