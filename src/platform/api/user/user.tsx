import { ApiClient } from "../../services/apiClient";
import {IUserModel} from "./res/user-model";

class User extends ApiClient {

  controller = 'user';

  user = () => {
    return this.get<IUserModel>('getUserDetails')
  }

  uploadImage = (data) => {
    return this.post('uploadImage', data)
  }

  updateInfo = (data) => {
    return this.put('', data)
  }

  changePassword = (data) => {
    return this.put('changePassword', data)
  }

  verifyPhone = (data: {phoneNumber: string}) => {
    return this.put('sendCodeForVerifyPhone', data)
  }

  confirmCode = (data: {phoneNumber: string, code: string, dateOfBirthday: number}) => {
    return this.put('verifyCodeAndSetPhoneAndDate', data)
  }
}

export default new User();
