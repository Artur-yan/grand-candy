import React from "react";
import VisaLogo from "../../../../../../assets/svg/visa-white.svg";
import './style.scss';
import {ICardModel} from "../../../../../../platform/api/card/res/card-model";

interface IProps {
  logo?: any,
  card: ICardModel
  delete?: (id) => void
  setDefault?: (id) => void
  showActions?: boolean
  gradient: string
}

export const PaymentCard = (props: IProps) => {
  return (
    <div className="P-payment-card" style={{backgroundImage: props.gradient}}>
      <div className='P-payment-card-header'>
        {props.logo && <div className='P-payment-card-title'><img className='P-card-logo' src={VisaLogo} alt=""/></div>}
        {props.showActions &&
          <div className='P-payment-card-actions'>
            {props.card.default ?
              <i className="icon-ic_check G-cursor-pointer" onClick={() => {props.setDefault(props.card.cardId)}}></i>
              : <i className="icon-ic_emptycheck G-cursor-pointer" onClick={() => {props.setDefault(props.card.cardId)}}></i>}
              <i className="icon-delete_bin G-cursor-pointer" onClick={() => {props.delete(props.card.cardId)}}></i>
          </div>
        }
      </div>
      <div className='P-payment-card-number'><span>****</span> <span>****</span> <span>****</span> {props.card.cardNumber ? props.card.cardNumber.substr(props.card.cardNumber.length - 4) : <span>****</span>}</div>
      <div className='P-payment-card-name'>
        <div className='P-payment-card-owner'>{props.card.cardHolderName}</div>
        <div className='P-payment-card-date'>{`${props.card.expirationDate.substr(-4, 2)}/${props.card.expirationDate.substr(-2, 2)}`}</div>
      </div>
    </div>
  )
}