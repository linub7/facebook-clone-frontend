import axios from 'axios';
import LoginInput from 'components/inputs/loginInput';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const SearchAccount = ({
  error,
  email,
  loading,
  setUserInfos,
  setEmail,
  setError,
  setLoading,
  setVisible,
}) => {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required('Email address is required')
      .email('Must be a valid email address')
      .max(50, `Email address can't be more than 50 characters`),
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/find-user`,
        { email }
      );
      setUserInfos(data);
      setVisible(1);
      setLoading(false);
      setError('');
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Find your account</div>
      <div className="reset_form_text">Please enter your email address</div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={() => {
          handleSubmit();
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
  );
};

export default SearchAccount;
