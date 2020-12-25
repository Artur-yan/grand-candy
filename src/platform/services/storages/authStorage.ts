import { BaseStorage } from "./baseStorage";
import { RoleEnum } from "../../enums/role";
import {IUserModel} from "../../api/user/res/user-model";

class AuthStorage extends BaseStorage {

  setApiToken(token: string) {
    this.set('apiToken', token);
    window.location.reload();
  }

  getDeviceId() {

    if (!this.get('DeviceId')) {
      let d = new Date();
      let n = d.getTime();
      this.set('DeviceId', n);
    }

    return this.get('DeviceId');
  }

  getApiToken(): string {
    return this.get('apiToken');
  }

  getRole(): RoleEnum {
    if (this.getApiToken()) {
      return this.parseJwt(this.getApiToken()).scopes;
    }

    return null;
  }

  setUser(user: IUserModel) {
    this.set('user', JSON.stringify(user))
  }

  getUser(): IUserModel {
    if (this.get('user')) {
      return JSON.parse(this.get('user'))
    }
  }

  deleteUser() {
    this.remove('user')
  }

  private parseJwt(token: string): { scopes: RoleEnum } {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    return JSON.parse(jsonPayload);
  };
}

export default new AuthStorage();
