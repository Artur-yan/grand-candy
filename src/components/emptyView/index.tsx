import React from "react";
import './style.scss';

interface IProps {
  bubble: string,
  icon : string,
  height?: number,
  title?: string | JSX.Element,
  desc?: string | JSX.Element
}

export function EmptyView(props: IProps) {

  return (
    <div className='G-empty-view' style={{height: props.height ? props.height+'px' : '250px'}}>
      <div className='G-bubble'>
        <img className='G-empty-bubble' src={props.bubble} alt="order"/>
        <img className='G-empty-icon' src={props.icon} alt="order"/>
      </div>
      <div className='G-flex-column G-text-center'>
        <p className='G-fsb-18 G-p-20'>{props.title ? props.title : ''}</p>
        <p className='G-text-sm-gray-2'>{props.desc ? props.desc : ''}</p>
      </div>
    </div>
  )
}