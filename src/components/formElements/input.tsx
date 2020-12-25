import React, {useEffect, useState} from 'react';
import {ValidateEnum} from "../../platform/enums/validate";
import invisible from "../../assets/svg/invisible.svg";
import {validatePhoneNumber, validateEmail, validateNumber} from "../../platform/services/validation";

interface IProps {
  type?: string;
  name: string;
  disabled?: boolean;
  error?: string;
  classes?: string;
  divClasses?: string;
  placeholder?: string;
  defaultValue?: string;
  validate?: ValidateEnum,
  onBlur?: (name: string, value: any) => void
  onChanging?: (name: string, value: any) => void
  onEnter?: (name: string, value: any) => void
  value?: any
}

export function Input(props: IProps) {
  const [_type, set_type] = useState(props.type || 'text')
  const [error, setError] = useState(null)
  const [value, setValue] = useState(props.value || '')

  const onKeyDown = (e) => {

    if (e.key === 'Enter' && props.onEnter) {
      props.onEnter(e.target.name, e.target.value)
    }
  }

  const onChangHandel = (name, value) => {
    setValue(value)
    if (props.onChanging) {
      props.onChanging(name, value);
    }
  }

  const changeListener = (name, value, e) => {

    let response;

    if (props.validate === ValidateEnum.required) {

      if (value) {
        props.onBlur(name, value)
      } else {
        setError(`${name} is required!`)
        return false
      }
      return;
    }

    if (props.validate === ValidateEnum.phoneNumber) {
      response = validatePhoneNumber(value, setError);
      if (response) {
        e.target.value = response;
        props.onBlur(name, response)
      }
      return;
    }

    if (props.validate === ValidateEnum.email) {
      response = validateEmail(value, setError);
      if (response) {
        props.onBlur(name, value)
      }
      return;
    }

    if (props.validate === ValidateEnum.number) {
      response = validateNumber(value, setError);
      if (response) {
        props.onBlur(name, value)
      }
      return;
    }
    props.onBlur(name, value)
  }

  return (
    <div className={`G-width-100 P-input G-position-relative ${props.divClasses}`}>
      {props.type === 'password' &&
        <>
            <img className={`P-input-invisible ${_type !== 'text' && 'G-d-none'}`} src={invisible} alt="icon" onClick={() => {
              set_type( 'password')
            }}/>
            <i className={`icon-ic_eye ${_type === 'text' && 'G-d-none'}`} onClick={() => {
              set_type( 'text')
            }}/>
        </>}
      <input name={props.name}
             placeholder={props.placeholder}
             className={`${props.classes}`}
             onKeyDown={onKeyDown}
             type={_type}
             value={value}
             onChange={(e) => onChangHandel(e.target.name, e.target.value)}
             disabled={props.disabled}
             onBlur={(e) => changeListener(e.target.name, e.target.value, e)}/>
     <div className='G-flex-column G-text-left'>
       {error && <span className="G-error-alert">{error}</span>}
       {props.error && <span className="G-error-alert">{props.error}</span>}
     </div>
    </div>
  );
}

interface ISearchProps {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  classes?: string;
  onChange: (value: any) => void
}

export function SearchInput(props: ISearchProps) {
  return (
    <div className='G-width-100 P-input P-input-search G-position-relative'>
      <i className="icon-search-16"></i>
      <input name='search'
             defaultValue={props.defaultValue || ''}
             placeholder={props.placeholder}
             className={`${props.classes}`}
             type='text'
             onChange={(e) => {props.onChange(e.target.value)}}/>
    </div>
  );
}

export function SearchInputFull(props: ISearchProps) {

  return (
    <div className='G-width-100 G-mb-35 P-input P-input-search-full-screen G-position-relative'>
      <i className="icon-search-16"></i>
      <input name='search'
             value={props.value}
             placeholder={props.placeholder}
             className={`${props.classes}`}
             type='text'
             onChange={(e) => {props.onChange(e.target.value)}}/>
    </div>
  );
}
