import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './style.css';
import { useState } from 'react';
import SearchAccount from './SearchAccount';
import SendEmail from './SendEmail';
import CodeVerification from './CodeVerification';
import ChangePassword from './ChangePassword';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userInfos, setUserInfos] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(0);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('user');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="facebook" />
        {user ? (
          <div className="right_reset">
            <Link to={'/profile'}>
              <img src={user?.picture} alt={user.first_name} />
            </Link>
            <button className="blue_btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to={'/login'} className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>

      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            error={error}
            email={email}
            loading={loading}
            setUserInfos={setUserInfos}
            setEmail={setEmail}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfos && (
          <SendEmail
            user={userInfos}
            loading={loading}
            error={error}
            setUserInfos={setUserInfos}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && userInfos && (
          <CodeVerification
            code={code}
            error={error}
            userInfos={userInfos}
            loading={loading}
            setCode={setCode}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
          />
        )}
        {visible === 3 && userInfos && (
          <ChangePassword
            password={password}
            confirmPassword={confirmPassword}
            code={code}
            error={error}
            loading={loading}
            userInfos={userInfos}
            success={success}
            setSuccess={setSuccess}
            setLoading={setLoading}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};

export default Reset;
