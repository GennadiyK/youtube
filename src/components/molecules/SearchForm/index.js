import React from 'react';
import {Input} from 'antd';

const {Search} = Input;

export default ({onSearchHandler}) => {
  return (
    <Search
      placeholder="Search video"
      onSearch={value => value && onSearchHandler(value)}
      enterButton
    />
  )
}
