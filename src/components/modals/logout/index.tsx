import React from 'react';
import './style.scss';
import {CircularProgress} from "@material-ui/core";
import t from '../../../i18n/translate';

interface IModal {
  show: boolean,
  close:  (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  submit: () => void,
  loading: boolean
}

export function LogoutModal(props: IModal) {

  return (
    <div className='P-modal'>
      <div onClick={props.close} className='P-modal-cover'  style={props.show ? {display: "block"} : {display: "none"}}></div>
      <div className="P-modal-logout P-modal-wrapper"
           style={{
             transition: 'opacity .5s .4s',
             transform: props.show ? 'translateY(-50%)' : 'translateY(-110vh)',
             top: props.show ? '25%' : '-100%',
             opacity: props.show ? '1' : '0'
           }}>
        <div className='P-logout-modal'>
          <h5 className='G-mb-20'>{t('sign_out')}</h5>
          <p>{t('dialog_sign_out_description')}</p>
          <div className='G-flex-end G-pt-3'>
            <div className='G-btn-link-ping' onClick={() => props.submit()}>{props.loading ? <CircularProgress color='inherit' size={25}/> :t('sign_out')}</div>
            <div className='G-btn-link-gray' onClick={props.close}>{t('cancel')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
