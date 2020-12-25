import React, {useEffect, useState} from 'react';
import '../style.scss';
import sunSm from "../../../assets/img/sun-sm.png"
import { AuthContents } from "../../../platform/enums/authContents";
import {SignUp} from "./signUp";
import {SignIn} from "./signIn";
import {VerifyCode} from "./verifyCode";
import {ISignUp} from "../../../platform/interfaces/signUp";
import {Password} from "./password";
import {ForgotPassword} from "./forgotPassword";

interface IModal {
  show: boolean,
  close:  (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  submit: () => void,
  onChange: (name, val) => void,
  history: any
  btnText: string | JSX.Element
}

export function AuthModal(props: IModal) {

  const [nextContent, setNextContent] = useState<AuthContents>(AuthContents.signIn);
  const [form, setForm] = useState<ISignUp>();

  useEffect(() => {
    setNextContent(AuthContents.signIn)
  }, [props.show])

  return (
    <div className='P-modal'>
      <div onClick={props.close} className='P-modal-cover'  style={props.show ? {display: "block"} : {display: "none"}}></div>
      <div className="P-modal-wrapper-md P-modal-wrapper"
         style={{
           transition: 'opacity .5s .4s',
           transform: props.show ? 'translateY(-50%)' : 'translateY(-110vh)',
           top: props.show ? '50%' : '-100%',
           opacity: props.show ? '1' : '0'
         }}>
        <img className='P-left-sun' src={sunSm} alt="sun"/>
        {nextContent === AuthContents.signIn &&
         <SignIn history={props.history} signUp={() => {}} nextContent={(code) => {setNextContent(code)}}/>
        }
        {nextContent === AuthContents.signUp &&
         <SignUp sendForm={(data) => {setForm(data)}} nextContent={(code) => {setNextContent(code)}}/>
        }
        {nextContent === AuthContents.code &&
         <VerifyCode email={form.email} nextContent={(code) => {setNextContent(code)}}/>
        }
        {nextContent === AuthContents.password &&
          <Password form={form} nextContent={(code) => {setNextContent(code)}}/>
        }
        {nextContent === AuthContents.forgotPassword &&
          <ForgotPassword form={form} nextContent={(code) => {setNextContent(code)}}/>
        }
      </div>
    </div>
  )
}
