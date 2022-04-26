import axios from 'axios';
import LoginInput from 'components/inputs/loginInput';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const ChangePassword = ({
  password,
  confirmPassword,
  code,
  error,
  loading,
  userInfos,
  success,
  setSuccess,
  setLoading,
  setPassword,
  setConfirmPassword,
  setError,
}) => {
  const navigate = useNavigate();
  const changePasswordValidate = Yup.object({
    password: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(36, 'Password can not be more than 36 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Password must match'),
  });
  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/change-password`,
        { email: userInfos.email, password, code }
      );
      setSuccess(data.message);
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 3000);

      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="reset_form" style={{ height: '300px' }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Please enter strong Password</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          confirmPassword,
        }}
        validationSchema={changePasswordValidate}
        onSubmit={() => {
          handleChangePassword();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              placeholder={'Password'}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LoginInput
              type="password"
              name="confirmPassword"
              placeholder={'Confirm Password'}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <div className="error_text">{error}</div>}
            {success && <div className="success_text">{success}</div>}

            <div className="reset_form_btns">
              <Link to={'/login'} className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
