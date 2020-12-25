import React, {useEffect, useState} from 'react';
import '../style.scss';
import './style.scss';
import {AutocompleteInput, ButtonBase, Input, ButtonLink} from "../../formElements";
import {Check} from "../../formElements/checkBox";
import {IAddressModel} from "../../../platform/api/address/res/address-model";
import Address from "../../../platform/api/address/address";
import {Error} from "../../alerts/toast";
import {ValidateEnum} from "../../../platform/enums/validate";
import {AddressValidation} from "../../../platform/statics/validations/addressValidation";
import t from '../../../i18n/translate';
import messages from "../../../i18n/messages/index";
import LanguageStorage from "../../../platform/services/storages/languageStorage";
import {PaymentCard} from "../../../modules/containers/profile/contents/payment/components/PaymentCard";
import {ICardModel} from "../../../platform/api/card/res/card-model";

interface IModal {
  show: boolean,
  close:  () => void,
}

export function AddCard(props: IModal) {

  useEffect(() => {
    setApproveSubmit(true)
    setActiveCard({...activeCard, isDefault: false})
  }, [props.show])

  const [activeCard, setActiveCard] = useState(null);
  const [errors, setErrors] = useState(null);
  const [approveSubmit, setApproveSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState([...AddressValidation]);

  const changeListener = (name, value) => {
    setActiveCard({...activeCard, [name]: value})
  }

  const getCards = () => {

      let newErrors = {...errors}
      validation.map((val, index) => {
        if (activeCard) {
          if (!activeCard[val.name]) {
            newErrors[val.name] = val.message
            setErrors(newErrors)
            setApproveSubmit(false)
          } else {
            delete newErrors[val.name]
            setErrors(newErrors);
          }
        }
      })

      if (Object.keys(newErrors).length < 1) {
        setApproveSubmit(true);
        addAddress()
      }
  }

  const close = () => {
    setActiveCard(null)
    setErrors(null)
    props.close()
  };

  const addAddress = () => {

    if (approveSubmit) {
      setLoading(true)
      Address.addAddress(activeCard).then((res) => {
        setLoading(false)
        res.success ? close() : Error(res.message)
      })
    }
  };

  useEffect(() => {
    setActiveCard({...activeCard, isDefault: false})
  }, [])

  return (
    <div className='P-modal'>
      <div onClick={close} className='P-modal-cover'  style={props.show ? {display: "block"} : {display: "none"}}></div>
      <div className="P-card-wrapper-md P-modal-wrapper"
         style={{
           transform: props.show ? 'translateY(-50%)' : 'translateY(-110vh)',
           top: props.show ? '50%' : '-100%',
           opacity: props.show ? '1' : '0'
         }}>
        <div className='P-add-card-modal'>
          <h4 className='G-mb-35'>{t('add_new_card')}</h4>
          {/*<PaymentCard name='CARD HOLDER' date='MM/YY' gradient='linear-gradient(324deg, #6A6A6A 0%, #CFCFCF 100%)'/>*/}
          <div className="G-mb-25 G-mt-32 G-width-100">
            <Input value={activeCard && activeCard.card_holder} classes='P-pi-15' onBlur={(name, value) => {
              setActiveCard({...activeCard, [name]: value})
            }} placeholder={messages[LanguageStorage.getLanguage()]['card_holder']} name='card_holder'/>
          </div>
          <div className="G-mb-25 G-width-100">
            <Input value={activeCard && activeCard.card_number} classes='P-pi-15' onBlur={(name, value) => {
              setActiveCard({...activeCard, [name]: value})
            }} placeholder={messages[LanguageStorage.getLanguage()]['card_number']} name='card_number'/>
          </div>
          <div className='G-flex-space-between G-mb-25'>
            <div className='G-width-45'>
              <Input value={activeCard && activeCard.exp_date} classes='P-pi-15'  onBlur={(name, value) => {
                changeListener(name, value)
              }} placeholder={messages[LanguageStorage.getLanguage()]['exp_date']} name='exp_date'/>
            </div>
            <div className='G-width-45 G-position-relative'>
              <Input value={activeCard && activeCard.apartment} classes='P-pi-15'  onBlur={(name, value) => {
                changeListener(name, value)
              }} placeholder='CVV' name='apartment'/>
            </div>
          </div>
          <div className="G-mb-25 G-move-left G-flex-start">
            <Check isChecked={!activeCard ? false : activeCard.isDefault} name='isDefault' onChange={(value, name) => {
              changeListener(name, value)
            }}/><span className='G-text-gray-sm'>{t('make_this_payment_method_default')}</span>
          </div>
          <div className='G-mb-25 G-flex-space-around G-width-90'>
            <ButtonLink classes='P-btn-link' onClick={close}>{t('cancel')}</ButtonLink>
            <ButtonBase loading={loading} classes='P-btn-bg-ping P-btn-primary' onClick={() => {getCards()}}>
              {t('add')}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  )
}
