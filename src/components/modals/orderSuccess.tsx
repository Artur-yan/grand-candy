import React, {useEffect, useState} from 'react';
import './style.scss';
import {ButtonBase} from "../formElements";
import OrderSvg from '../../assets/svg/order.svg'
import OrderBubblesSvg from '../../assets/svg/ic_orderbubles.svg'

interface IModal {
  show: boolean,
  order: {orderNumber: number},
  close: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export function OrderSuccess(props: IModal) {

  useEffect(() => {
  }, [props.show])

  return (
    <div className='P-modal'>
      <div onClick={props.close} className='P-modal-cover'
           style={props.show ? {display: "block"} : {display: "none"}}></div>
      <div className="P-modal-wrapper-sm P-modal-wrapper"
         style={{
           transform: props.show ? 'translateY(-50%)' : 'translateY(-110vh)',
           top: props.show ? '50%' : '-100%',
           opacity: props.show ? '1' : '0'
         }}>
        <div className='P-modal-section-md '>
          <img className='P-left-sun' src="" alt=""/>
          <div className='P-center-sm'>
            <div className="P-text">
              <div className="G-empty-view G-height-150px">
                <div className='G-bubble'>
                  <img className='G-empty-bubble' src={OrderBubblesSvg} alt="order"/>
                  <img className='G-empty-icon' src={OrderSvg} alt="order"/>
                </div>
              </div>
              <div className='G-font-bold-md-2 G-mt-19'>Order placed</div>
              <div className='G-mt-19'>Order #{props.order.orderNumber} has been successfully placed.</div>
            </div>
          </div>
          <div className="P-modal-footer G-width-80 text-center G-flex-align-center G-mb-35">
            <ButtonBase loading={false} onClick={props.close} classes='P-btn-bg-ping P-btn-primary'>OK</ButtonBase>
          </div>
        </div>
      </div>
    </div>
  )
}
