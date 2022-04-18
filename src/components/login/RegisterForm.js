import axios from 'axios';
import RegisterInput from 'components/inputs/registerInput';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';
import RotateLoader from 'react-spinners/RotateLoader';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ setIsOpen }) => {
  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerInformation = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  };
  const [register, setRegister] = useState(registerInformation);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = register;
  const handleInputChange = (e) => {
    const {
      target: { value, name },
    } = e;

    setRegister({ ...register, [name]: value });
  };
  const tempYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => tempYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => new Date(bYear, bMonth, 0).getDate();
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required('What is your First Name?')
      .min(2, 'First Name must be 2 and 16 characters.')
      .max(16, 'First Name must be 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),
    last_name: Yup.string()
      .required('What is your Surname?')
      .min(2, 'Surname must be 2 and 16 characters.')
      .max(16, 'Surname must be 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed'),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email('Please enter a valid email')
      .max(100),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers, letters and punctuation marks(Such as ! and &).'
      )
      .min(6, 'Password must be at least 6 characters')
      .max(36, 'Password can not be more than 36 characters'),
  });

  const registerForm = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError('');
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('user', JSON.stringify(rest));
        setLoading(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };

  const handleSubmit = () => {
    let currentDate = new Date();
    let pickedDate = new Date(bYear, bMonth - 1, bDay);
    let atLeast24 = new Date(1970 + 14, 0, 1); // 1970: start year in Date()[Default]
    let noMoreThan70 = new Date(1970 + 70, 0, 1);
    if (currentDate - pickedDate < atLeast24) {
      setDateError(
        `It's looks like you've entered the wrong info.Please make sure that you use real date of birth.`
      );
    } else if (currentDate - pickedDate > noMoreThan70) {
      setDateError(
        `It's looks like you've entered the wrong info.Please make sure that you use real date of birth.`
      );
    } else if (gender === '') {
      setDateError('');
      setGenderError('Please choose a gender.');
    } else {
      setDateError('');
      setGenderError('');
      registerForm();
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setIsOpen(false)}></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onChange={handleInputChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of Birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleInputChange={handleInputChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleInputChange={handleInputChange}
                  genderError={genderError}
                />
              </div>
              <div className="reg_btn_wrapper">
                <button type="submit" className="blue_btn open_signup">
                  Sign Up
                </button>
              </div>
              {loading && (
                <RotateLoader color="#1876f2" loading={loading} size={10} />
              )}
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
