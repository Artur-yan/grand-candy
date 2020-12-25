import React, { useState } from 'react';
import '../style.scss';
import {ButtonBase, Input} from "../../formElements";
import authApi from "../../../platform/api/authApi";
import {Error} from "../../alerts/toast";
import {ISignUp} from "../../../platform/interfaces/signUp";
import {AuthContents} from "../../../platform/enums/authContents";
import {ValidateEnum} from "../../../platform/enums/validate";
import {VerifyForgotPassword} from "./verifyForgotPassword";
import t from '../../../i18n/translate';
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";

interface IModal {
  form: ISignUp,
  nextContent: (AuthContents) => void,
}

export function ForgotPassword(props: IModal) {

  const [form, setForm] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loader, setLoader] = useState(false);

  const updateForm = (name, val) => {
    let newForm = {...form};
    newForm[name] = val;
    setForm(newForm)
  }

  const sendCode = () => {
    if (form) {
      setLoader(true)
      authApi.sendCodeForgotPassword(form.email).then((res) => {
        res.success ? setSuccess(true) : Error(res.message);
        setLoader(false)
      })
    } else {
      Error('Email is required')
    }
  }

  return (
    <div className='P-modal-section-md'>
      {!success ? (
        <div className='P-center'>
          <div className="P-text">
            <h3>{t('auth_forgot_password')}</h3>
            <div className='G-text-sm-gray-2 G-mt-19'>{t('auth_sign_in_hint_text')}</div>
          </div>
          <div className="P-form">
            <div className='G-mb-25'>
              <Input validate={ValidateEnum.email} type='text' name='email' classes='P-pi-20' placeholder={messages[LanguageStorage.getLanguage()]['email']} onBlur={(name, value) => {updateForm(name, value)}}/>
            </div>
          </div>
          <ButtonBase loading={loader} onClick={sendCode} classes='P-btn-bg-ping P-btn-primary'>{t('next')}</ButtonBase>
        </div>
      ) : (
        <VerifyForgotPassword nextContent={() => props.nextContent(AuthContents.signIn)} email={form.email}/>
      )}
      <div className="P-modal-footer text-center d-flex-align-center">
        <span className='P-sign-up-text'>{t('sign_up_have_an_account')}</span> <span className='P-sign-up-btn' onClick={() => props.nextContent(AuthContents.signIn)}>{t('sign_in')}</span>
      </div>
    </div>
  )
}
