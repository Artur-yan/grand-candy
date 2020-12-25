import React, {useEffect, useState} from "react";
import CareerApi from "../../../platform/api/careers/career";
import './styles.scss'
import {ICareerModel} from "../../../platform/api/careers/res/career-model";
import {CircularProgress} from "@material-ui/core";
import t from "../../../i18n/translate";

export function Careers() {

  const [careers, setCareers] = useState<ICareerModel[]>([]);
  const [loader, setLoader] = useState(false);

  const getCareers = (page: number) => {
    setLoader(true)
    CareerApi.careers(page, 9).then((res) => {
      setCareers(res.data.content)
      setLoader(false)
    })
  };

  useEffect(() => {
    getCareers(0)
  }, [])

  return (
    <div className='P-careers G-flex-column G-mb-100'>
      <div className='P-careers-cover'>
        <div className="P-description">
          {t('join_out_team')}
        </div>
      </div>

      <h3 className='G-pt-3 P-careers-title'>{t('careers')}</h3>

      <div className="P-careers-cards">
        {loader ? <CircularProgress size={70} className='G-full-center' color="secondary"/>
          : (
            <>
              {careers.length > 0 &&
              careers.map((val, index) => {
                return (
                  <div key={index} className="P-careers-card">
                    <div className="P-careers-data">
                      <div className="P-card-title">
                        {val.title}
                      </div>
                      <div className="P-card-description" dangerouslySetInnerHTML={{__html: val.description}}/>
                      <div className="P-card-details">
                        <div className='P-card-btn G-flex-align-center'><i className='icon-ic_back P-icon'></i></div>
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </>
          )
        }
      </div>
    </div>
  );
}
