import React from "react";
import BigLogo from '../../../assets/svg/sunCover.svg';
import {TopCategories} from "./components/topCategories";
import {LatestNews} from "./components/latestNews";
import {MostPopular} from "./components/mostPopular";
import './styles.scss'
import {CustomerSupport} from "../../../components/customerSupport/customerSupport";
import AuthStorage from "../../../platform/services/storages/authStorage";

export function Home ({history}) {
  return (
    <div className='P-home G-mb-100'>
      <div className='P-sun-cover G-flex-align-center'>
        <div className='P-sun-cover-image'></div>
        <div className='P-logo G-flex-align-center G-position-absolute'>
          <div className='P-border-ping G-flex-align-center'>
            <div className='P-border-blue G-flex-align-center'>
              <img className='P-logo-img' src={BigLogo} alt="logo"/>
            </div>
          </div>
        </div>
      </div>
      <div className='G-flex-column'>
        <TopCategories history={history}/>
        {/*<LatestNews history={history}/>*/}
        <MostPopular history={history}/>
      </div>
      {AuthStorage.getUser() &&
        <CustomerSupport/>
      }
    </div>
  );
}
