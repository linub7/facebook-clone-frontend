import { Link } from 'react-router-dom';

const SendEmail = ({ user }) => {
  const { picture, email } = user;
  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset your password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset tour password?
          </div>
          <label htmlFor="email">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={picture} alt={email} />
          <span>{email}</span>
          <span>Facebook user</span>
          <div className="reset_form_btns">
            <Link to={'/login'} className="gray_btn">
              Not you?
            </Link>
            <button type="submit" className="blue_btn">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
