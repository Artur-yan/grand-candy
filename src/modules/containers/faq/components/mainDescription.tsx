import React from "react";

interface IProps {
  title: JSX.Element,
  text: JSX.Element,
}
export function MainDescription(props: IProps) {
  return (
    <div className='G-info-section'>
      <div className='G-mb-35'>
        <h4>{props.title}</h4>
      </div>
      <div className='P-info-text'>
        {props.text}
      </div>
    </div>
  )
}