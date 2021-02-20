import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry, { isNetworkOrIdempotentRequestError, IAxiosRetryConfig } from 'axios-retry';
import qs from 'qs';
import Auth from './Auth';
import Common from './Common';

const SAFE_HTTP_METHODS = ['get', 'head', 'options'];
const IDEMPOTENT_HTTP_METHODS = SAFE_HTTP_METHODS.concat(['put', 'delete']);


const isJSON = (str: string) => {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
};

const isTimeoutHappened = (error: AxiosError) => error.code === 'ECONNABORTED'
  && error.message.toLocaleLowerCase().indexOf('timeout') !== -1;

const isRetryableError = (error: AxiosError) => isTimeoutHappened(error)
  || !error.response
  || (error.response.status >= 500 && error.response.status <= 599);

const isIdempotentRequestError = (error: AxiosError) => IDEMPOTENT_HTTP_METHODS
  .indexOf((error.config && error.config.method) ? error.config.method : '') !== -1;


export const getErrorMessage = (err: AxiosError) => {
  if (err.response) {
    if (err.response.data.message) {
      return err.response.data.message;
    }

    if (err.response.status === 400) {
      return 'Bad request';
    }

    if (err.response.status === 401) {
      return 'Unauthorized';
    }

    if (err.response.status === 404) {
      return 'Not found';
    }

    if (err.response.status === 403) {
      return 'Forbidden';
    }
  } else if (err.request) {
    return 'Connection refused';
  }
  return 'Server error';
};



class WebApi {
  api: AxiosInstance;
  auth: Auth;
  common: Common;
  jti: string;

  constructor(props: {
    baseURL: string,
    timeout?: number,
  }) {
    const {
      baseURL,
      timeout,
    } = props;

    this.api = axios.create({
      baseURL,
      timeout: timeout || 10000,
      withCredentials: false,
      paramsSerializer: (params) => qs.stringify(params),
    } as AxiosRequestConfig);

    this.auth = new Auth(this.api);
    this.common = new Common(this.api);
    this.jti = '';

    this.api.interceptors.request.use(
      (config) => ({
        ...this.transformRequest(config),
      }),
      (err) => Promise.reject(err),
    );

    axiosRetry(this.api, {
      retries: 3,
      shouldResetTimeout: true,
      retryDelay: (retryCount) => retryCount * 300,
      retryCondition: (error) => {
        if (isNetworkOrIdempotentRequestError(error)) {
          return true;
        }

        if (!error.config || !isRetryableError(error)) {
          return false;
        }

        if (isIdempotentRequestError(error)) {
          // Повторная отправка всех запросов с методом, отличным от POST
          return true;
        }

        //TODO: wss?
        return false;
      },
    } as IAxiosRetryConfig);
  }


  transformRequest(axiosConfig: AxiosRequestConfig) {
    const { method, data, params } = axiosConfig;

    let requestData = isJSON(data) ? JSON.parse(data) : data;
    requestData = requestData || {};

    if (['post', 'put'].includes(method || '')) {
      return {
        ...axiosConfig,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        data: JSON.stringify(requestData),
      };
    }

    if (method === 'delete') {
      return {
        ...axiosConfig,
        params: {
          ...params,
        },
      };
    }

    return axiosConfig;
  }
}

export default WebApi;
