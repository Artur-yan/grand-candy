import React, {useContext, useEffect, useState} from "react";
import './style.scss';
import profileSvg from "../../../assets/svg/profile.svg";
import giftSvg from "../../../assets/svg/gift-box.svg";
import placeSvg from "../../../assets/svg/place.svg";
import creditSvg from "../../../assets/svg/credit-card.svg";
import User from "../../../platform/api/user/user";
import StateContext from "../../../contexsts/stateContext";
import {Info} from "./contents/info";
import {Bonus} from "./contents/bonus";
import {Orders} from "./contents/orders";
import Paths from "../../../routes/paths";
import {Addresses} from "./contents/addresses";
import {Details} from "./contents/orders/details";
import avatar from "../../../assets/img/avatar.png";
import {CircularProgress} from "@material-ui/core";
import t from "../../../i18n/translate";
import {Payment} from "./contents/payment";
import {Success, Error} from "../../../components/alerts/toast";
import messages from "../../../i18n/messages";
import LanguageStorage from "../../../platform/services/storages/languageStorage";
import {RightMenu} from "../../../components/modals/rightMenu";

export function Profile ({match, history}) {

  const { userState } = useContext(StateContext);
  const [file, setFile] = useState(null);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [rightMenuIsOpen, setRightMenuIsOPen] = useState(false);

  const contents = [
    {
      name: 'info',
      component:<Info/>,
      icon: profileSvg,
      label: t('more_personal_information'),
      isCategory:true
    },
    {
      name: 'bonus',
      component:<Bonus history={history}/>,
      icon: giftSvg,
      label: t('more_bonus_card'),
      isCategory:true
    },
    {
      name: 'orders',
      component:<Orders history={history}/>,
      icon: <i className='icon-Group-2380'></i>,
      label: t('order'),
      isCategory:true
    },
    {
      name: 'order',
      component:<Details match={match}/>,
      isCategory:false
    },
    {
      name: 'address',
      component:<Addresses history={history}/>,
      icon: placeSvg,
      label: t('more_my_addresses'),
      isCategory:true
    },
    {
      name: 'payment',
      component:<Payment history={history}/>,
      icon: creditSvg,
      label: t('more_payment_methods'),
      isCategory:true
    }
  ];

  const [activeContent, setActiveContent] = useState(contents[0]);

  useEffect(() => {
    let pathArray = window.location.pathname.split('/');

    if (pathArray[1] && pathArray[1] === 'success' || pathArray[1] === 'fail') {
      if (pathArray[1] === 'success') {
        Success(messages[LanguageStorage.getLanguage()]['payment_added_successfully'])
      }
      if (pathArray[1] === 'fail') {
        Error(messages[LanguageStorage.getLanguage()]['payment_added_error'])
      }
      history.push('/profile/payment')
    }
  }, []);

  useEffect(() => {

    const index = contents.findIndex(x => x.name === match.params.content);

    if (index !== -1) {
      setActiveContent(contents[index]);
    } else {
      setActiveContent(contents[0])
    }
  }, [match.url])

  useEffect(() => {
    if (file) {
      setUploadLoader(true)
      const data = new FormData();
      data.append('file', file);
      User.uploadImage(data).then((res) => {
        userState.setUser({...userState.user, imageUrl: res.data})
        setUploadLoader(false)
      });
    }
  }, [file])

  return (
    <div className='P-profile G-mb-100'>
      <div className='G-flex-space-between G-flex-vertical-center'>
        <h2>{t('more_account')}</h2>
        <div onClick={() => {setRightMenuIsOPen(!rightMenuIsOpen)}}>
          <a className="burger-icon G-d-desc-none">&#9776;</a>
        </div>
      </div>
      <RightMenu close={() => {setRightMenuIsOPen(false)}} isActive={rightMenuIsOpen}>
        <div className='P-content-mob'>
          <div className="P-profile-card">
            <div className="P-card-header">
              <label className='P-avatar G-position-relative' style={{backgroundImage: `url(${userState.user.imageUrl && userState.user.imageUrl+'/150/150' || avatar})`}}>
                {uploadLoader &&
                <div className='G-position-absolute G-width-100 G-flex-vertical-center G-flex-horizontal-center'>
                    <CircularProgress color='secondary' size={35}/>
                </div>
                }
                <i className="icon-ic_plus P-upload-icon"></i>
                <input  type="file" accept=".png, .jpg, .jpeg" name='file' onChange={(e) => {setFile(e.target.files[0])}}/>
              </label>
              <div className='P-user-info'>
                <div className="P-user-name">
                  {userState.user.firsName}
                </div>
                <div className='G-text-sm-gray-2'>
                  {userState.user.email}
                </div>
              </div>
            </div>
            <div className='P-profile-navbar'>
              {contents.map((value, index) => {
                return (
                  value.isCategory &&
                  <div key={index} className={`P-category-section ${value.name === activeContent.name ? 'P-active-category' : ''}`}>
                      <div className='G-text-md-bold P-category G-flex' onClick={() => {history.push(`${Paths.PROFILE}/${value.name}`); setRightMenuIsOPen(false) }}>
                        {typeof value.icon === 'string' ? <img src={value.icon} alt="svg"/> : value.icon}
                          <div className='G-ml-2'>{value.label}</div>
                      </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </RightMenu>
      <div className="P-content">
        <div className="P-profile-card G-d-mob-none">
          <div className="P-card-header">
            <label className='P-avatar G-position-relative' style={{backgroundImage: `url(${userState.user.imageUrl && userState.user.imageUrl+'/150/150' || avatar})`}}>
              {uploadLoader &&
                <div className='G-position-absolute G-width-100 G-flex-vertical-center G-flex-horizontal-center'>
                    <CircularProgress color='secondary' size={35}/>
                </div>
              }
              <i className="icon-ic_plus P-upload-icon"></i>
              <input  type="file" accept=".png, .jpg, .jpeg" name='file' onChange={(e) => {setFile(e.target.files[0])}}/>
            </label>
            <div className='P-user-info'>
              <div className="P-user-name">
                {userState.user.firsName}
              </div>
              <div className='G-text-sm-gray-2'>
                {userState.user.email}
              </div>
            </div>
          </div>
          <div className='P-profile-navbar'>
            {contents.map((value, index) => {
              return (
                value.isCategory &&
                <div key={index} className={`P-category-section ${value.name === activeContent.name ? 'P-active-category' : ''}`}>
                  <div className='G-text-md-bold P-category G-flex' onClick={() => {history.push(`${Paths.PROFILE}/${value.name}`) }}>
                    {typeof value.icon === 'string' ? <img src={value.icon} alt="svg"/> : value.icon}
                    <div className='G-ml-2'>{value.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {activeContent.component}
      </div>
    </div>
  );
}
