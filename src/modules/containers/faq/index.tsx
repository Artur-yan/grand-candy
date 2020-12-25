import React, {useEffect, useState} from "react";
import './styles.scss'
import {FrequentlyQuestions} from "./contents/frequentlyQuestions";
import {Link} from "react-router-dom";
import Paths from "../../../routes/paths";
import {SearchInput} from "../../../components/formElements";
import {OnlinePurchasing} from "./contents/onlinePurchasing";
import {BonusCard} from "./contents/bonusCard";
import {PromoCode} from "./contents/promeCode";
import {ApplyPromoCode} from "./contents/pickUp";
import {DesiredProducts} from "./contents/desiredProduct";
import {EmptyView} from "../../../components/emptyView";
import IcBub from "../../../assets/svg/emptyViews/ic_faq.svg";
import EmptyIc from "../../../assets/svg/emptyViews/ic_faqcircles.svg";
import t from "../../../i18n/translate";
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";
import {PurchasingBasket} from "./contents/purchasingBasket";
import {DateAndTimeOfDelivery} from "./contents/dateAndTimeOfDelivery";
import {DirectionsAreAvailable} from "./contents/directionsAreAvailable";
import {AvailablePaymentMethod} from "./contents/availablePaymentMethod";
import {CancelOrder} from "./contents/cancelOrder";
import {ReturnOrderProducts} from "./contents/returnOrderProducts";
import {ReceiveMoneyBack} from "./contents/receiveMoneyBack";
import {MainDescription} from "./components/mainDescription";

export function FAQ({match}) {

  const initContents = [
    {
      name: 'frequently-questions',
      component: <FrequentlyQuestions/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-1-title'],
    },
    {
      name: 'online-purchasing',
      component: <OnlinePurchasing/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-2-title'],
    },

    {
      name: 'my-address',
      component: <MainDescription title={t('FAQ.questions-14-title')} text={t('FAQ.questions-14-text')}/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-14-title'],
    },
    {
      name: 'delivery-order',
      component: <MainDescription title={t('FAQ.questions-15-title')} text={t('FAQ.questions-15-text')}/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-15-title'],
    },
    {
      name: 'bonus-card',
      component: <BonusCard/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-3-title'],
    },
    {
      name: 'promo-code',
      component: <PromoCode/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-4-title'],
    },
    {
      name: 'pick-up',
      component: <ApplyPromoCode/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-5-title'],
    },
    {
      name: 'desired-products',
      component: <DesiredProducts/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-6-title'],
    },
    {
      name: 'purchasing-basket',
      component: <PurchasingBasket/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-7-title'],
    },
    {
      name: 'date-and-time-of-delivery',
      component: <DateAndTimeOfDelivery/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-8-title'],
    },
    {
      name: 'directions-are-available',
      component: <DirectionsAreAvailable/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-9-title'],
    },
    {
      name: 'available-payment-method',
      component: <AvailablePaymentMethod/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-10-title'],
    },
    {
      name: 'cancel-order',
      component: <CancelOrder/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-11-title'],
    },
    {
      name: 'return-ordered-products',
      component: <ReturnOrderProducts/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-12-title'],
    },
    {
      name: 'receive-money-back',
      component: <ReceiveMoneyBack/>,
      label: messages[LanguageStorage.getLanguage()]['FAQ.questions-13-title'],
    },
  ];

  const [contents, setContents] = useState(initContents);
  const [searchResult, setSearchResult] = useState(true);

  const onSearch = (val: string) => {
    let newContents = initContents.filter((content, index) => content.label.search(val) !== -1);

    newContents.length === 0 ? setSearchResult(false) : setSearchResult(true)

    setContents(newContents);
  }

  const [activeContent, setActiveContent] = useState(contents[0]);

  useEffect(() => {
    contents.map((content, index) => {
      content.name === match.params.content && setActiveContent(content);
    })
  }, [match.url])

  return (
    <div className='P-faq'>
      <div className='P-faq-cover'>
        <div className="P-description">
          {t('faq_title')}
        </div>
      </div>
      <div className='P-faq-info G-mb-100'>
        <div className='G-flex-column P-left-menu'>
          <div className='P-faq-search'>
            <SearchInput placeholder={messages[LanguageStorage.getLanguage()]['faq_search_hint']} onChange={(value) => {onSearch(value)}}/>
          </div>
          <div className='P-left-menu-items'>
            {
            contents.map((content, index) => {
              return (
                <Link key={index} to={`${Paths.FAQ}/${content.name}`}>
                  <div className="P-menu-item">
                    <span>{content.label}</span>
                    {content.name !== activeContent.name ? (
                      <i className="P-menu-arrow icon-ic_arrowdown"></i>
                    ) : (
                      <i className="P-menu-arrow icon-ic_arrowright"></i>
                    )}
                  </div>
                </Link>
              )
            })
            }
          </div>
        </div>
        <div className='P-info-content '>
          {searchResult ? activeContent.component : (
            <div className='G-flex-align-center G-height-100'>
            <EmptyView title={messages[LanguageStorage.getLanguage()]['empty_faq_title']} desc={messages[LanguageStorage.getLanguage()]['empty_faq_description']} bubble={EmptyIc}  icon={IcBub}/>
          </div>
          )}

        </div>
      </div>
    </div>
  )
}
