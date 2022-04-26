import axios from 'axios';
import { Link } from 'react-router-dom';

const SendEmail = ({
  user,
  error,
  loading,
  setUserInfos,
  setError,
  setLoading,
  setVisible,
}) => {
  const { picture, email } = user;

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/send-reset-code`, {
        email,
      });
      setLoading(false);
      setError('');
      setVisible(2);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={picture} alt="" />
          <span>{email}</span>
          <span>Facebook user</span>
        </div>
      </div>
      {error && (
        <div className="error_text" style={{ padding: '10px' }}>
          {error}
        </div>
      )}
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You ?
        </Link>
        <button onClick={handleSendEmail} className="blue_btn">
          Continue
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
