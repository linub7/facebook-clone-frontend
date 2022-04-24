import axios from 'axios';
import ActivateForm from 'components/ActivateForm';
import CreatePost from 'components/createPost';
import Header from 'components/header';
import LeftHome from 'components/home/left';
import RightHome from 'components/home/right';
import Stories from 'components/stories';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './style.css';

const Activate = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { tokenId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    activateAccount();
  }, []);

  const activateAccount = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token: tokenId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set('user', JSON.stringify({ ...user, verified: true }));
      dispatch({ type: 'ACTIVATE' });
      setLoading(false);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeeded"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed"
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Activate;
