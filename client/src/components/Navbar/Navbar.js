import React, { useContext } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { AiFillFire } from 'react-icons/ai'
import { logOutUser } from '../../store/actions/authActions';
import './styles.css';
import { Avatar, Spacer } from '@nextui-org/react';

const Navbar = ({ auth, logOutUser, history }) => {
  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h2 className="logo"><span className="logo-color">Biz</span>Sol</h2>
      </Link>
      <ul className="nav-links flex-1">
        {auth.isAuthenticated ? (
          <>
            {/* <li className="nav-item">
              <Link to="/">Home</Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/users">Companies</Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to={`/${auth.me.username}`}>Profile</Link>
            </li> */}
            {auth.me?.role === 'ADMIN' && (
              <li className="nav-item">
                <Link to="/admin">Admin</Link>
              </li>
            )}
            <li className="flex-1" />
            {
              auth.me.organisation.flag && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>
                  {auth.me.slots}
                  <AiFillFire style={{ color: 'red', fontSize: '2.1rem' }} />
                  <Spacer x={1} />
                </div>
              )
            }
            <Link to={`/${auth.me.username}`}>
              <Avatar
                size="lg"
                src={auth.me.avatar}
                color="primary"
                bordered
                circle
                css={{ marginRight: '10px', cursor: 'pointer' }}
              />
            </Link>
            <li className="nav-item" onClick={onLogOut}>
              <a href="#" style={{ color: 'var(--bg)' }}>Log out</a>
            </li>
          </>
        ) : (
          <>
            <li className="flex-1" />

            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" style={{ color: 'var(--bg)' }}>SignUp</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(withRouter, connect(mapStateToProps, { logOutUser }))(Navbar);
