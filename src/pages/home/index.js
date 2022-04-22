import Header from 'components/header';
import LeftHome from 'components/home/left';
import RightHome from 'components/home/right';
import Stories from 'components/stories';
import { useSelector } from 'react-redux';
import './style.css';

const Home = () => {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
