import axios from 'axios';
import AuthStorage from "./storages/authStorage";
import LanguageStorage from "./storages/languageStorage";
import qs from 'qs';
import {IResponse} from "../interfaces/response";
import {OsTypeEnum} from "../enums/osType";
import {environment} from "../../environments/environment";

export abstract class ApiClient {

  static defaultConfigs = {
    headers: {},
    params: {},
    paramsSerializer: function(params) {
      return qs.stringify(params, {arrayFormat: 'brackets'})
    }
  };

  abstract controller: string;

  API_URI = environment.baseUrl
  //demo url
  //  'http://212.42.196.110:6122/'

  configs = {};

  constructor () {
    this.resetConfigs();
  }

  resetConfigs() {
    this.configs = Object.assign({}, ApiClient.defaultConfigs);
  }

  setConfig(key, value) {
    this.configs = Object.assign({}, this.configs, {
      [key]: value
    });
  }

  getRuntimeConfigs() {

    const token = AuthStorage.getApiToken();
    const language = LanguageStorage.getLanguage();
    let headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['languageName'] = language;
    }
    headers['DeviceId'] = AuthStorage.getDeviceId();
    headers['osTypeId'] = OsTypeEnum.web;

    return Object.assign({}, this.configs, {
      headers,
      params: undefined
    });
  }

  mergeConfigs(params, headers, configs) {
    const runtimeConfigs = this.getRuntimeConfigs();

    return Object.assign(
      {},
      runtimeConfigs,
      Object.assign(
        {},
        configs,
        {
          params: Object.assign({}, runtimeConfigs.params, params),
          headers: Object.assign({}, runtimeConfigs.headers, headers)
        }
      )
    );
  }

  uploadProgress(callback) {
    this.setConfig('onUploadProgress', callback);
  }

  cancelToken() {
    return axios.CancelToken.source();
  }

  getCancel() {
    const source = this.cancelToken();
    this.setConfig('cancelToken', source.token);
    return source.cancel;
  }

  isCancel(error) {
    return axios.isCancel(error);
  }

  get<T = any>(uri, params = {}, headers = {}, configs = {}) {
    return axios.get<IResponse<T>>(`${this.API_URI}api/${this.controller}/${uri}`,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data).catch(error => {
      if (error.response) {
        return error.response.data
      }
    });
  }

  post<T = any>(uri, data, params = {}, headers = {}, configs = {}) {
    return axios.post<IResponse<T>>(`${this.API_URI}api/${this.controller}/${uri}`, data,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data).catch(error => {
      if (error.response) {
        return error.response.data
      }
    });
  }

  put<T = any>(uri, data, params = {}, headers = {}, configs = {}) {
    return axios.put<IResponse<T>>(`${this.API_URI}api/${this.controller}/${uri}`, data,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }

  delete<T = any>(uri, params = {}, headers = {}, configs = {}) {
    return axios.delete<IResponse<T>>(`${this.API_URI}api/${this.controller}/${uri}`,
      this.mergeConfigs(params, headers, configs)
    ).then(response => response.data);
  }
}
