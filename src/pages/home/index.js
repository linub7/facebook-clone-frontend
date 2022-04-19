import Header from 'components/header';
import useClickOutside from 'helpers/clickOutside';
import { useRef, useState } from 'react';

const Home = () => {
  const [visible, setVisible] = useState(true);
  const el = useRef(null);
  useClickOutside(el, () => {
    // handle clickOutside without state
    // el.current.style.display = 'none';
    setVisible(false);
  });
  return (
    <div>
      <Header />
      {visible && <div className="card" ref={el}></div>}
      {/* <div className="card" ref={el}></div> */}
    </div>
  );
};

export default Home;
