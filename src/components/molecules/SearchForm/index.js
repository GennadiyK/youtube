import React from 'react';
import {Input} from 'antd';

const {Search} = Input;

export default function SearchForm() {
  return (
    <Search
      placeholder="Search video"
      onSearch={value => console.log(value)}
      enterButton
    />
  )
}
