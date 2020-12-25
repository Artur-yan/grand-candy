import React, {useState} from 'react';
import defaultImg from '../../assets/img/default.png'
import './styles.scss'
import {MomentDateMilliSec} from "../../platform/services/helpers";
import {IHowItIsMadeModel} from "../../platform/api/howItIsMade/res/howItIsMade-model";
import {LightBoxSlider} from "../lightBoxSlider/lightBoxSlider";

interface IProps {
  toNewsPage: (id: number) => void;
  howItIsMade: IHowItIsMadeModel;
  classes?: string
}

export function Card(props: IProps) {

  const [lightBox, setLightBox] = useState(false);

  return (
    <div className={`G-flex G-cursor-pointer ${props.classes ? props.classes : ''}`}>
      <LightBoxSlider close={() => {setLightBox(false)}} images={props.howItIsMade.multipartFiles} show={lightBox}/>
      <div onClick={() => setLightBox(true)} className='P-card-image' style={{backgroundImage:`url(${props.howItIsMade.multipartFiles[0] ? props.howItIsMade.multipartFiles[0].imageFileUrl : defaultImg})`}}>
      </div>
      <div className='P-card-info'>
        <span className='P-card-description'>
          <MomentDateMilliSec milliSec={props.howItIsMade.createdDate}/>
        </span>
        <div className='P-card-title P-card-text'>{props.howItIsMade.title}</div>
      </div>
    </div>
  );
}
