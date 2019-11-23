import React, {useEffect, useState} from 'react';
import { MemoryRouter } from 'react-router'
import queryString from 'query-string';
import { List, Button, Skeleton } from 'antd';
import styles from './results.module.scss'
import { Header, SearchForm } from '../../components'
import { api } from '../../api'

const fetchData = (q) => {
  if(Boolean(q) && q.trim().length) {
    return api({q, part: 'snippet', maxResults: 3})
  }
  return {}
}

const onLoadMore = () => console.log('load more')

export default (props) => {
  const {q} = queryString.parse(props.location.search);
  const [searchValue, setSearchValue] = useState(q);
  const [videoDataItems, setVideoDataItems] = useState([]);
  const [loading, setLoading] = useState(false);


  console.log(q)
  useEffect(() => {
    const runEffect = async () => {
      try {
        setLoading(true)
        const { data } = await fetchData(searchValue);
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

  const loadMore =
    !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  console.log(searchValue)
  console.log(videoDataItems)

  return (
    <MemoryRouter>
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
              actions={[<a key="list-loadmore-edit">watch video</a>]}
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
                  title={<a href="https://ant.design">{item.snippet.title}</a>}
                  description={item.snippet.description}
                />
              </Skeleton>
            </List.Item>)
          }}
        />
      </section>
    </main>
    </MemoryRouter>
  )
}
