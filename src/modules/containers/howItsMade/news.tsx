import React, {useEffect, useState} from "react";
import NewsApi from "../../../platform/api/news/news";
import {INewsModel} from "../../../platform/api/news/res/news-model";
import './styles.scss';
import {Slider} from "../../../components/slider/slider";
import {Card} from "../../../components/news/card";
import Paths from "../../../routes/paths";
import {MomentDate} from "../../../platform/services/helpers";

export function NewsPage({match, history}) {

  const [news, setNews] = useState<INewsModel>(null);
  const [allNews, setAllNews] = useState<INewsModel[]>([]);
  const [success, setSuccess] = useState(false);
  const [newsCount] = useState(3);

  const toNews = (id) => {
    history.push(`${Paths.NEWS_PAGE}/${id}`);
  }

  useEffect(() => {
    NewsApi.newsPage(match.params.id).then(news => {
      setNews(news.data)
      setSuccess(news.success);

      NewsApi.news(0, newsCount).then(news => {
        let getNews = [...news.data.content];
        const index = getNews.findIndex(x => x.id == match.params.id);
        delete getNews[index];
        setAllNews(getNews);
      })
    })
  }, [match.url]);

  return (
    success &&
    <div className='P-news-page G-mb-100'>
      <div className="P-info">
        <div className="P-date"><MomentDate milliSec={news.createdDate}/></div>
        <div className='P-title'>{news.title}</div>
      </div>
      <Slider images={news.imageUrls}/>
      <div className='P-description'>
        <pre>{news.description}</pre>
      </div>
      <div className='G-list-heading'>
        Company news
      </div>
      <div className="P-additional-news P-news-card G-flex-wrap">
        {allNews.length > 0 &&
        allNews.map((val, index) => {
          return (
            <Card classes='P-card-item-md' key={index} news={val} toNewsPage={() => toNews(val.id)} />
          )
        })
        }
      </div>
    </div>
  );
}
