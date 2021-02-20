import { observable, action, runInAction } from 'mobx';
import WebApi, { getErrorMessage } from 'services';
import { StoreInterface, RootStoreInterface } from 'interfaces';


class AuthStore implements StoreInterface {
  rootStore: RootStoreInterface;

  apiClient: WebApi;

  @observable
  isAuthenticated: boolean | undefined = false;

  @observable
  loginError: string | undefined;

  @observable
  logoutError: object | undefined;

  @observable
  isLoginInProcess = false;

  @observable
  isLogoutInProcess = false;


  constructor(rootStore: RootStoreInterface) {
    this.rootStore = rootStore;
    this.apiClient = rootStore.apiClient;

    runInAction(() => {
      this.isAuthenticated = localStorage.getItem("isAuth") !== null;
    });
  }

  @action.bound
  async loginByPassword(props: {
    email: string;
    password: string;
  }): Promise<void> {
    const { email, password } = props;
    this.isLoginInProcess = true;
    this.loginError = undefined;

    try {
      const {result, error} = await this.apiClient.auth.login({login: email, password});

      runInAction(() => {
        switch (result) {
          case "ok":
            this.isAuthenticated = true;
            localStorage.setItem("isAuth", "1");
            break;
          case "error":
            this.loginError = error;
            break;
          default:
            this.loginError = "Unknown server status";
        }
      });
    } catch (err) {
      runInAction(() => {
        this.loginError = getErrorMessage(err);
      });
    }

    runInAction(() => {
      this.isLoginInProcess = false;
    });
  }

  @action.bound
  async logout(): Promise<void> {
    runInAction(() => {
      localStorage.removeItem("isAuth")
      this.isAuthenticated = false
    });
  };

}


export default AuthStore;
