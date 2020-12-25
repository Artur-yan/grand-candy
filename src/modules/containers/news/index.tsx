import React, { useEffect, useState} from "react";
import NewsApi from "../../../platform/api/news/news";
import {INewsModel} from "../../../platform/api/news/res/news-model";
import {Card} from "../../../components/news/card";
import Paths from "../../../routes/paths";
import './styles.scss';
import defaultImg from "../../../assets/img/default.png";
import {MomentDate} from "../../../platform/services/helpers";
import {PaginationUi} from "../../../components/pagination/pagination";

export function News({match, history}) {

  const [news, setNews] = useState<INewsModel[]>([]);
  const [firstNews, setFirstNews] = useState<INewsModel[]>([]);
  const [success, setSuccess] = useState(false);
  const [pagination, setPagination] = useState({total: 0, count: 3});
  const [currentPage, setCurrentPage] = useState(0);

  const toNews = (id) => {
    history.push(`${Paths.NEWS_PAGE}/${id}`);
  }

  const getNews = (page) => {
    NewsApi.news(page, 8).then(news => {
      let getNews = [...news.data.content];
      setPagination({...pagination, total:news.data.totalPages})
      let firstNews = getNews.slice(0, 2);
      delete getNews[0];
      delete getNews[1];
      setNews(getNews)
      setFirstNews(firstNews)
      setSuccess(true)
    })
  }

  useEffect(() => {
    getNews(0)
  }, []);

  const setPage = (event: React.ChangeEvent<unknown>, value: number) => {
    getNews(value -1);
    setCurrentPage(value)
  };

  return (
    success &&
    <div className="P-news G-mt-100 G-mb-100">
      <div className='P-news-section'>Company news</div>
      <div className=''>
        <div className='P-news-header'>
          {firstNews.length > 0 &&
          firstNews.map((val, index) => {
            return (
              <div key={index} className={`${index === 0 ? 'P-first-news' : 'P-second-news P-news-card'}`}>
                {index === 1 ?
                  (
                    <Card classes='P-card-item-md P-second-news-card' news={val} toNewsPage={() => toNews(val.id)} />
                  ) : (
                    <div onClick={() => toNews(val.id)} className="P-info G-cursor-pointer" style={{backgroundImage:`url(${val.imageUrls[0] || defaultImg})`}}>
                      <div className="P-date"><MomentDate milliSec={val.createdDate}/></div>
                      <div className="P-title">
                        {val.title}
                      </div>
                      <div className="P-view-count">
                        <i className='icon-ic_eye'/><span className='P-count'>{val.viewCount}</span>
                      </div>
                    </div>
                  )
                }
              </div>
            )
          })
          }
        </div>
        <div className='P-news-card G-flex-wrap'>
          {news.length > 0 &&
          news.map((val, index) => {
            return (
              <Card classes='P-card-item-md' key={index} news={val} toNewsPage={() => toNews(val.id)} />
              )
          })
          }
        </div>
        {pagination && pagination.total > 1 &&
          <div className="G-flex-align-center">
            <PaginationUi page={currentPage} count={pagination.total} onChange={setPage}/>
          </div>
        }
      </div>
    </div>
  );
}
