import './style.css';
import LoginForm from 'components/login/LoginForm';
import LoginFooter from 'components/login/LoginFooter';
import RegisterForm from 'components/login/RegisterForm';

const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <RegisterForm />
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
