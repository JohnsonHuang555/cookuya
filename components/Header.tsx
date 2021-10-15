import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Toast from 'components/Toast';
import {
  showLoginModalSelector,
  userInfoSelector,
} from 'selectors/appSelector';
import { User } from 'models/User';
import {
  removeUserInfo,
  setShowLoginModal,
  setSnackbar,
  setUserInfo,
} from 'actions/AppAction';
import styles from 'styles/components/header.module.scss';
import LoginModal from './modals/LoginModal';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector(userInfoSelector);
  const showLoginModal = useSelector(showLoginModalSelector);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const obj: User = JSON.parse(userInfo);
      dispatch(setUserInfo(obj));
    }
  }, [dispatch]);

  const onConfirm = (name: string) => {
    const userInfo: User = {
      name,
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    dispatch(setUserInfo(userInfo));
    dispatch(setShowLoginModal(false));
    dispatch(
      setSnackbar({
        show: true,
        message: '登入成功',
      })
    );
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    dispatch(removeUserInfo());
    dispatch(
      setSnackbar({
        show: true,
        message: '登出成功',
      })
    );
  };

  return (
    <>
      <LoginModal
        show={showLoginModal}
        onClose={() => dispatch(setShowLoginModal(false))}
        onConfirm={onConfirm}
      />
      <Toast />
      <AppBar position="static">
        <Toolbar>
          {/* TODO: LOGO */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <span
              onClick={() => router.push('/')}
              style={{ cursor: 'pointer' }}
            >
              cookuya
            </span>
          </Typography>
          <div className={styles.userInfo}>
            {userInfo ? (
              <>
                <Typography className={styles.userName} variant="h6">
                  歡迎！{userInfo.name}
                </Typography>
                {router.pathname.substr(1, 5) !== 'rooms' && (
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => logout()}
                    style={{ color: '#fff' }}
                  >
                    登出
                  </Button>
                )}
              </>
            ) : (
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={() => dispatch(setShowLoginModal(true))}
                style={{ color: '#fff' }}
              >
                登入
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
