import React from 'react';
import {havePermission} from "../../platform/services/permissions/permissions";
import {PermissionsEnum} from "../../platform/enums/premissionsEnum";
import Button from "@material-ui/core/Button";
import { CircularProgress } from '@material-ui/core';

interface IButtonBase {
  disable?: boolean,
  classes?: string
  onClick: any,
  loading: boolean
  children: string | JSX.Element
}
export function ButtonBase(props: IButtonBase) {
    return (
        <button className={`P-btn ${props.classes}`} disabled={props.disable}  onClick={() => props.onClick()}>{props.loading ? <CircularProgress color='inherit' size={23}/> : <span>{props.children}</span>}</button>
    );
}

export function ButtonMui({children, classes = '', disable = false, onClick}) {
  return (
    <Button className={`P-btn ${classes}`} disabled={disable}  onClick={() => onClick()}><span>{children}</span></Button>
  );
}

interface ILinkProps {
  disable?: boolean,
  classes?: string
  onClick: any,
  children: string | JSX.Element
}
export function ButtonLink(props: ILinkProps) {
  return (
    <button className={`P-btn ${props.classes}`} disabled={props.disable}  onClick={props.onClick}><span>{props.children}</span></button>
  );
}

interface IBackProps {
  text?: string | JSX.Element,
  classes?: string
  onClick: any,
  children?: string
}

export function GoBack(props: IBackProps) {
  return (
    <div className='P-btn-back G-flex-vertical-center G-cursor-pointer' onClick={props.onClick}>
      <i className='icon-ic_back'></i>
      <span className='P-btn-text'>{props.text}</span>
    </div>
  );
}

interface IFavoriteProps {
  children?: JSX.Element
  classes?: string
  isFavorite: boolean,
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export function Favorite(props: IFavoriteProps) {

    return (
      <div className={`${!havePermission(PermissionsEnum.favorite) && 'G-d-none'} P-favorites G-cursor-pointer`} onClick={props.onClick}>
          <i className={`icon-ic_likefull ${props.isFavorite ? 'P-icon-active' : 'P-icon'}`}></i>
          {props.children}
      </div>
    );
}

export function FavoriteOutline(props: IFavoriteProps) {

    return (
      <div className={`${!havePermission(PermissionsEnum.favorite) && 'G-d-none'} P-favorites G-cursor-pointer`} onClick={props.onClick}>
          {props.isFavorite ? <i className={`icon-ic_likefull P-icon-active`}></i> : <i className={`icon-like-3 P-icon-active`}></i>}
          {props.children}
      </div>
    );
}

export function FavoriteVenue({children, classes = '', isFavorite = false, onClick}) {

    return (
      <div className={`${!havePermission(PermissionsEnum.favorite) && 'G-d-none'} P-favorites G-cursor-pointer`} onClick={() => {onClick()}}>
          <i className={`icon-ic-shop ${isFavorite ? 'P-icon-active' : 'P-icon'}`}></i>
          {children}
      </div>
    );
}
