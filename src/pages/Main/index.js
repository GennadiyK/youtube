import React from 'react';
import { withRouter } from 'react-router'
import styles from './main.module.scss'
import { Header, SearchForm } from '../../components'

const Main =(props) => {
  return (<main className={styles.main}>
     <Header className={styles.header}>
       <SearchForm
         onSearchHandler={(
           val) => val.length && props.history.push({
             pathname: '/results',
             search: `q=${val}`}
           )}/>
     </Header>
  </main>)
}

export default withRouter(Main)
