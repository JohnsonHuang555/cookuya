import { StoreState } from 'reducers/rootReducer';

export const snackbarSelector = (store: StoreState) => store.app.snackbar;
export const userInfoSelector = (store: StoreState) => store.app.userInfo;
export const showLoginModalSelector = (store: StoreState) =>
  store.app.showLoginModal;
export const isLoginSelector = (store: StoreState) => store.app.isLogin;
