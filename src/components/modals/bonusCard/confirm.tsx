import {ButtonBase, DatePicker, Input} from "../../formElements";
import React, {useState} from "react";
import {BonusEnum} from "../../../platform/enums/bonus";
import {ValidateEnum} from "../../../platform/enums/validate";
import User from "../../../platform/api/user/user";
import {Error} from "../../alerts/toast";
import {MomentDate, MomentDateMilliSec} from "../../../platform/services/helpers";
import Transactions from "../../../platform/api/transactions/transactions";
import t from "../../../i18n/translate";
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";

interface IProps {
  nextContent: (BonusEnum) => void,
  addTransaction: (TransactionsModel) => void
  form: { dateOfBirthday: number, phoneNumber: string }
}

export function Confirm(props: IProps) {

  const [code, setCode] = useState<string>()
  const [loader, setLoader] = useState(false);


  const confirm = () => {

    if (!code) {
      Error('Verify code is required!')
      return;
    }
    setLoader(true)
    User.confirmCode({phoneNumber: props.form.phoneNumber, code: code, dateOfBirthday: props.form.dateOfBirthday})
      .then((res) => {
        if (!res.success) {
          Error(res.message)
        } else {
          Transactions.transactions(0, 20).then((res) => {
            if (!res.data.transactions) {
              Error(res.message)
            } else {
              props.addTransaction(res.data.transactions)
            }
          })
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
        {t('bonus_card_description')}
      </div>
      <div className='G-width-80'>
        <div className='G-mb-7'>

          <div className='G-width-100 P-disabled-input G-position-relative'>
            <MomentDateMilliSec milliSec={props.form.dateOfBirthday}/>
          </div>
        </div>
        <div className='G-mb-15'>
          <Input classes='P-pi-20'
                 name='phoneNumber'
                 disabled={true}
                 value={props.form.phoneNumber}
                 placeholder={messages[LanguageStorage.getLanguage()]['phone_number']}
                 validate={ValidateEnum.phoneNumber}
                 onBlur={() => {
                 }}/>
        </div>
        <div className='G-mb-25'>
          <Input classes='P-pi-20' name='code' placeholder={messages[LanguageStorage.getLanguage()]['code']} onBlur={(name, value) => {
            setCode(value)
          }}/>
        </div>
      </div>
      <div className='G-width-50'>
        <ButtonBase loading={loader} classes='P-pi-20 P-btn-bg-ping P-btn-primary' onClick={confirm}>
          {t('activate')}
        </ButtonBase>
      </div>
    </div>
  )
}