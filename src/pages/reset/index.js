import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './style.css';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import LoginInput from 'components/inputs/loginInput';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
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
        <div className="reset_form">
          <div className="reset_form_header">Find your account</div>
          <div className="reset_form_text">
            Please enter your email address to search for your account
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder={'Enter your email address'}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <div className="error_text">{error}</div>}
                <div className="reset_form_btns">
                  <Link to={'/login'} className="gray_btn">
                    Cancel
                  </Link>
                  <button type="submit" className="blue_btn">
                    Search
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Reset;
