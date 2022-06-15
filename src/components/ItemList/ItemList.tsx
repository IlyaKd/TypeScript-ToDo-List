import React, { FC } from 'react';
import Item from '../Item/Item';
import styles from './ItemList.module.css';
import { IItems } from '../types/types';

interface ItemListProps {
    items: IItems[],
    onClickDone: (id: number) => void, 
    onClickDelete: (id: number) => void, 
}

const ItemList: FC<ItemListProps> = ({ items, onClickDone, onClickDelete }) => {
    if (items.length === 0) {
        return (
            <div className={styles.noItem}></div>
        )
    } else {
        return (
            <ul className={styles.wrap}>
                {items.map(item =>
                    <li key={item.id}>
                        <Item
                            date={item.date}
                            value={item.value}
                            isDone={item.isDone}
                            id={item.id}
                            onClickDone={onClickDone}
                            onClickDelete={onClickDelete}
                        />
                    </li>
                )}
            </ul>
        )
    }
}

export default ItemList;