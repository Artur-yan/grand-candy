import React, {useContext, useEffect, useState} from 'react';
import './style.scss';
import {ClickOutside} from "../../../platform/services/helpers";
import t from '../../../i18n/translate';
import {navItems} from "../../../platform/statics/headerNav";
import {NavItem} from "../../navBar";
import {Link} from "react-router-dom";
import avatar from "../../../assets/img/avatar.png";
import {DropDown} from "../../dropDown";
import Paths from "../../../routes/paths";
import profileSvg from "../../../assets/svg/profile.svg";
import StateContext from "../../../contexsts/stateContext";
import {ButtonBase} from "../../formElements";

interface BProps {
  isActive?: boolean;
  close: (event?: MouseEvent) => void;
  logOut?: () => void;
  logIn?: () => void;
  children?: JSX.Element
}

export function RightMenu(props: BProps) {
  const [dropDown, setDropDown] = useState(false);
  const {userState} = useContext(StateContext);

  useEffect(() => {
    if (props.isActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }

  }, [props.isActive])

  return (
    <ClickOutside onClickOutside={() => props.close()}>
      <div className='P-menu-content'>
      <div className={`${props.isActive ? 'P-is-open' : ''} P-menu G-flex-column `}>
        <span className="P-closebtn" onClick={() => props.close()}><i className='icon-ic_close'/></span>
        {!props.children ?
          <>
            {userState.user ?
              <div className='P-menu-user'>
                <div className='G-move-right P-menu-user-info'>
                  <div className='G-flex'>
                    <p>{userState.user.firsName}</p>
                    <p>{userState.user.lastName}</p>
                  </div>
                  <div className='P-avatar' onClick={() => {
                    setDropDown(!dropDown)
                  }} style={{backgroundImage: `url(${userState.user.imageUrl || avatar})`}}>
                    <ClickOutside onClickOutside={() => setDropDown(false)}>
                      <DropDown show={dropDown}>
                        <>
                          <Link className='P-drop-link' to={`${Paths.PROFILE}/info`}>
                            <div className='G-flex-vertical-center'>
                              <img src={profileSvg} alt="svg"/>
                              <span className='G-ml-2'>{t('profile')}</span>
                            </div>
                          </Link>
                          <div className='P-drop-link G-flex-vertical-center' onClick={() => props.logOut()}>
                            <i className='icon-ic_export'/><span className='G-ml-2'>{t('sign_out')}</span>
                          </div>
                        </>
                      </DropDown>
                    </ClickOutside>
                  </div>
                </div>
              </div> :
              <div className='G-flex-horizontal-center G-width-100'>
                <div className='G-width-80'>
                  <ButtonBase loading={false} classes='P-btn-bg-ping P-btn-primary ' onClick={() => {
                    props.logIn()
                  }}>
                    {t('sign_in')}
                  </ButtonBase>
                </div>
              </div>
            }
              <div className='G-flex-column P-menu-items'>
                {
                  navItems.map((val, index) =>
                    <Link onClick={() => {props.close()}} className='P-menu-item'  to={val.path} key={index} >{val.name}</Link>
                  )
                }
              </div>
          </> : <>{props.children}</>
        }

      </div>
    </div>
    </ClickOutside>
  );
}
