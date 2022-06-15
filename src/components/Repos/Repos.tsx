import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';
import { Octokit } from '@octokit/rest';
import Card from '@mui/material/Card';
import styles from './Repos.module.css';
import starImg from './img/star.svg';
import strokeImg from './img/stroke.svg';
import errorImg from './img/error.png';

const octokit = new Octokit();

const Repos: FC = () => {

    interface IRepoList {
        [key: string]: any;
    }

    const initialState = {
        isLoading: true,
        isError: false,
        repoList: [],
        firstRepo: 0,
        lastRepo: 5
    }

    const [isLoading, setIsLoading] = useState<boolean>(initialState.isLoading);
    const [isError, setIsError] = useState<boolean>(initialState.isError);
    const [repoList, setRepoList] = useState<IRepoList[]>(initialState.repoList);
    const [firstRepo, setFirstRepo] = useState<number>(initialState.firstRepo);
    const [lastRepo, setLastRepo] = useState<number>(initialState.lastRepo);

    const onClickBack = () => {
        setFirstRepo(firstRepo - 5);
        setLastRepo(lastRepo - 5);
    };

    const onClickNext = () => {
        setFirstRepo(firstRepo + 5);
        setLastRepo(lastRepo + 5);
    };

    useEffect(() => {
        octokit.repos.listForUser({
            username: 'IlyaKd'
        })
            .then(({ data }) => {
                setRepoList(data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setIsError(true);
            });
    }, []);

    return (
        <Card>
            <div className={styles.wrap}>
                <h1 className={styles.title}>Репозитории на github.com</h1>
                {isLoading
                    ? <div className={styles.preloader}></div>
                    : <div className={styles.inner}>
                        {isError
                            ? <div className={styles.error_container}>
                                <img src={errorImg} alt='Error' className={styles.error_img} />
                                <h2 className={styles.error_subtitle}>Что-то пошло не так...</h2>
                                <p className={styles.error_text}>Попробуйте
                                    <a href='' onClick={() => window.location.reload()} className={styles.error_link}> загрузить </a>
                                    еще раз</p>
                            </div>
                            : <div>
                                {repoList.length === 0
                                    ? <div className={styles.error_container}>
                                        <img src={errorImg} alt='Error' className={styles.error_img} />
                                        <h2 className={styles.error_subtitle}>Репозитории отсутствуют</h2>
                                        <p className={styles.error_text}>Добавьте как минимум один репозиторий на&ensp;
                                            <a href='https://github.com' target='_blank' rel='noopener noreferrer' className={styles.error_link}>github.com</a>
                                        </p>
                                    </div>
                                    : <div>
                                        {!isLoading && <ol className={styles.list}>
                                            {repoList.slice(firstRepo, lastRepo).map(repo => (
                                                <li key={repo.id} className={styles.list__item}>
                                                    <a href={repo.html_url} target='_blank' rel='noopener noreferrer' className={styles.name}>{repo.name}</a>
                                                    <div className={styles.info}>
                                                        <div className={
                                                            classnames({
                                                                [styles.circle]: true,
                                                                [styles.html]: repo.language === 'HTML',
                                                                [styles.css]: repo.language === 'CSS',
                                                                [styles.js]: repo.language === 'JavaScript'
                                                            })}
                                                        >
                                                        </div>
                                                        <p className={styles.language}>{repo.language}</p>
                                                        <div className={styles.star}>
                                                            <img src={starImg} alt='Star' />
                                                            <p>{repo.stargazers_count}</p>
                                                        </div>
                                                        <div className={styles.forks}>
                                                            <img src={strokeImg} alt='Stroke' />
                                                            <p>{repo.forks}</p>
                                                        </div>
                                                        <p className={styles.update}>Updated on {new Date(repo.updated_at).toLocaleString('en-GB', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}</p>
                                                    </div>
                                                </li>))}
                                        </ol>}
                                        <div className={styles.pagination}>
                                            <button
                                                className={classnames({
                                                    [styles.button]: true,
                                                    [styles.disabled]: firstRepo === 0
                                                })}
                                                onClick={() => onClickBack()}
                                                disabled={firstRepo === 0}
                                            >
                                                Назад
                                            </button>
                                            <button
                                                className={classnames({
                                                    [styles.button]: true,
                                                    [styles.disabled]: repoList.length <= lastRepo
                                                })}
                                                onClick={() => onClickNext()}
                                                disabled={repoList.length <= lastRepo}
                                            >
                                                Далее
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        </Card>
    );
}

export default Repos;