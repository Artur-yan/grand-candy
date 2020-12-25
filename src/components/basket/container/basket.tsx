import React, { useContext, useEffect, useState } from 'react';
import StateContext from "../../../contexsts/stateContext";
import './style.scss';
import { Link } from "react-router-dom";
import { ButtonBase } from "../../formElements";
import defaultImg from "../../../assets/img/default.png";
import {ClickOutside, SelfToLocalString, toFixedNumber} from "../../../platform/services/helpers";
import {Measurement} from "../../../platform/statics/measurement";
import {MeasurementEnum} from "../../../platform/enums/measurement";
import SearchIcBub from "../../../assets/svg/emptyViews/ic_basketbubbles.svg";
import ShopIc from "../../../assets/svg/emptyViews/ic_basket.svg";
import {EmptyView} from "../../emptyView";
import t from '../../../i18n/translate';
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";
import {WarningModal} from "../../modals/warning";

interface BProps {
  isActive?: boolean;
  close: (event?: MouseEvent) => void;
}

export function Basket(props: BProps) {

  let counter = 0;
  const { basketState } = useContext(StateContext);
  const [sum, setSum] = useState(0);
  const [warningModal, setWarningModal] = useState(false);

  const changeSum = (index, increase) => {
    let basket = [...basketState.basket];
    const isFloat = basket[index].item.measurementEnumValue === MeasurementEnum.kg;
    const basketCount = isFloat ? toFixedNumber(basket[index].count) : basket[index].count;
    const increasingNumber = isFloat ? 0.1 : 1;

    if (increase) {
      basket[index].count = toFixedNumber(increasingNumber + basketCount)
    } else {
      if (basket[index].count > increasingNumber) {
        basket[index].count = toFixedNumber(basketCount - increasingNumber)
      } else {
        basket.splice(index, 1);
      };
    }

    basketState.setBasket(basket);
  };

  const clearBasket = () => {
    basketState.setBasket([]);
    setSum(0)
    setWarningModal(false)
  }

  useEffect(() => {
    basketState.basket.map((val, index) => {
      counter += val.item.price * val.count;
      setSum(counter);
    })
    if (basketState.basket.length === 0) {
      setSum(0)
    }
  }, [basketState.basket]);

  return (
    <ClickOutside onClickOutside={() => props.close()}>
      <WarningModal
        show={warningModal}
        actionText={'Clear'}
        title={'Clear basket'}
        description={'Are you sure you want to clear your basket?'}
        close={() => setWarningModal(false)}
        submit={() => clearBasket()}/>
      <div className='P-basket-content'>
      <div className={`${props.isActive ? 'P-is-open' : ''} P-basket G-flex-column`}>
        <span className="P-closebtn" onClick={() => props.close()}><i className='icon-ic_close'/></span>

        <div className='G-flex-column P-basket-item'>
          {basketState.basket.length > 0 &&
            <div className='G-flex-space-between P-basket-head'>
                <div className='G-font-lg-b-1'>{t('basket_title')}</div>
                <div className='G-delete-md-icon' onClick={() => setWarningModal(true)}><i className='icon-delete_bin'></i></div>
            </div>
          }
          { basketState.basket && basketState.basket.map((val, index) => {
            return (
              <div key={index} className='G-flex-space-between P-item'>
                <div className='G-flex'>
                  <div className='P-img' style={{backgroundImage:`url(${val.item.imageUrl || defaultImg})`}}>
                  </div>
                  <div className='P-item-info'>
                    <span className='P-title'>{val.item.productName}</span>
                    <span className='G-text-sm-gray-2'>{SelfToLocalString(val.item.price)}֏/{Measurement[val.item.measurementEnumValue]}</span>
                  </div>
                </div>
                <div className='G-flex'>
                  <div className='P-item-counter'>
                    <div className='P-counter-btn' onClick={() => {changeSum(index, false)}}>
                      <span>-</span>
                    </div>
                    <div className='P-count'>
                      <span>{val.count}</span>
                    </div>
                    <div className='P-counter-btn' onClick={() => {changeSum(index, true)}}>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
            )})}
          {
            basketState.basket.length == 0 && (
              <div className='G-flex-align-center G-height-100'>
                <EmptyView title={messages[LanguageStorage.getLanguage()]['empty_basket_title']} desc={messages[LanguageStorage.getLanguage()]['empty_basket_description']} bubble={SearchIcBub} icon={ShopIc}/>
              </div>
            )
          }
          {basketState.basket.length > 0 &&
          <div className='P-basket-bottom'>
              <div className='G-font-lg-b-1 P-total'>{t('basket_total')} {SelfToLocalString(sum)}֏</div>
              <div className='G-flex-vertical-center G-flex-space-between'>
                  <div className='G-text-sm-gray-2 G-cursor-pointer' onClick={() => props.close()}>{t('continue_shopping')}</div>
                  <div>
                      <Link to='/checkout'>
                          <ButtonBase loading={false} classes='P-btn-bg-ping P-btn-primary' onClick={() => props.close()}>
                            {t('basket_go_to_checkout')}
                          </ButtonBase>
                      </Link>
                  </div>
              </div>
          </div>
          }
        </div>
      </div>
    </div>
    </ClickOutside>
  );
}
