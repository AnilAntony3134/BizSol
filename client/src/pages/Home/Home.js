import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '../../layout/Layout';
import './styles.css';
import LandingPage from '../../components/Landing Page/LandingPage';
import Dashboard from '../../components/DashBoard/Dashboard';

const Home = ({ auth }) => {
  return (
    <Layout>
      <div className="home-page">
        {!auth.isAuthenticated ? (
          <LandingPage />
        ) : (
          <div>
          <Dashboard />
          </div>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps))(Home);
