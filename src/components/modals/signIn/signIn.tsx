import React, {useState} from 'react';
import '../style.scss';
import {ButtonBase, Input} from "../../formElements";
import authApi from "../../../platform/api/authApi";
import {Error} from "../../alerts/toast";
import AuthStorage from "../../../platform/services/storages/authStorage";
import { AuthContents } from "../../../platform/enums/authContents";
import t from '../../../i18n/translate';
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";

interface IModal {
  signUp: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  nextContent: (AuthContents) => void,
  history: any
}

export function SignIn(props: IModal) {

  const [formData, setFormData] = useState({email: '', password:''});
  const [loader, setLoader] = useState(false);

  const submit = () => {

    if (!formData.email && !formData.password) {
      return Error('Email and Password are required')
    }
    setLoader(true)
    authApi.signIn(formData).then((res) => {
      if (res.success) {
        props.history.push('/')
        AuthStorage.setApiToken(res.data.token)
      } else {
        Error(res.message)
      }
      setLoader(false)
    })
  };

  return (
    <div className='P-modal-section-md'>
      <div className='P-center'>
        <div className="P-text">
          <h3>{t('sign_in')}</h3>
          <div className='G-text-sm-gray-2 G-mt-19'>{t('auth_sign_in_hint_text')}</div>
        </div>
        <div className="P-form G-mb-35">
          <Input type='text' name='email' classes='G-mb-15' placeholder={messages[LanguageStorage.getLanguage()]['email']} onBlur={(name, value) => {setFormData({...formData, [name]: value})}}/>
          <Input type='password' name='password' placeholder={messages[LanguageStorage.getLanguage()]['password']} onBlur={(name, value) => {setFormData({...formData, [name]: value})}}/>
          <span className='G-move-right G-mt-7 G-cursor-pointer' onClick={() => props.nextContent(AuthContents.forgotPassword)}>Forgot password?</span>
        </div>
        <ButtonBase loading={loader} onClick={submit} classes='P-btn-bg-ping P-btn-primary'>{t('sign_in')}</ButtonBase>
      </div>
      <div className="P-modal-footer text-center d-flex-align-center">
        <span className='P-sign-up-text'>Don't have an account?</span> <span className='P-sign-up-btn' onClick={() => props.nextContent(AuthContents.signUp)}>{t('sign_up')}</span>
      </div>
    </div>
  )
}
