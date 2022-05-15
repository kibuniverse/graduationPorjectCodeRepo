import { Carousel } from '@arco-design/web-react';
import React from 'react';
import bannerImage from '../../assets/login-banner.jpg';

import styles from './style/index.module.less';

export default function LoginBannber() {
  const data = [
    {
      slogan: 'Connect Efficient Grace Meeting Systen',
      subSlogan: '连接 高效 优雅的会议系统',
      image: bannerImage,
    },
  ];
  return (
    <Carousel className={styles.carousel} animation="fade">
      {data.map((item, index) => (
        <div key={`${index}`}>
          <div className={styles['carousel-item']}>
            <div className={styles['carousel-title']}>{item.slogan}</div>
            <div className={styles['carousel-sub-title']}>{item.subSlogan}</div>
            <img className={styles['carousel-image']} src={item.image} />
          </div>
        </div>
      ))}
    </Carousel>
  );
}
