import React from "react";
import {
  Link
} from "react-router-dom";
import classNames from 'classnames';
import styles from './header.module.scss'

export default ({children, className}) => (
  <header className={classNames(styles.header, className)}>
    <h1 className={styles.headerTitle}><Link to="/">Youtube App</Link></h1>
    {children}
  </header>
)
