import React, {useEffect, useState} from 'react';
import '../style.scss';
import './style.scss';
import Logo from "../../../assets/svg/sunCover.svg";
import {BonusEnum} from "../../../platform/enums/bonus";
import {Activate} from "./activate";
import {Confirm} from "./confirm";
import {Verify} from "./verify";

interface IModal {
  show: boolean,
  close:  (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  submit: () => void,
  onChange: (name, val) => void,
  btnText?: string,
  addTransaction: (TransactionsModel) => void
}

export function BonusCardModal(props: IModal) {

  const [nextContent, setNextContent] = useState<BonusEnum>(BonusEnum.activate);
  const [form, setForm] = useState();

  useEffect(() => {
  }, [props.show])

  return (
    <div className='P-modal'>
      <div onClick={props.close} className='P-modal-cover'  style={props.show ? {display: "block"} : {display: "none"}}></div>
      <div className="P-modal-wrapper-lg P-modal-wrapper"
           style={{
             transform: props.show ? 'translateY(-50%)' : 'translateY(-110vh)',
             top: props.show ? '50%' : '-100%',
             opacity: props.show ? '1' : '0'
           }}>
        <div className='P-bonus-modal'>
          <div className="P-bonus-modal-sun">
            <div className="P-modal-sun"></div>
            <div className="P-logo G-flex-align-center G-position-absolute">
              <div className="P-border-ping G-flex-align-center">
                <div className="P-border-blue G-flex-align-center"><img className="P-logo-img" src={Logo} alt="logo"/></div>
              </div>
            </div>
          </div>
          {nextContent === BonusEnum.activate  &&
            <Activate nextContent={setNextContent}/>
          }
          {nextContent === BonusEnum.verify  &&
            <Verify nextContent={setNextContent} setForm={(form) => setForm(form)}/>
          }
          {nextContent === BonusEnum.confirm  &&
            <Confirm form={form} nextContent={setNextContent} addTransaction={(transaction) => {props.addTransaction(transaction)}}/>
          }
        </div>
      </div>
    </div>
  )
}

