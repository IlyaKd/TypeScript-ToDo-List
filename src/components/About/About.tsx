import React, { FC, useEffect, useState } from 'react';
import { Octokit } from '@octokit/rest';
import Card from '@mui/material/Card';
import Repos from '../Repos/Repos';
import styles from './About.module.css';
import emailImg from './img/email.svg';
import telegramImg from './img/telegram.svg';
import githubImg from './img/github.svg';
import vkImg from './img/vk.svg';
import linkedinImg from './img/linkedin.svg';
import facebookImg from './img/facebook.svg';

const octokit = new Octokit();

const About: FC = () => {

    type TypeUser = {
        [key: string]: any;
    }

    const initialState = {
        isLoading: true,
        isError: false,
        errorText: '',
        user: {}
    }

    const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading);
    const [isError, setIsError] = useState<boolean>(initialState.isError);
    const [errorText, setErrorText] = useState<string>(initialState.errorText);
    const [user, setUser] = useState<TypeUser>(initialState.user);

    useEffect(() => {
        octokit.users.getByUsername({
            username: 'IlyaKd'
        })
            .then(({ data }) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setIsError(true);
                setErrorText('Ошибка, пользователь не найден!')
            });
    }, []);

    return (
        <div className={styles.wrap}>
            <Card className={styles.user_card}>
                {isLoading
                    ? <div className={styles.preloader}></div>
                    : <div>
                        {isError
                            ? <div className={styles.error}>{errorText}</div>
                            : <div className={styles.inner}>
                                <img src={user.avatar_url} className={styles.avatar}></img>
                                <div className={styles.info}>
                                    <div className={styles.description}>
                                        <p className={styles.name}>{user.login}</p>
                                        <p className={styles.bio}>{user.bio}</p>
                                        <a className={styles.contact} href='mailto: ilyakd@gmail.com'>
                                            <img className={styles.contact__img} src={emailImg} alt='Email'></img>
                                            ilyakd@gmail.com
                                        </a>
                                        <a className={styles.contact} href='tg://resolve?domain='>
                                            <img className={styles.contact__img} src={telegramImg} alt='Telegram'></img>
                                            +7(917)741-91-97
                                        </a>
                                    </div>
                                    <div className={styles.social_networks}>
                                        <a href='https://github.com/IlyaKd' target='_blank' rel='noopener noreferrer'>
                                            <img src={githubImg} alt='Github' className={styles.social_networks__img}></img>
                                        </a>
                                        <a href='https://vk.com/' target='_blank' rel='noopener noreferrer'>
                                            <img src={vkImg} alt='VK' className={styles.social_networks__img}></img>
                                        </a>
                                        <a href='https://linkedin.com/' target='_blank' rel='noopener noreferrer'>
                                            <img src={linkedinImg} alt='Linkedin' className={styles.social_networks__img}></img>
                                        </a>
                                        <a href='https://facebook.com/' target='_blank' rel='noopener noreferrer'>
                                            <img src={facebookImg} alt='Facebook' className={styles.social_networks__img}></img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </Card>
            <Repos />
        </div>
    );
}

export default About;