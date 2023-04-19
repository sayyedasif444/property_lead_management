import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from './views';
import { Route, Switch } from 'react-router-dom';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { THEME_CONFIG } from './configs/AppConfig';
import setAuthToken from './utils/setAuthToken';
import { LOGIN_SUCCESS } from './actions/types';

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

function App() {
  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
    store.dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: sessionStorage.getItem('token'),
        firstName: sessionStorage.getItem('firstName'),
        lastName: sessionStorage.getItem('lastName'),
        email: sessionStorage.getItem('email'),
        id: sessionStorage.getItem('id'),
        user_type: sessionStorage.getItem('user_type'),
        phone_number: sessionStorage.getItem('phone_number'),
      },
    });
  }
  useEffect(() => {
    // store.dispatch(loadUser());
  }, []);
  return (
    <div className='App'>
      <Provider store={store}>
        <ThemeSwitcherProvider
          themeMap={themes}
          defaultTheme={THEME_CONFIG.currentTheme}
          insertionPoint='styles-insertion-point'
        >
          <Router>
            <Switch>
              <Route path='/' component={Views} />
            </Switch>
          </Router>
        </ThemeSwitcherProvider>
      </Provider>
    </div>
  );
}

export default App;
