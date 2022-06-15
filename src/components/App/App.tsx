import React, { FC } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Todo from '../Todo/Todo';
import About from '../About/About';
import styles from './App.module.css';

const App: FC = () => {
  return (
    <BrowserRouter>
        <div className={styles.wrap}>
          <header className={styles.header}>
            <NavLink
              to='/todo'
              className={({isActive}) => (isActive ? styles.header__link_active : styles.header__link)}>
                Дела
            </NavLink>
            <NavLink
              to='/'
              className={({isActive}) => (isActive ? styles.header__link_active : styles.header__link)}>
                Обо мне
            </NavLink>
          </header>
        <div className={styles.content}>
          <Routes>
            <Route path='/todo' element={<Todo />} />
            <Route path='/' element={<About />} />
          </Routes>
        </div>  
      </div>
    </BrowserRouter>
  );
}

export default App;
