import React from 'react';
import {Input} from 'antd';
import styles from './search.module.scss'

const { Search } = Input;

export default ({onSearchHandler, defaultValue}) => {

  return (
      <div className={styles.search}>
        <Search
          placeholder="Search video"
          onSearch={(val) => onSearchHandler(val)}
          defaultValue={defaultValue}
        />
      </div>
  )
}
