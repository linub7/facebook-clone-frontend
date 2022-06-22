import {
  addToSearchHistory,
  deleteHistory,
  getSearchHistory,
  search,
} from 'functions/user';
import useClickOutside from 'helpers/clickOutside';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Return, Search } from 'svg';

const SearchMenu = ({ color, setShowSearchMenu, token }) => {
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [result, setResult] = useState([]);

  const menu = useRef(null);
  const input = useRef(null);

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input.current.focus();

    return () => {
      setSearchTerm('');
      setResult([]);
    };
  }, []);

  useEffect(() => {
    handleGetSearchHistory();

    return () => {
      setSearchHistory([]);
    };
  }, []);

  const handleSearch = async () => {
    if (searchTerm === '') {
      setResult([]);
    } else {
      try {
        const data = await search(searchTerm, token);
        setResult(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGetSearchHistory = async () => {
    try {
      const result = await getSearchHistory(token);
      setSearchHistory(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToSearchHistory = async (searchUser) => {
    try {
      await addToSearchHistory(searchUser, token);
      setShowSearchMenu(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSearchHistory = async (searchId) => {
    try {
      const result = await deleteHistory(searchId, token);
      if (result) {
        setSearchHistory(
          searchHistory.filter((search) => search._id !== searchId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => setShowSearchMenu(false)}
          >
            <Return color={color} />
          </div>
        </div>
        <div className="search" onClick={() => input.current.focus()}>
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={handleSearch}
            onFocus={() => setIconVisible(false)}
            onBlur={() => setIconVisible(true)}
          />
        </div>
      </div>
      {result.length === 0 && (
        <div className="search_history_header">
          <span>Recent Searches</span>
          <a href="">Edit</a>
        </div>
      )}
      <div className="search_history">
        {searchHistory &&
          result.length === 0 &&
          searchHistory
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((search) => (
              <div className="search_user_item hover1" key={search?.user?._id}>
                <Link
                  to={`/profile/${search?.user?.username}`}
                  className="search_user_item hover1"
                  onClick={() => handleAddToSearchHistory(search?.user?._id)}
                >
                  <img
                    src={search?.user?.picture}
                    alt={search?.user?.username}
                  />
                  <span>
                    {search?.user?.first_name} {search?.user?.last_name}
                  </span>
                </Link>
                <i
                  className="exit_icon"
                  onClick={() => handleDeleteSearchHistory(search._id)}
                ></i>
              </div>
            ))}
      </div>
      <div className="search_results scrollbar">
        {result?.map((user) => (
          <Link
            to={`/profile/${user?.username}`}
            className="search_user_item hover1"
            key={user?._id}
            onClick={() => handleAddToSearchHistory(user?._id)}
          >
            <img src={user?.picture} alt={user?.username} />
            <span>
              {user?.first_name} {user?.last_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchMenu;
