import React, {useState} from 'react';
import '../style.scss';
import {ButtonBase, Input} from "../../formElements";
import authApi from "../../../platform/api/authApi";
import {Error} from "../../alerts/toast";
import {AuthContents} from "../../../platform/enums/authContents";
import {IResetPassword} from "../../../platform/interfaces/resetPassword";
import t from '../../../i18n/translate';
import messages from "../../../i18n/messages/index";
import LanguageStorage from "../../../platform/services/storages/languageStorage";

interface IModal {
  form: IResetPassword,
  nextContent: (AuthContents) => void,
}

export function ResetPassword(props: IModal) {

  const [form, setForm] = useState<IResetPassword>(props.form);
  const [confirmPass, setConfirmPass] = useState<string>(null);
  const [loader, setLoader] = useState(false);

  const updateForm = (name, val) => {
    let newForm = {...form};
    newForm[name] = val;
    setForm(newForm)
  }

  const signUp = () => {
    if (form.password === confirmPass) {
      setLoader(true)
      authApi.resetPassword(form).then((res) => {
        res.success ? props.nextContent(AuthContents.signIn) : Error(res.message);
        setLoader(false)
      })
    } else {
      Error(messages[LanguageStorage.getLanguage()]['error_passwords_not_match'])
    }
  }

  return (
    <div className='P-center'>
      <div className="P-text">
        <h3>{t('forgot_title')}</h3>
        <div className='G-text-sm-gray-2 G-mt-19'>{t('forgot_description')}</div>
      </div>
      <div className="P-form G-mb-35">
        <div className='G-mb-15'>
          <Input type='password' name='password' placeholder={messages[LanguageStorage.getLanguage()]['password']} onBlur={(name, value) => {
            updateForm(name, value)
          }}/>
        </div>
        <div className='G-mb-15'>
          <Input type='password' name='confirmPassword' placeholder={messages[LanguageStorage.getLanguage()]['create_password_confirm_new_password']} onBlur={(name, value) => {
            setConfirmPass(value)
          }}/>
        </div>
      </div>
      <ButtonBase loading={loader} onClick={signUp} classes='P-btn-bg-ping P-btn-primary'>{t('next')}</ButtonBase>
    </div>
  )
}
