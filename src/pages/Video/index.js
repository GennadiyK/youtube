import React from 'react';
import { Header, SearchForm } from '../../components';
import styles from './video.module.scss';

const Video = (props) => {
  const {params: {id}} = props.match;
  const videoUrl = `https://www.youtube.com/embed/${id}`;
  return (<main className={styles.main}>
    <Header>
      <SearchForm
        onSearchHandler={(
          val) => val.length && props.history.push({
          pathname: '/results',
          search: `q=${val}`}
        )}/>
    </Header>
    <section className={styles.videoSection}>
      <iframe src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen className={styles.video}></iframe>
    </section>
  </main>)
}

export default Video
