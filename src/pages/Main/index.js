import React from 'react';
import styles from './main.module.scss'
import SearchForm from '../../components/molecules/SearchForm'

export default () => (
  <main className={styles.main}>
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Youtube App</h1>
      <SearchForm className={styles.searchForm}/>
    </header>
    <section className={styles.content}>

    </section>
    <aside className={styles.aside}></aside>
    <footer className={styles.footer}>
      All rights, 2019
    </footer>
  </main>
)
