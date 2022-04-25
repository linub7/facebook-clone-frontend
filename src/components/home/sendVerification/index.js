import axios from 'axios';
import { useState } from 'react';
import './style.css';

const SendVerification = ({ token }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const sendVerificationEmail = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/send-verification`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(data.message);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="send_verification">
      <span>
        Your account is not verified, verify your account before it gets deleted
        after a month from creating
      </span>
      <a onClick={sendVerificationEmail}>
        click here to resend verification link
      </a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
};

export default SendVerification;
