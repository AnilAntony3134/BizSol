import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

import { useFormik } from 'formik';

import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { loginUserWithEmail } from '../../store/actions/authActions';
import { FACEBOOK_AUTH_LINK, GOOGLE_AUTH_LINK } from '../../constants';
import { loginSchema } from './validation';
import './styles.css';
import { toast } from 'react-hot-toast';

const Login = ({ auth, history, loginUserWithEmail }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginUserWithEmail(values, history);
      toast.success("Welcome back")
    },
  });

  if (auth.isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="login">
      
      <div className="container-login">
        <img width="700px" src='/assets/login.png' />
      </div>
      <div className="formcontainer" style={{marginLeft: '30px'}}>
      <h1><span className="formTitle">Biz</span>Hub</h1>
        <p>An amazing platform which bring businesses and problemsolvers under the same umbrella</p>
         <p> back to{' '}
          <Link className="bold" to="/">
            Home page
          </Link>
        </p>
        <form onSubmit={formik.handleSubmit}>
          {/* <h2>Log in with social media</h2>
          <a className="fb btn" href={FACEBOOK_AUTH_LINK}>
            <span className="login-text">
              <i className="fa fa-facebook fa-fw" /> Login with Facebook
            </span>
          </a>
          <a className="google btn" href={GOOGLE_AUTH_LINK}>
            <span className="login-text">
              <i className="fa fa-google fa-fw" /> Login with Google
            </span>
          </a> */}
          {/* <p className="logins">Admin: email0@email.com 123456789</p> */}
          {/* <p className="logins">User: email1@email.com 123456789</p> */}
          <div>
          <p className="logins">Email</p>
            <input
              placeholder="Email address"
              name="email"
              className="text"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="error">{formik.errors.email}</p>
            ) : null}
          <p className="logins">Password</p>
            <input
              placeholder="Password"
              name="password"
              type="password"
              className="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : null}
          </div>
          {auth.error && <p className="error">{auth.error}</p>}
          <div>
            <button
              className="submitbtn"
              disabled={auth.isLoading || !formik.isValid}
              type="submit"
            >
              Log in now
            </button>
          </div>
          <div>
            Don't have an account?{' '}
            <Link className="bold" to="/register">
              Register
            </Link>
          </div>
        </form>
      </div>

    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(withRouter, connect(mapStateToProps, { loginUserWithEmail }))(Login);
