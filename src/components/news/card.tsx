import React from 'react';
import defaultImg from '../../assets/img/default.png'
import './styles.scss'
import { INewsModel } from '../../platform/api/news/res/news-model';
import {MomentDate} from "../../platform/services/helpers";

interface IProps {
  toNewsPage: (id: number) => void;
  news: INewsModel;
  classes?: string
}

export function Card(props: IProps) {

  return (
    <div className={`G-flex G-cursor-pointer ${props.classes ? props.classes : ''}`} onClick={() => props.toNewsPage(props.news.id)}>
      <div className='P-card-image' style={{backgroundImage:`url(${props.news.imageUrls[0] || defaultImg})`}}>
      </div>
      <div className='P-card-info'>
        <span className='P-card-description'>
          <MomentDate milliSec={props.news.createdDate}/>
        </span>
        <div className='P-card-title P-card-text'>{props.news.title}</div>
        <div className='G-flex-vertical-center G-pt-3 G-move-bottom'>
          <span className="P-view-count"><i className='icon-ic_eye'/><span className='P-count'>{props.news.viewCount}</span></span>
        </div>
      </div>
    </div>
  );
}
