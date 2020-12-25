import React, {useContext, useEffect, useState} from 'react';
import './styles.scss'
import {HeaderNavBar} from "../../components/headerNavBar";
import ProjectLogo from '../../assets/svg/logo.svg';
import {ButtonBase, SelectLanguage} from "../../components/formElements";
import {Basket} from "../../components/basket";
import StateContext from "../../contexsts/stateContext";
import AuthStorage from "../../platform/services/storages/authStorage";
import {RoleEnum} from '../../platform/enums/role';
import {Link} from "react-router-dom";
import Paths from "../../routes/paths";
import {DropDown} from "../../components/dropDown";
import profileSvg from "../../assets/svg/profile.svg";
import exitSvg from "../../assets/svg/exit.svg";
import authApi from "../../platform/api/authApi";
import notificationApi from "../../platform/api/notifications/notification";
import defaultImg from "../../assets/img/default.png";
import avatar from "../../assets/img/avatar.png";
import {SearchModal} from "../../components/modals/search";
import {
  ClickOutside,
  MomentDateMilliSec,
  MomentDateTimeMilliSec,
  MomentTimeMilliSec
} from "../../platform/services/helpers";
import {LogoutModal} from "../../components/modals/logout";
import {havePermission} from "../../platform/services/permissions/permissions";
import {PermissionsEnum} from "../../platform/enums/premissionsEnum";
import {INotificationModel} from "../../platform/api/notifications/res/notification-model";
import {EmptyView} from "../../components/emptyView";
import EmptyIc from "../../assets/svg/emptyViews/ic_emptynotific.svg";
import EmptyBub from "../../assets/svg/emptyViews/ic_emptynotificcircles.svg";
import sunImg from "../../assets/img/candyImg.png";
import InfiniteScroll from 'react-infinite-scroll-component';
import {NotificationActionEnum} from "../../platform/enums/notificationAction";
import {CircularProgress} from "@material-ui/core";
import t from '../../i18n/translate';
import {RightMenu} from "../../components/modals/rightMenu";
import messages from "../../i18n/messages";
import LanguageStorage from "../../platform/services/storages/languageStorage";
import giftSvg from "../../assets/svg/gift-box.svg";
import placeSvg from "../../assets/svg/place.svg";
import creditSvg from "../../assets/svg/credit-card.svg";

interface IHeader {
  logIn: Function,
  history: any
}

function Header(props: IHeader) {

  const [basketIsOpen, setBasketIsOpen] = useState(false);
  const [rightMenuIsOpen, setRightMenuIsOPen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [signOutLoader, setSignOutLoader] = useState(false);
  const [totalNotification, setTotalNotification] = useState(null);
  const [notifications, setNotifications] = useState<INotificationModel[]>([]);
  const [logout, setLogout] = useState(false);
  const [notSeenNotifications, setNotSeenNotifications] = useState<number>(0);
  const [dropDown, setDropDown] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const {basketState, userState} = useContext(StateContext);

  const notificationActions = {
    [NotificationActionEnum.branch]: Paths.SHOPS,
    [NotificationActionEnum.product]: `${Paths.PRODUCTS}?products=`,
    [NotificationActionEnum.news]: '#',
    [NotificationActionEnum.category]: `${Paths.PRODUCTS}?category=`,
    [NotificationActionEnum.nothing]: '#',
  }

  const getNotifications = () => {
    const page = notifications.length > 0 ? notifications.length / 3 : 0;
    setLoading(true)
    notificationApi.notifications(page | 0, 3).then((res) => {
      setNotifications([...notifications, ...res.data.content]);
      setTotalNotification(res.data.totalElements)
      setLoading(false)
    })
  }

  const getNotSeenNotifications = () => {
    notificationApi.notSeen().then((res) => {
      setNotSeenNotifications(res.data)
    });
  }

  useEffect(() => {
    getNotSeenNotifications();

    if (!notification) {
      notificationApi.notifications(0, 5).then((res) => {
        setNotifications([...res.data.content]);
        setTotalNotification(res.data.totalElements);
        setLoading(false)
      })
    }
  }, [notification]);

  const logOut = () => {
    setSignOutLoader(true);
    authApi.logout().then((res) => {
      AuthStorage.remove('apiToken');
      AuthStorage.remove('DeviceId');
      AuthStorage.remove('products');
      AuthStorage.remove('user');
      window.location.reload()
    })
  }

  return (
    <div>
      <SearchModal history={props.history} show={searchModal} close={() => {
        setSearchModal(false)
      }} submit={() => {
      }} onChange={() => {
      }}/>
      <LogoutModal loading={signOutLoader} show={logout} close={() => {
        setLogout(false)
      }} submit={() => {
        logOut()
      }}/>
      <div className='P-header G-flex-column'>
        <Basket isActive={basketIsOpen} close={() => {
          setBasketIsOpen(false)
        }}/>
        <RightMenu logIn={() => {props.logIn()}} logOut={() => {setLogout(true)}} close={() => {setRightMenuIsOPen(false)}} isActive={rightMenuIsOpen}/>
        <div className='P-topHeader'>
          <div className='G-container G-flex-align-center G-flex'>
            <div className='G-width-20'>
              <SelectLanguage data={[{}, {}]} onChange={() => {
              }}/>
            </div>
            <div className='P-headerRightContent G-flex-vertical-center G-move-right'>
              {/*<span>Payments</span>*/}
              <Link to={`${Paths.INFO_PAGES}/terms`}>
                <span>{t('terms_and_conditions')}</span>
              </Link>
              <Link to={`${Paths.INFO_PAGES}/privacy`}>
                <span>{t('privacy_policy')}</span>
              </Link>
              <Link to={`${Paths.INFO_PAGES}/delivery`}>
                <span>{t('delivery_and_returns')}</span>
              </Link>
            </div>
          </div>
        </div>
        <div className='G-container G-position-relative G-flex'>
          <div className='G-flex P-bottomHeader G-flex-vertical-center'>
            <Link to={Paths.HOME}>
              <img src={ProjectLogo} alt="Logo" className='m'/>
            </Link>
            <HeaderNavBar/>
          </div>
          <div className='headerRightSide G-flex G-move-right G-flex-vertical-center'>
            <div className='P-header-icon' onClick={() => {
              setSearchModal(true)
            }}><i className='icon-search-16'></i></div>
            {havePermission(PermissionsEnum.favorite) &&
            <ClickOutside onClickOutside={() => setNotification(false)}>
            <>
              <div className='P-header-icon G-position-relative' onClick={() => {
                setNotification(true)
              }}>
                <i className='icon-Group-2388 G-fs-27'></i>
                {notSeenNotifications !== 0 && <span className='G-position-absolute alert-count'>{notSeenNotifications}</span>}
              </div>
              <DropDown show={notification}>

                  <div className='P-not-box'>
                    {notifications.length > 0 ?
                      <InfiniteScroll
                        dataLength={notifications.length}
                        next={getNotifications}
                        hasMore={notifications.length <= totalNotification}
                        height={325}
                        loader={<h5>Loading...</h5>}>
                        {
                          notifications.map((notification, index) => {
                            return (
                              <div onClick={() => {setNotification(false)}} key={index} className='P-not-card' style={
                                {
                                  backgroundImage: !notification.seen && `url(${sunImg})`,
                                  backgroundColor: notification.seen && `white`
                                }}>
                                <Link to={`${notificationActions[notification.action]}${notification.pageId && notification.pageId }`}>
                                  <div className='P-card-desc'>
                                    <div>
                                      <div className='G-fsb-18 G-mb-7'>{notification.title}</div>
                                      <div className='G-fsb-15 G-mt-19'>{notification.message}</div>
                                    </div>
                                    <div className="P-notification-date G-move-right">
                                      <MomentDateTimeMilliSec milliSec={notification.sendDate}/>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            )
                          })
                        }
                      </InfiniteScroll>
                      : (
                        <div className='G-p-50 G-flex-horizontal-center'>
                          {loading ? (
                            <CircularProgress color='secondary' size={40}/>
                          ) : (
                            <EmptyView height={150} bubble={EmptyBub} title={messages[LanguageStorage.getLanguage()]['empty_notifications_title']} desc={messages[LanguageStorage.getLanguage()]['empty_notifications_description']} icon={EmptyIc}/>
                          )}
                        </div>
                      )
                    }
                  </div>
              </DropDown>
            </>
            </ClickOutside>
            }
            {havePermission(PermissionsEnum.favorite) &&
              <Link to={Paths.FAVORITE} className='P-header-icon'><i className='icon-like-3'></i></Link>
            }
            <div className='P-header-icon G-position-relative' onClick={() => {
              setBasketIsOpen(!basketIsOpen)
            }}>
              <i className='icon-shopping-cart-4'></i>
              {basketState.basket.length > 0 &&
              <span className='G-position-absolute alert-count'>{basketState.basket.length}</span>}
            </div>
            <div>
              {AuthStorage.getRole() === RoleEnum.Guest ?
                <ButtonBase loading={false} classes='P-btn-bg-ping P-btn-primary G-d-mob-none' onClick={() => {
                  props.logIn()
                }}>
                  {t('sign_in')}
                </ButtonBase>
                : <div className='G-flex G-flex-align-center G-cursor-pointer' onClick={() => {
                    setDropDown(!dropDown)
                  }}>
                    <div className='P-avatar G-d-mob-none'
                         style={{backgroundImage: `url(${userState.user.imageUrl || avatar})`}}>
                      <ClickOutside onClickOutside={() => {
                        setDropDown(false)
                      }}>
                        <DropDown show={dropDown}>
                          <>
                            <Link className='P-drop-link' to={`${Paths.PROFILE}/info`}>
                              <div className='G-flex-vertical-center'>
                                <img src={profileSvg} alt="svg"/>
                                <span className='G-ml-2'>{t('profile')}</span>
                              </div>
                            </Link>
                            <Link className='P-drop-link' to={`${Paths.PROFILE}/bonus`}>
                              <div className='G-flex-vertical-center'>
                                <img src={giftSvg} alt="svg"/>
                                <span className='G-ml-2'>{t('more_bonus_card')}</span>
                              </div>
                            </Link>
                            <Link className='P-drop-link' to={`${Paths.PROFILE}/orders`}>
                              <div className='G-flex-vertical-center'>
                                <i className='icon-Group-2380'></i>
                                <span className='G-ml-2'>{t('order')}</span>
                              </div>
                            </Link>
                            <Link className='P-drop-link' to={`${Paths.PROFILE}/address`}>
                              <div className='G-flex-vertical-center'>
                                <img src={placeSvg} alt="svg"/>
                                <span className='G-ml-2'>{t('more_my_addresses')}</span>
                              </div>
                            </Link>
                            <Link className='P-drop-link' to={`${Paths.PROFILE}/payment`}>
                              <div className='G-flex-vertical-center'>
                                <img src={creditSvg} alt="svg"/>
                                <span className='G-ml-2'>{t('more_payment_methods')}</span>
                              </div>
                            </Link>
                            <div className='P-drop-link G-flex-vertical-center' onClick={() => setLogout(true)}>
                              <img src={exitSvg} alt="svg"/>
                              <span className='G-ml-2'>{t('sign_out')}</span>
                            </div>
                          </>
                        </DropDown>
                      </ClickOutside>
                    </div>
                    <i className="icon-ic_arrowdown G-arrow-down-sm G-ml-1"></i>
                </div>
              }
            </div>
            <div onClick={() => {setRightMenuIsOPen(true)}}>
              <a className="burger-icon G-d-desc-none">&#9776;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
