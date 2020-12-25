import { ApiClient } from "../services/apiClient";
import {ISignUp} from "../interfaces/signUp";
import {IResetPassword} from "../interfaces/resetPassword";

class AuthApi extends ApiClient {

  controller = 'auth';

  apiAuth = (url, header) => {
    return this.post('signUpAsGuest', {}, {}, header)
  }

  signIn = (data:{email:string, password:string}) => {
    return this.post<{ token: string }>('signIn', data)
  }

  sendCode = (email:string) => {
    return this.put('sendCodeForSignUp', {email})
  }

  resetPassword = (data: IResetPassword) => {
    return this.put('resetPassword', data)
  }

  sendCodeForgotPassword = (email:string) => {
    return this.put('sendCodeForForgotPassword', {email})
  }

  verifyCode = (data: {email: string, code:string  }) => {
    return this.put('verifyCode', data)
  }

  signUp = (data: ISignUp) => {
    return this.post('signUp', data, {})
  }

  logout = () => {
    return this.put('logout', {})
  }
}

export default new AuthApi();
