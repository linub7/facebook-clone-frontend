import './style.css';
import LoginForm from 'components/login/LoginForm';
import LoginFooter from 'components/login/LoginFooter';

const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <div className="register"></div>
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
