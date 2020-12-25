import React from 'react';
import defaultImg from '../../assets/img/default.png'
import {IBranchModel} from "../../platform/api/branch/res/branch-model";
import './styles.scss'
import {Favorite, FavoriteVenue} from "../formElements";
import {MomentTime, MomentTimeMilliSec} from "../../platform/services/helpers";
import {WorkingHours} from "../workingHours";

interface IProps {
  shop: IBranchModel;
  classes?: string
  isFavorite: boolean
  favorite: () => void
  onClick?: () => void
}

export function Card(props: IProps) {
  return (
    <div className={`G-flex-column G-cursor-pointer ${props.classes ? props.classes : ''}`} onClick={props.onClick}>
      <div className='P-card-image' style={{backgroundImage:`url(${props.shop.imageUrl || defaultImg})`}}>
      </div>
      <div className='G-flex'>
        <div className='P-card-info'>
          <div className='P-card-title'>{props.shop.title}</div>
          <span className='P-card-description'>
          <span className='P-card-address'><i className='icon-ic_location G-mr-2'/>{props.shop.address}</span>
          <span className='G-mt-10'><i className='icon-ic_phone G-mr-2'/>{props.shop.phoneNumber}</span>
          <span className='G-mr-1 G-mt-10 G-flex'>
            <i className='G-mr-2 icon-Ic_pending G-opacity-0'></i>
            <WorkingHours days={props.shop.workingDateHours} className='G-flex'/>
          </span>
        </span>
        </div>
        <div className='P-shop-favorite'>
          <FavoriteVenue isFavorite={props.isFavorite} onClick={() => {props.favorite()}}>
          </FavoriteVenue>
        </div>
      </div>
    </div>
  );
}
