import React, { useState } from 'react';
import '../style.scss';
import {ButtonBase, Input} from "../../formElements";
import authApi from "../../../platform/api/authApi";
import {Error} from "../../alerts/toast";
import {ISignUp} from "../../../platform/interfaces/signUp";
import {Check} from "../../formElements/checkBox";
import AuthStorage from "../../../platform/services/storages/authStorage";
import {AuthContents} from "../../../platform/enums/authContents";
import t from '../../../i18n/translate';
import messages from "../../../i18n/messages/index";
import LanguageStorage from "../../../platform/services/storages/languageStorage";
interface IModal {
  form: ISignUp,
  nextContent: (AuthContents) => void,
}

export function Password(props: IModal) {

  const [form, setForm] = useState<ISignUp>(props.form);
  const [confirmPass, setConfirmPass] = useState<string>(null);
  const [privacy, setPrivacy] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);

  const updateForm = (name, val) => {
    let newForm = {...form};
    newForm[name] = val;
    setForm(newForm)
  }

  const signUp = () => {
    if (form.password === confirmPass) {
      setLoader(true)
      authApi.signUp(form).then((res) => {
        res.success ? AuthStorage.setApiToken(res.data.token) : Error(res.message);
        setLoader(false)
      })
    } else {
      Error(messages[LanguageStorage.getLanguage()]['error_passwords_not_match'])
    }
  }

  return (
    <div className='P-modal-section-md'>
      <div className='P-center'>
        <div className="P-text">
          <h3>{t('sign_up')}</h3>
          <div className='G-text-sm-gray-2 G-mt-19'>{t('create_password_description_sign_up')}</div>
        </div>
        <div className="P-form G-mb-35">
          <div className='G-mb-15'>
            <Input type='password' name='password' placeholder={messages[LanguageStorage.getLanguage()]['password']} onBlur={(name, value) => {updateForm(name,value)}}/>
          </div>
          <div className='G-mb-15'>
            <Input type='password' name='confirmPassword' placeholder={messages[LanguageStorage.getLanguage()]['create_password_confirm_new_password']} onBlur={(name, value) => {setConfirmPass(value)}}/>
          </div>
          <div className='G-flex-vertical-center '>
            <Check name='privacy' onChange={(checked) => {setPrivacy(checked)}} />
            <div className='P-privacy'>
              <span className='P-sign-up-text'>{t('create_password_agreement_text')} </span>
              <span className='G-bold-5'>{t('terms_and_conditions')}</span>
              <span className='P-sign-up-text'>{t('and')} </span>
              <span className='G-bold-5'>{t('privacy_policy')}</span>
            </div>
          </div>
        </div>
        <ButtonBase loading={loader} disable={!privacy} onClick={signUp} classes='P-btn-bg-ping P-btn-primary'>{t('sign_up')}</ButtonBase>
      </div>
      <div className="P-modal-footer text-center d-flex-align-center">
        <span className='P-sign-up-text'>{t('sign_up_have_an_account')}</span> <span className='P-sign-up-btn' onClick={() => props.nextContent(AuthContents.signUp)}>{t('sign_in')}</span>
      </div>
    </div>
  )
}
