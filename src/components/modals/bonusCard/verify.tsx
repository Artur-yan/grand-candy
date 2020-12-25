import {ButtonBase, DatePicker, Input} from "../../formElements";
import React, {useState} from "react";
import {BonusEnum} from "../../../platform/enums/bonus";
import {ValidateEnum} from "../../../platform/enums/validate";
import User from "../../../platform/api/user/user";
import {Error} from "../../alerts/toast";
import t from "../../../i18n/translate";
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";

interface IProps {
  nextContent: (BonusEnum) => void,
  setForm: (Object) => void
}

export function Verify(props: IProps) {

  const [form, setForm] = useState<{dateOfBirthday: number, phoneNumber: string}>(null);
  const [loader, setLoader] = useState(false);

  const updateForm = (name, val) => {
    let newForm = {...form};
    newForm[name] = val;
    setForm(newForm)
  }

  const verify = () => {
    setLoader(true)
    User.verifyPhone({phoneNumber: form.phoneNumber}).then((res) => {
      if (!res.success) {
        Error(res.message)
      } else {
        props.setForm(form)
        props.nextContent(BonusEnum.confirm)
      }
      setLoader(false)
    })
  }

  return (
    <div className="P-bonus-modal-actions">
      <div className="P-action-title">
        {t('bonus_card_activation')}
      </div>
      <div className="P-action-description">
        {t('bonus_bottom_sheet_description')}
      </div>
      <div className='G-width-80'>
        <div className='G-mb-15'>
          <DatePicker placeholder={messages[LanguageStorage.getLanguage()]['personal_info_date_of_birth']} maxDate={new Date()} minDate={new Date('1960')} onChange={(date) => {updateForm('dateOfBirthday', date)}}/>
        </div>
        <div className='G-mb-25'>
          <Input classes='P-pi-20'
                 name='phoneNumber'
                 placeholder={messages[LanguageStorage.getLanguage()]['phone_number']}
                 validate={ValidateEnum.phoneNumber}
                 onBlur={(name, value) => {updateForm(name, value)}}/>
        </div>
      </div>
      <div className='G-width-50'>
        <ButtonBase loading={loader} classes='P-pi-20 P-btn-bg-ping P-btn-primary' onClick={verify}>
          {t('send_code')}
        </ButtonBase>
      </div>
    </div>
  )
}