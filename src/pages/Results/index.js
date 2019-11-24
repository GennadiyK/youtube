import React, {useEffect, useState} from 'react';
import {
  Link
} from "react-router-dom";
import queryString from 'query-string';
import { List, Button, Skeleton } from 'antd';
import styles from './results.module.scss'
import { Header, SearchForm } from '../../components'
import { api } from '../../api'

const fetchData = (q, pageToken) => {
  if(Boolean(q) && q.trim().length) {
    return api({q, part: 'snippet', maxResults: 10, pageToken})
  }
  return {}
}

export default (props) => {
  const {q} = queryString.parse(props.location.search);
  const [searchValue, setSearchValue] = useState(q);
  const [videoDataItems, setVideoDataItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageToken, setNextPageToken] = useState('');
  const isLoadMore = pageToken && !loading

  useEffect(() => {
    const runEffect = async () => {
      try {
        setLoading(true)
        const { data } = await fetchData(searchValue);
        const {nextPageToken} = data
        setNextPageToken(nextPageToken)
        setLoading(false)
        data && setVideoDataItems(data.items);
      } catch(e) {
        console.error(e)
      }
    };
    runEffect();
  }, [searchValue]);

  useEffect(() => {
    props.history.push({
      pathname: '/results',
      search: `q=${searchValue}`}
    )
  }, [searchValue])

  const handlerLoadMore = async () => {
    try {
      setLoading(true);
      const {data} = await fetchData(q, pageToken);
      let newData = []
      if(data) {
        const {nextPageToken} = data
        newData = videoDataItems.concat(data.items)
        setNextPageToken(nextPageToken)
      }
      setVideoDataItems(newData);
      setLoading(false);
    } catch(e) {
      console.error(e)
    }
  }

  const loadMore =
    isLoadMore ? (
      <div
        className={styles.loadMoreWrapper}
      >
        <Button onClick={handlerLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <main className={styles.main}>
      <Header>
        <SearchForm
          className={styles.searchForm}
          onSearchHandler={setSearchValue}
          defaultValue={searchValue}
        />
      </Header>
      <section className={styles.content}>
        <List
          loading={loading}
          itemLayout="vertical"
          loadMore={loadMore}
          dataSource={videoDataItems}
          renderItem = {item => {
            const {videoId, channelId} = item && item.id;
            return (<List.Item
              key={videoId || channelId}
              actions={[<Link key="list-loadmore-edit" to={`/video/${videoId || channelId}`}>watch video</Link>]}
              extra={
                <img
                  width={150}
                  alt={item.snippet.title}
                  src={item.snippet.thumbnails.high.url}
                />
              }
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  title={<Link to={`/video/${videoId || channelId}`}>{item.snippet.title}</Link>}
                  description={item.snippet.description}
                />
              </Skeleton>
            </List.Item>)
          }}
        />
      </section>
    </main>
  )
}
