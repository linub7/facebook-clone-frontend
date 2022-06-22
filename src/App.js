import Friends from 'pages/friends';
import Home from 'pages/home';
import Activate from 'pages/home/activate';
import Login from 'pages/login';
import Profile from 'pages/profile';
import Reset from 'pages/reset';
import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import LoggedInRoutes from 'routes/LoggedInRoutes';
import NotLoggedInRoutes from 'routes/NotLoggedInRoutes';

function App() {
  const [visible, setVisible] = useState(false);
  const [tmpPost, setTmpPost] = useState(false);
  return (
    <div>
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/friends"
            element={
              <Friends
                visible={visible}
                setVisible={setVisible}
                tmpPost={tmpPost}
                setTmpPost={setTmpPost}
              />
            }
          />
          <Route
            path="/friends/:type"
            element={
              <Friends
                visible={visible}
                setVisible={setVisible}
                tmpPost={tmpPost}
                setTmpPost={setTmpPost}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                visible={visible}
                setVisible={setVisible}
                tmpPost={tmpPost}
                setTmpPost={setTmpPost}
              />
            }
            exact
          />
          <Route
            path="/profile/:username"
            element={
              <Profile
                visible={visible}
                setVisible={setVisible}
                tmpPost={tmpPost}
                setTmpPost={setTmpPost}
              />
            }
            exact
          />
          <Route path="/activate/:tokenId" element={<Activate />} exact />
          <Route
            path="/"
            element={
              <Home
                visible={visible}
                setVisible={setVisible}
                tmpPost={tmpPost}
                setTmpPost={setTmpPost}
              />
            }
          />
        </Route>
        <Route path="/reset" element={<Reset />} exact />
      </Routes>
    </div>
  );
}

export default App;
