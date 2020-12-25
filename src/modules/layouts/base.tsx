import React, {useContext, useEffect, useState} from "react";
import {Route, withRouter} from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import authApi from "../../platform/api/authApi";
import User from "../../platform/api/user/user";
import AuthStorage from "../../platform/services/storages/authStorage";
import LanguageStorage from "../../platform/services/storages/languageStorage";
import {AuthModal} from "../../components/modals/signIn";
import {ToastContainer} from 'react-toastify';
import {Error} from "../../components/alerts/toast";
import {RoleEnum} from "../../platform/enums/role";
import StateContext from "../../contexsts/stateContext";
import CircularProgress from '@material-ui/core/CircularProgress';
import {LanguageEnum} from "../../platform/enums/language";
import t from "../../i18n/translate";

const Base = (props) => {

  const {
    component: ChildComponent,
    match,
    auth = false,
    history,
    ...rest
  } = props;

  const getApiToken = () => {

    let n = AuthStorage.getDeviceId();

    const guestData = {
      DeviceId     : n,
      DeviceToken  : n,
      Model        : 4,
      osVersion    : 4,
      appVersion   : 4,
      LanguageName : LanguageStorage.getLanguage(),
    }

    try {
      authApi.apiAuth('signUpAsGuest', guestData).then((res) => {
        if (res) {
          setApiToken(res.data.token)
          AuthStorage.setApiToken(res.data.token)
        }
      })
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    history.listen((location, action) => {
      window.scrollTo(0, 0)
    });
  }, [])

  const [apiToken, setApiToken] = useState<string>(AuthStorage.getApiToken());
  const [logInModal, setLogInModal] = useState(false);
  const [successToLoad, setSuccessToLoad] = useState(false);
  const [formData, setFormData] = useState({email: '', password: ''});
  const { userState } = useContext(StateContext);

  const submit = () => {
    authApi.signIn(formData).then((res) => {
      if (res.success) {
        setApiToken(res.data.token);
        AuthStorage.setApiToken(res.data.token)
      } else {
        Error(res.message)
      }
    })
  };

  useEffect(() => {

    if (apiToken && AuthStorage.getRole() === RoleEnum.Guest) {
      setSuccessToLoad(true)
    }

    if (AuthStorage.getRole() === RoleEnum.User) {
      User.user().then((res) => {
        AuthStorage.setUser(res.data)
        userState.setUser(res.data)
        setSuccessToLoad(true)
      })
    }
  }, [apiToken]);

  useEffect(() => {
    if (auth && AuthStorage.getRole() !== RoleEnum.User) {
      if (!logInModal) {
        history.push('/home');
      }
      setLogInModal(true)
    }
  }, [match]);

  useEffect(() => {
    if (!LanguageStorage.getLanguage()) {
      LanguageStorage.setLanguage(LanguageEnum.En)
    }
    window.document.body.classList.add(LanguageStorage.getLanguage());
    if (!AuthStorage.getApiToken()) {
      getApiToken()
    }
  }, []);

  return (
    successToLoad ?
      <main>
        <ToastContainer/>
        <AuthModal
          show={logInModal} close={() => {
            setLogInModal(false)
          }}
          history={history}
          btnText={t('sign_in')}
          onChange={(name, val) => {
            setFormData({...formData, [name]: val})
          }}
          submit={() => {
            submit()
          }}/>
        <Header history={history} logIn={() => {
          setLogInModal(!logInModal)
        }}/>
        <div className='G-page G-container'>
          <Route
            {...rest}
            render={matchProps => {
              return <ChildComponent className='G-page G-container' {...matchProps} />;
            }}
          />
        </div>
        <Footer/>
      </main>
    : <div>
        <CircularProgress className='G-full-center' color="secondary"/>
      </div>
  );
};

export default withRouter(Base);
