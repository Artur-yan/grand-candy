import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Paths from "../../../../routes/paths";
import {ButtonBase} from "../../../../components/formElements";
import {INewsModel} from "../../../../platform/api/news/res/news-model";
import NewsApi from "../../../../platform/api/news/news";
import {Card} from "../../../../components/news/card";
import '../../news/styles.scss'

export function LatestNews({history}) {

  const [news, setNews] = useState<INewsModel[]>([]);

  const toNews = (id) => {
    history.push(`${Paths.NEWS_PAGE}/${id}`);
  }

  const getNews = () => {
    NewsApi.news(0, 6).then(news => {
      setNews(news.data.content)
    })
  }

  useEffect(() => {
    getNews()
  }, []);

  return (
    <div className='G-mt-100'>
      <h3 className='G-mb-35'>Latest news</h3>
      <div className="P-news-card G-flex-wrap">
        {news.length > 0 ? (
          news.map((val, index) => {
            return (
              <Card classes='P-card-item-md' key={index} news={val} toNewsPage={() => {toNews(val.id)}} />
            )
          })
        ) : (
          'Loading...'
        )}
      </div>
      <div className='G-mt-80 G-flex-align-center'>
        <Link className='G-width-20' to={Paths.NEWS}>
          <ButtonBase loading={false} onClick={() => {}} classes='P-btn-bg-ping P-btn-primary'>
            View all
          </ButtonBase>
        </Link>
      </div>
    </div>
  )
}