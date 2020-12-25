import React, {useEffect, useState} from "react";
import HowItIsMadeApi from "../../../platform/api/howItIsMade/howItIsMade";
import {INewsModel} from "../../../platform/api/news/res/news-model";
import {Card} from "../../../components/howItsMade/card";
import Paths from "../../../routes/paths";
import './styles.scss';
import defaultImg from "../../../assets/img/default.png";
import {MomentDateMilliSec} from "../../../platform/services/helpers";
import {PaginationUi} from "../../../components/pagination/pagination";
import {IHowItIsMadeModel} from "../../../platform/api/howItIsMade/res/howItIsMade-model";
import {LightBoxSlider} from "../../../components/lightBoxSlider/lightBoxSlider";
import {CircularProgress} from "@material-ui/core";
import t from "../../../i18n/translate";

export function HowItsMade({match, history}) {

  const images = [
    {source: '/static/media/factoryX2.fadd4797.png'},
    {source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'},
  ];

  const [news, setNews] = useState<IHowItIsMadeModel[]>([]);
  const [firstNews, setFirstNews] = useState<IHowItIsMadeModel[]>([]);
  const [success, setSuccess] = useState(false);
  const [pagination, setPagination] = useState({total: 0, count: 3});
  const [currentPage, setCurrentPage] = useState(0);
  const [lightBox, setLightBox] = useState(false);
  const [loader, setLoader] = useState(false);

  const toNews = (id) => {
    history.push(`${Paths.NEWS_PAGE}/${id}`);
  }

  const getAllHowItIsMade = (page) => {
    setLoader(true)
    HowItIsMadeApi.getAllHowItIsMade(page, 8).then(news => {
      let getNews = [...news.data.content];
      setPagination({...pagination, total: news.data.totalPages})
      let firstNews = getNews.slice(0, 2);
      delete getNews[0];
      delete getNews[1];
      setNews(getNews)
      setFirstNews(firstNews)
      setSuccess(true)
      setLoader(false)
    })
  }

  useEffect(() => {
    getAllHowItIsMade(0)
  }, []);

  const setPage = (event: React.ChangeEvent<unknown>, value: number) => {
    getAllHowItIsMade(value - 1);
    setCurrentPage(value)
  };

  return (
    <div className="P-news G-mt-100 G-mb-100">
      <div className='P-news-section'>{t('how_its_made')}</div>
      <div className='G-position-relative'>
        {loader ? (
          <CircularProgress size={70} className='G-full-center' color="secondary"/>
        ) : (
          <>
            {success &&
            <>
                <div className='P-news-header'>
                  {firstNews.length > 0 &&
                  firstNews.map((val, index) => {
                    return (
                      <div key={index} className={`${index === 0 ? 'P-first-news' : 'P-second-news P-news-card'}`}>
                        {index === 1 ?
                          (
                            <Card classes='P-card-item-md P-second-news-card' howItIsMade={val} toNewsPage={() => {
                            }}/>
                          ) : (
                            <>
                              <LightBoxSlider close={() => {
                                setLightBox(false)
                              }} images={val.multipartFiles} show={lightBox}/>
                              <div onClick={() => {
                                setLightBox(true)
                              }} className="P-info G-cursor-pointer"
                                   style={{backgroundImage: `url(${val.multipartFiles[0] ? val.multipartFiles[0].imageFileUrl : defaultImg})`}}>
                                <div className="P-date"><MomentDateMilliSec milliSec={val.createdDate}/></div>
                                <div className="P-title">
                                  {val.title}
                                </div>
                              </div>
                            </>
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
                      <Card classes='P-card-item-md' key={index} howItIsMade={val} toNewsPage={() => {
                      }}/>
                    )
                  })
                  }
                </div>
              {pagination && pagination.total > 1 &&
              <div className="G-flex-align-center">
                  <PaginationUi page={currentPage} count={pagination.total} onChange={setPage}/>
              </div>
              }
            </>
            }
          </>
        )}
      </div>
    </div>
  );
}
