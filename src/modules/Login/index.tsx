import React, { useState, SyntheticEvent } from 'react';
import { useObserver } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useStores } from 'stores';
import { Form, Button, Input } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';


const LoginLayout: React.FC<{}> = ({ children }) => {
  const { authStore } = useStores();
  const { t } = useTranslation();
  const history = useHistory();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [commonError, setCommonError] = useState<string>("");


  const emailChangeHandler = (_ev: SyntheticEvent, { value }: { value: string }): void => {
    setEmail(value);
    setCommonError("");
    setEmailError("");
  }
  const passwordChangeHandler = (_ev: SyntheticEvent, { value }: { value: string }): void => {
    setPassword(value);
    setCommonError("");
    setPasswordError("");
  }

  const checkEmail = ():boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const checkPassword = ():boolean => {
    return !(
      !password ||
      password.length < 7 ||
      !/\d/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/^[0-9a-zA-Z_]+$/.test(password)
    );
  }

  const onLoginHandler = async ():Promise<void> => {
    if (!email || !password) {
      return setCommonError(t("login.emptyForm"))
    }

    if (!checkEmail()) {
      return setEmailError(t("login.wrongEmail"))
    }

    if (!checkPassword()) {
      return setPasswordError(t("login.wrongPassword"))
    }

    await authStore.loginByPassword({email, password});
    if (authStore.isAuthenticated()) {
      history.push("/quotes");
    }
  };

  const getErrorMessage = (): string => {
    if (emailError !== "") return emailError;
    if (passwordError !== "") return passwordError;
    if (commonError !== "") return commonError;
    if (authStore.loginError) return authStore.loginError;
    return "";
  }

  return useObserver(() => {
    return (
      <div className="auth-page">
        <h2 className="header">{t('login.header')}</h2>
        <div className="content">
          <Form.Field
              fluid
              control={Input}
              label={t('login.login')}
              placeholder={"user@email.ru"}
              error={!!emailError}
              value={email}
              onChange={emailChangeHandler}
              type={"text"}
          />

          <Form.Field
              fluid
              control={Input}
              label={t('login.password')}
              error={!!passwordError}
              value={password}
              placeholder={"*********"}
              onChange={passwordChangeHandler}
              className={"mt-16"}
              type={"password"}
          />

          <Button
            fluid
            onClick={onLoginHandler}
            className={'auth-buttom'}
          >
            {t('login.enter')}
            <img style={{marginLeft:10}} alt={t('login.enter')} src={require("../../styles/img/arrow-right-white.png")}/>
          </Button>

          <div className="error-block">
            {getErrorMessage()}
          </div>

        </div>
      </div>
    );
  });
}


export default LoginLayout;
