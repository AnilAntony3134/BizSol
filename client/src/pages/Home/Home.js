import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Layout from '../../layout/Layout';
import MessageList from '../../components/MessageList/MessageList';
import MessageForm from '../../components/MessageForm/MessageForm';
import { reseedDatabase } from '../../store/actions/authActions';
import {MdOutlineEmojiFlags} from 'react-icons/md'
import {HiUsers} from 'react-icons/hi'
import {BsShieldFillCheck} from 'react-icons/bs'


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
  const [isaddMessage, setIsAddMessage] = useState(false);

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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Dash<span style={{color: '#4040d4'}}>Board</span></h1>
                {
                  auth.me.organisation && (
                    <button className='submitbtn' style={{ width: '200px' }} onClick={() => setIsAddMessage(!isaddMessage)}>{isaddMessage ? 'Hide Write Message' : 'New Issue'}</button>
                  )
                }
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  Welcome <span className="name">{auth.me.name}</span>!
                </div>
              </div>
            </>
            {/* <ReseedMessage handleReseed={handleReseed} /> */}
            {
              isaddMessage && (
                <MessageForm setAddMessage={setIsAddMessage} />
              )
            }
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
              <div className='card_intro_wrapper' style={{backgroundColor: 'rgb(83, 1, 190)'}}>
                <div style={{fontSize: '2.1rem'}}><MdOutlineEmojiFlags width="20px"/></div> 
                <p>Current Issues</p>
                <h2>21</h2>
              </div>
              <div className='card_intro_wrapper' style={{backgroundColor: 'rgb(141, 10, 141)'}}>
                <div style={{fontSize: '2.1rem'}}>
                  <BsShieldFillCheck />
                  </div> 
                <p>Solved Issues</p>
                <h2>30</h2>
              </div>
              <div className='card_intro_wrapper'>
                <div style={{fontSize: '2.1rem'}}>
                  <HiUsers />
                  </div>
                <p>Total Users</p>
                <h2>12</h2>
              </div>
            </div>
            <h1 style={{marginTop: '100px'}}><span style={{color: '#4040d4'}}>Avaialble</span> Problems</h1>
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
