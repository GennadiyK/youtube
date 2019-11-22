import React, {useEffect, useState} from 'react';
import styles from './main.module.scss'
import SearchForm from '../../components/molecules/SearchForm'
import { api } from '../../api'

const fetchData = (q) => {
  if(q.trim().length) {
    return api({q, part: 'snippet'})
  }
}

export default () => {
  const [searchValue, setSearchValue] = useState('');
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const runEffect = async () => {
      const data = await fetchData(searchValue);
      setVideoData(data);
    };
    runEffect();
  }, [searchValue]);

  console.log(searchValue)
  console.log(videoData)

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Youtube App</h1>
        <SearchForm className={styles.searchForm} onSearchHandler={setSearchValue}/>
      </header>
      <section className={styles.content}>

      </section>
      <aside className={styles.aside}></aside>
      <footer className={styles.footer}>
        All rights, 2019
      </footer>
    </main>
  )
}
