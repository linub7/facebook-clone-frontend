import useClickOutside from 'helpers/clickOutside';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Logo,
  Search,
  HomeActive,
  Friends,
  Watch,
  Market,
  Gaming,
  Menu,
  Messenger,
  Notifications,
  ArrowDown,
  Home,
} from '../../svg';
import AllMenu from './AllMenu';
import SearchMenu from './SearchMenu';

import './style.css';
import UserMenu from './userMenu';

const Header = ({ page }) => {
  const color = '#65676b';
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useSelector((user) => ({ ...user }));

  const allMenu = useRef(null);
  const userMenu = useRef(null);

  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });

  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      <div className="header_left">
        <Link to={'/'} className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => setShowSearchMenu(true)}>
          <Search color={color} />
          <input placeholder="Search Facebook" className="hide_input" />
        </div>
      </div>

      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className="header_middle">
        <Link
          to={'/'}
          className={`middle_icon ${page === 'home' ? 'active' : ''}`}
        >
          {page === 'home' ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link to={'/'} className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to={'/'} className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to={'/'} className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to={'/'} className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === 'profile' ? 'active_link' : ''
          }`}
        >
          <img src={user?.picture} alt="profile" />
          <span>{user?.first_name}</span>
        </Link>
        <div
          ref={allMenu}
          className={`circle_icon hover1 ${showAllMenu ? 'active_header' : ''}`}
          onClick={() => setShowAllMenu((prev) => !prev)}
        >
          <Menu />
        </div>
        {showAllMenu && <AllMenu />}
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div
          className={`circle_icon hover1 ${
            showUserMenu ? 'active_header' : ''
          }`}
          ref={userMenu}
        >
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: 'translateY(2px)' }}>
              <ArrowDown />
            </div>
          </div>

          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
