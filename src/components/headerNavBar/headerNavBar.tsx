import React from 'react';
import './styles.scss'
import {NavItem} from "../navBar";
import {navItems} from "../../platform/statics/headerNav";

export function HeaderNavBar() {

  return (
    <div className='navbar-content G-ml-2'>
      <div className="P-navbar">
        {
          navItems.map((val, index) =>
            <NavItem onClick={() => {}} name={val.name} path={val.path}  isDropping={val.isDropping} exact={val.exact} classes={val.classes} key={index} />
          )
        }
      </div>
    </div>
  );
}
