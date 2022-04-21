import LeftLink from './LeftLink';
import './style.css';
import { left } from 'data/home';
import { Link } from 'react-router-dom';
import { ArrowDown1 } from 'svg';
import { useState } from 'react';
import Shortcut from './Shortcut';

const LeftHome = ({ user }) => {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <div className="left_home scrollbar">
      <Link to={'/profile'} className="left_link hover1">
        <img src={user?.picture} alt="user" />
        <span>
          {user?.first_name} {user?.last_name}{' '}
        </span>
      </Link>
      {left.slice(0, 8).map((item, index) => (
        <LeftLink key={index} {...item} />
      ))}
      {!seeMore && (
        <div className="left_link hover1" onClick={() => setSeeMore(true)}>
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {seeMore && (
        <div className="more_left">
          {left.slice(8, left.length).map((item, index) => (
            <LeftLink key={index} {...item} />
          ))}
        </div>
      )}
      {seeMore && (
        <div className="left_link hover1" onClick={() => setSeeMore(false)}>
          <div className="small_circle rotate360">
            <ArrowDown1 />
          </div>
          <span>See less</span>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list">
        <Shortcut
          link="https://www.youtube.com/channel/UC51rU8O_R-Az9TEfUhZUMEQ"
          img="../../../../images/ytb.png"
          name="My YouTube Channel"
        />

        <Shortcut
          link="/"
          img="../../../../images/insta.png"
          name="My Instagram"
        />
      </div>
    </div>
  );
};

export default LeftHome;
