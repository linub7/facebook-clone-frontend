import Home from 'pages/home';
import Activate from 'pages/home/activate';
import Login from 'pages/login';
import Profile from 'pages/profile';
import Reset from 'pages/reset';

import { Routes, Route } from 'react-router-dom';
import LoggedInRoutes from 'routes/LoggedInRoutes';
import NotLoggedInRoutes from 'routes/NotLoggedInRoutes';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/activate/:tokenId" element={<Activate />} exact />
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/reset" element={<Reset />} exact />
      </Routes>
    </div>
  );
}

export default App;
