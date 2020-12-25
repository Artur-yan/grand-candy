import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import './style.scss'
import {TopMenu} from "../../products";
import {ClickOutside} from "../../../platform/services/helpers";

interface IProps {
  exact?: boolean;
  classes?: string;
  index?: string;
  name: JSX.Element;
  path: string;
  isDropping: boolean;
  onClick: () => void;
}

export function NavItem(props: IProps) {

  const [showProductMenu, setShowProductMenu] = useState(false);

  return (
    <ClickOutside onClickOutside={() => props.isDropping && setShowProductMenu(false)}>
      <div className='G-flex P-products-top' onClick={() => props.isDropping && setShowProductMenu(!showProductMenu)}>
        {props.isDropping ?
          (
            <>
              <div className={`P-navbar-product ${props.classes || ''}`}><span>{props.name}</span>
                <i className='icon-ic_arrowdown G-arrow-down-sm G-ml-1'/></div>
                <TopMenu show={showProductMenu}/>
            </>
          ) : (
            <NavLink className={` P-navbar-product ${props.classes || ''}`} to={props.path}>{props.name}{props.isDropping && <i className='icon-ic_arrowdown G-arrow-down-sm G-ml-1'/>}</NavLink>
          )
        }
      </div>
    </ClickOutside>
  );
}
