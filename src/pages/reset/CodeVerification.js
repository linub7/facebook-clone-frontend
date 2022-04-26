import axios from 'axios';
import LoginInput from 'components/inputs/loginInput';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const CodeVerification = ({
  error,
  code,
  userInfos,
  loading,
  setCode,
  setLoading,
  setError,
  setVisible,
}) => {
  const codeValidate = Yup.object({
    code: Yup.string()
      .required('Code is required')
      .min(5, 'Code must be 5 characters')
      .max(5, 'Code must be 5 characters'),
  });

  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validate-reset-code`,
        {
          email: userInfos.email,
          code,
        }
      );
      setError('');
      setLoading(false);
      setVisible(3);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div className="reset_form">
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter the code that been sent to your email
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
        validationSchema={codeValidate}
        onSubmit={() => {
          handleVerifyCode();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              placeholder={'Code'}
              onChange={(e) => setCode(e.target.value)}
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to={'/login'} className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CodeVerification;
