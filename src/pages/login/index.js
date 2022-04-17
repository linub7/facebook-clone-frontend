import './style.css';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import LoginInput from 'components/inputs/loginInput';
import { useState } from 'react';
import * as Yup from 'yup';

const loginInformation = {
  email: '',
  password: '',
};

const Login = () => {
  const [login, setLogin] = useState(loginInformation);
  const { email, password } = login;

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

  return (
    <div className="login">
      <div className="login_wrapper">
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
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to={`/`} className="sign_extra">
              <b>Create a Page </b>
              for a celebrity, brand or business.
            </Link>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
};

export default Login;
