import React from 'react';
import { AiOutlineHome, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';
import { Nav } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleLogout = e => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/login');
  };

  return (
    <Nav>
      { isLoggedIn &&
        <Link to="/">
          <AiOutlineHome size={35} />
        </Link>
      }

      <Link to="/register">
        <FaRegUserCircle size={32} />
      </Link>

      {isLoggedIn &&
        <Link to="/setting">
          <FiSettings size={32} />
        </Link>
      }

      {isLoggedIn ? (
        <Link to="/logout" onClick={handleLogout} title="Logout">
          <AiOutlineLogout size={32} />
        </Link>
      ) : (
        <Link to="/login" title="Login">
          <AiOutlineLogin size={32} />
        </Link>
      )}
    </Nav>
  );
}
