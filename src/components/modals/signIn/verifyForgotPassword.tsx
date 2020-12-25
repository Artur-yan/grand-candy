import React, {useEffect, useState} from 'react';
import '../style.scss';
import {ButtonBase, Input} from "../../formElements";
import authApi from "../../../platform/api/authApi";
import {Error} from "../../alerts/toast";
import {ValidateEnum} from "../../../platform/enums/validate";
import {ResetPassword} from "./resetPassword";
import t from "../../../i18n/translate";
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";

interface IModal {
  nextContent: (AuthContents) => void,
  email: string
}

export function VerifyForgotPassword(props: IModal) {

  let mounted = true;
  const [code, setCode] = useState<string>(null);
  const [verifyCodeSuccess, setVerifyCodeSuccess] = useState(false);
  const [resendTimeLeft, setResendTimeLeft] = useState<number>(59);
  const [loader, setLoader] = useState(false);

  const [downloadTimer] = useState(setTimeout(function () {

    if (resendTimeLeft > 0) {
      setResendTimeLeft(resendTimeLeft - 1)
    } else {
      clearTimeout(downloadTimer);
    }
  }, 1000));

  useEffect(() => {
    mounted = false
    return () => {
      clearTimeout(downloadTimer);
    }
  })

  const sendCode = () => {
    setResendTimeLeft(59)
    authApi.sendCodeForgotPassword(props.email).then((res) => {
      !res.success && Error(res.message);
    })
  }

  const verifyCode = () => {

    if (code) {
      setLoader(true)
      authApi.verifyCode({email: props.email, code: code}).then((res) => {
        res.success ? setVerifyCodeSuccess(true) : Error(res.message);
        setLoader(false)
      })
    } else {
      Error('Code is required!')
    }
  }

  return (
    <div className='P-center'>
      {!verifyCodeSuccess ? (
        <>
          <div className="P-text">
            <h3>Forgot password</h3>
            <div className='G-text-sm-gray-2 G-mt-19'>We have sent the verification code to your Email</div>
          </div>
          <div className='P-form G-mb-15'>
            <Input disabled={true} value={props.email} validate={ValidateEnum.email} type='text' name='email' classes='P-pi-20' placeholder={messages[LanguageStorage.getLanguage()]['email']} onBlur={(name, value) => {}}/>
          </div>
          <div className="G-mb-20">
            <Input type='text' name='code' classes='G-mb-15 P-pi-20' placeholder={messages[LanguageStorage.getLanguage()]['code']} onBlur={(name, value) => {
              setCode(value)
            }}/>
          </div>
          <ButtonBase loading={loader} onClick={verifyCode} classes='P-btn-bg-ping P-btn-primary'>{t('next')}</ButtonBase>
          <div className='G-flex-space-between G-mt-19'>
            <span className={`${resendTimeLeft > 0 ? 'G-text-gray-sm' : 'G-color-ping'}`}>{resendTimeLeft > 0 ? t('verification_resend_code_in') : t('verification_resend_code') }</span>
            {resendTimeLeft > 0 ? <span className='G-color-ping'>00:{resendTimeLeft < 10 ? `0${resendTimeLeft}` : resendTimeLeft}</span> :
              <span className='G-color-ping G-cursor-pointer' onClick={() => sendCode()}>{t('verification_resend')}</span>}
          </div>
        </>
      ) : (
        <ResetPassword form={{email: props.email, code:code, password:''}} nextContent={(cont) => {props.nextContent(cont)}}/>
      )}
    </div>
  )
}
