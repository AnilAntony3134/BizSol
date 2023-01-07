import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Layout from '../../layout/Layout';
import MessageList from '../../components/MessageList/MessageList';
import MessageForm from '../../components/MessageForm/MessageForm';
import { reseedDatabase } from '../../store/actions/authActions';

import './styles.css';
import LandingPage from '../../components/Landing Page/LandingPage';

const ReseedMessage = ({ handleReseed }) => {
  return (
    <div>
      <span style={{ marginRight: '10px' }}>
        If the app has been vandalized just reseed the database by clicking this button
      </span>
      <button onClick={handleReseed} className="btn reseed-btn">
        Reseed Database
      </button>
    </div>
  );
};

const Home = ({ auth, reseedDatabase }) => {
  const handleReseed = () => {
    reseedDatabase();
  };

  return (
    <Layout>
      <div className="home-page">
        {!auth.isAuthenticated ? (
          <div>
            <LandingPage />
          </div>
        ) : (
          <>
            <>
              <h1>Home page</h1>
              Welcome <span className="name">{auth.me.name}</span>!
            </>
            <ReseedMessage handleReseed={handleReseed} />
            <MessageForm />
            <MessageList />
          </>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps, { reseedDatabase }))(Home);
