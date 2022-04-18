import './style.css';
import LoginForm from 'components/login/LoginForm';
import LoginFooter from 'components/login/LoginFooter';
import RegisterForm from 'components/login/RegisterForm';
import { useState } from 'react';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setIsOpen={setIsOpen} />
        {isOpen && <RegisterForm setIsOpen={setIsOpen} />}
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
