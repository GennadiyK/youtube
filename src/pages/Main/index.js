import React from 'react';
import { withRouter } from 'react-router'
import styles from './main.module.scss'
import { Header, SearchForm, Footer } from '../../components'

const Main = (props) => (
  <main className={styles.main}>
     <Header className={styles.header}>
       <SearchForm
         onSearchHandler={(
           val) => val.length && props.history.push({
             pathname: '/results',
             search: `q=${val}`}
           )}/>
     </Header>
    <Footer />
  </main>
)

export default withRouter(Main)
