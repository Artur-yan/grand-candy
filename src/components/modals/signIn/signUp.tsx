import React, {useEffect, useState} from 'react';
import '../style.scss';
import {ButtonBase, Input} from "../../formElements";
import {ValidateEnum} from "../../../platform/enums/validate";
import authApi from "../../../platform/api/authApi";
import {Error} from "../../alerts/toast";
import {ISignUp} from "../../../platform/interfaces/signUp";
import {AuthContents} from "../../../platform/enums/authContents";
import {ErrorMultiple} from "../../alerts/toast/toast";
import t from '../../../i18n/translate';
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";


interface IModal {
  sendForm: (ISignUp) => void,
  nextContent: (AuthContents) => void,
}

export function SignUp(props: IModal) {

  const [form, setForm] = useState<ISignUp>();
  const [loader, setLoader] = useState(false);

  const updateForm = (name, val) => {
    let newForm = {...form};
    newForm[name] = val;
    setForm(newForm)
  }

  const sendCode = () => {

      let validationKeys = [
        {
          name: 'firstName',
          message: 'First name is required!'
        },
        {
          name: 'lastName',
          message: 'Last name is required!'
        },
        {
          name: 'email',
          message: 'Email name is required!'
        }].filter((val, index) => {
        return form ? !form[val.name] : []
      });

    if (validationKeys.length === 0) {
        setLoader(true)
        authApi.sendCode(form.email).then((res) => {

          if (res.success) {
            props.sendForm(form);
            props.nextContent(AuthContents.code);
          } else {
            Error(res.message);
          }
          setLoader(false)
        })
      } else {
        ErrorMultiple('Enter the required fields')
      }
  }

  return (
    <div className='P-modal-section-md'>
      <div className='P-center'>
        <div className="P-text">
          <h3>{t('sign_up')}</h3>
          <div className='G-text-sm-gray-2 G-mt-19'>{t('sign_up_description')}
          </div>
        </div>
        <div className="P-form G-mb-35">
          <Input type='text' name='firstName'  validate={ValidateEnum.required} divClasses='G-mb-15'
                 placeholder={messages[LanguageStorage.getLanguage()]['first_name']} onBlur={(name, value) => {
            updateForm(name, value)
          }}/>
          <Input type='text' name='lastName' validate={ValidateEnum.required} divClasses='G-mb-15' placeholder={messages[LanguageStorage.getLanguage()]['last_name']}
                 onBlur={(name, value) => {
                   updateForm(name, value)
                 }}/>
          <Input type='text' name='email' validate={ValidateEnum.email} placeholder={messages[LanguageStorage.getLanguage()]['email']} onBlur={(name, value) => {
            updateForm(name, value)
          }}/>
        </div>
        <ButtonBase loading={loader} onClick={sendCode} classes='P-btn-bg-ping P-btn-primary'>{t('next')}</ButtonBase>
      </div>
      <div className="P-modal-footer text-center d-flex-align-center">
        <span className='P-sign-up-text'>{t('sign_up_have_an_account')}</span>
        <span className='P-sign-up-btn' onClick={() => props.nextContent(AuthContents.signIn)}>{t('sign_in')}</span>
      </div>
    </div>
  )
}
