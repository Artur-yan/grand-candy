import React from 'react';
import './styles.scss'
import mastercard from '../../assets/svg/mastercard.svg';
import visa from '../../assets/svg/visa.svg';
import logo from '../../assets/svg/logo_md.svg';
import FacebookLogo from '../../assets/svg/facebook.svg';
import InstagramLogo from '../../assets/svg/instagram.svg';
import groupLogo from '../../assets/img/group_lg.png';
import {Link} from "react-router-dom";
import Paths from "../../routes/paths";
import t from '../../i18n/translate';

function Footer () {
  return (
    <div className='P-footer'>
      <div className='G-container G-flex-column'>

        <div className='G-flex P-top-footer G-flex-space-between'>
          <div className='G-flex-column '>
            <img className='P-to-left' src={logo} alt="logo"/>
            <span className='G-text-sm-1 G-color-gray-2'>
              {t('the_sweetest')}
            </span>
          </div>
          <div className='G-flex G-links-content G-flex-space-between'>
            <div className='G-flex-column G-flex-space-between'>
              <div>
                <Link to={Paths.HOME} className='P-footer-links'>
                  {t('home')}
                </Link>
                <Link to={`${Paths.PRODUCTS}?products=all`} className='P-footer-links'>
                  {t('products')}
                </Link>
                <Link to={Paths.ABOUT} className='P-footer-links'>
                  {t('about_company_title')}
                </Link>
              </div>
            </div>
            <div className='G-flex-column G-flex-space-between'>
              <div>
                <Link to={Paths.SHOPS} className='P-footer-links'>
                  {t('more_our_shops')}
                </Link>
                {/*<Link to={Paths.NEWS} className='P-footer-links'>*/}
                {/*  News*/}
                {/*</Link>*/}
                {/*<Link to={Paths.CAREERS} className='P-footer-links'>*/}
                {/*  {t('careers')}*/}
                {/*</Link>*/}
                <Link to={Paths.CONTACT_US} className='P-footer-links'>
                  {t('contact_us')}
                </Link>
              </div>
            </div>
            <div className='G-flex-column G-flex-space-between'>
              <div>
                <Link to={`${Paths.FAQ}/frequently-questions`} className='P-footer-links'>
                  {t('more_faq')}
                </Link>
                <Link to={`${Paths.INFO_PAGES}/terms`} className='P-footer-links'>
                  {t('terms_and_conditions')}
                </Link>
                <Link to={`${Paths.INFO_PAGES}/privacy`} className='P-footer-links'>
                  {t('privacy_policy')}
                </Link>
                <Link to={`${Paths.INFO_PAGES}/delivery`} className='P-footer-links'>
                  {t('delivery_and_returns')}
                </Link>
              </div>
            </div>
          </div>
          <div className='G-flex-end'>
            <div className='G-flex-column'>
              <div>
                {t('about_app_social_hint')}
              </div>
              <div className='G-flex'>

              </div>
              <div className='G-flex G-mt-19'>
                <a target='_blank' rel="noopener noreferrer" href="https://www.facebook.com/GrandCandyOfficial"><img className='G-mr-2 ' src={FacebookLogo} alt="logo"/></a>
                <a target='_blank' rel="noopener noreferrer" href="https://www.instagram.com/grandcandy/?igshid=lqugy36tifsn"><img className='' src={InstagramLogo} alt="logo"/></a>
              </div>
            </div>
          </div>
        </div>
        <div className='G-flex-space-between P-bottom-footer'>
          <div className='G-flex P-footer-left'>
            <img src={visa} alt="visa"/>
            <img className='G-ml-2' src={mastercard} alt="master"/>
          </div>
          <a target='_blank' rel="noopener noreferrer" href="https://www.armboldmind.com" className='G-flex P-footer-center'>
              <span className='G-font-sm'>Powered By</span>
              <img className='' src={groupLogo} alt="group Logo"/>
          </a>
          <div className='G-gray-text-color P-footer-right'>© 2020 Grand Candy. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
