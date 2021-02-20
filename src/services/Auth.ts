/* eslint-disable @typescript-eslint/camelcase */
import { AxiosInstance } from 'axios';
import { AuthResponse } from 'interfaces';



class Auth {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async login(params: {
    login: string;
    password: string;
  }): Promise<AuthResponse> {
    const {
      login,
      password,
    } = params;

    const {data:{result, error}} = await this.api.post('', {
      action:"login",
      login,
      password
    });

    return {result, error};
  }

}

export default Auth;
