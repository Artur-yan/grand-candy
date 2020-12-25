import React, {useEffect, useState} from 'react';
import '../style.scss';
import {ButtonBase, Input} from "../../formElements";
import authApi from "../../../platform/api/authApi";
import {Error} from "../../alerts/toast";
import { AuthContents } from "../../../platform/enums/authContents";
import t from "../../../i18n/translate";
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";

interface IModal {
  nextContent: (AuthContents) => void,
  email: string
}

export function VerifyCode(props: IModal) {

  const [code, setCode] = useState<string>(null);
  const [loader, setLoader] = useState(false);
  const [resendTimeLeft, setResendTimeLeft] = useState<number>(59);
  const [downloadTimer] = useState(setTimeout(function (){

    if (resendTimeLeft > 0) {
      setResendTimeLeft(resendTimeLeft - 1)
    } else {
      clearTimeout(downloadTimer);
    }
  }, 1000));

  useEffect(() => {
    return () => {
      clearTimeout(downloadTimer);
    }
  })

  const sendCode = () => {
    setResendTimeLeft(59)
    authApi.sendCode(props.email).then((res) => {
      !res.success && Error(res.message);
    })
  }

  const verifyCode = () => {

    if (code) {
      setLoader(true)
      authApi.verifyCode({email: props.email, code: code}).then((res) => {
        res.success ? props.nextContent(AuthContents.password) : Error(res.message);
        setLoader(false)
      })
    } else {
      Error('Code is required!')
    }
  }

  return (
    <div className='P-modal-section-md'>
      <div className='P-center'>
        <div className="P-text">
          <h3>{t('sign_up')}</h3>
          <div className='G-text-sm-gray-2 G-mt-19'>{t('verification_description')}</div>
        </div>
        <div className="P-form G-mb-35">
          <Input type='text' name='code' classes='P-pi-20 G-mb-15' placeholder={messages[LanguageStorage.getLanguage()]['code']} onBlur={(name, value) => {setCode(value)}}/>
        </div>
        <ButtonBase loading={loader} onClick={verifyCode} classes='P-btn-bg-ping P-btn-primary'>{t('next')}</ButtonBase>
        <div className='G-flex-space-between G-mt-19'>
          <span className={`${resendTimeLeft > 0 ? 'G-text-gray-sm' : 'G-color-ping'}`}>{resendTimeLeft > 0 ? t('verification_resend_code') : t('verification_resend_code_in')}</span>
          {resendTimeLeft > 0 ? <span className='G-color-ping'>00:{resendTimeLeft < 10 ? `0${resendTimeLeft}` : resendTimeLeft}</span> : <span className='G-color-ping G-cursor-pointer' onClick={() => sendCode()}>{t('verification_resend')}</span>}
        </div>
      </div>
      <div className="P-modal-footer text-center d-flex-align-center">
        <span className='P-sign-up-text'>{t('sign_up_have_an_account')}</span> <span className='P-sign-up-btn' onClick={() => props.nextContent(AuthContents.signIn)}>{t('sign_in')}</span>
      </div>
    </div>
  )
}
