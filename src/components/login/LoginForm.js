import LoginInput from 'components/inputs/loginInput';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import RotateLoader from 'react-spinners/RotateLoader';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

const LoginForm = ({ setIsOpen }) => {
  const loginInformation = {
    email: '',
    password: '',
  };
  const [login, setLogin] = useState(loginInformation);
  const { email, password } = login;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email Address is required.')
      .email('Please enter a valid Email')
      .max(100),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email, password }
      );
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('user', JSON.stringify(rest));
        setLoading(false);
        navigate('/');
      }, 2000);
      setError('');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="facebook" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              handleSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleLoginInputChange}
                />
                <LoginInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleLoginInputChange}
                  bottom={true}
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to={`/forgot`} className="forgot_password">
            Forgotten Password?
          </Link>
          {error && <div className="error_text">{error}</div>}
          {loading && (
            <RotateLoader color="#1876f2" loading={loading} size={10} />
          )}
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setIsOpen(true)}
          >
            Create Account
          </button>
        </div>
        <Link to={`/`} className="sign_extra">
          <b>Create a Page </b>
          for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
