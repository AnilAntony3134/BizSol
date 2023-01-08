import React, { useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import {HiOutlineOfficeBuilding} from 'react-icons/hi';
import {BsFillPersonFill} from 'react-icons/bs';

import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { useFormik } from 'formik';

import { registerUserWithEmail } from '../../store/actions/registerActions';
import { registerSchema } from './validation';
import './styles.css';

const Register = ({ auth, register: { isLoading, error }, history, registerUserWithEmail }) => {
  const [isOrg, setIsOrg] = useState(true);
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      description: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      if(isOrg) {
        values.organisation = {};
        values.organisation.name = values.name;
        values.organisation.flag = true;
        values.organisation.description = values.description;
        delete values.description;
      } 
      else{
        values.organisation = {};
        values.organisation.flag = false;
        delete values.description;
      }
      registerUserWithEmail(values, history);
    },
  });

  if (auth.isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="register">
      <div className="formcontainer">
        <h1><span className="formTitle">Biz</span>Hub</h1>
        <p>An amazing platform which bring businesses and problemsolvers under the same umbrella</p>
        <p>
          back to{' '}
          <Link className="bold" to="/">
            Home page
          </Link>
        </p>
        <form onSubmit={formik.handleSubmit} noValidate>
          <h2>Create new account</h2>
          <div>
            <div style={{width: '100%', display: 'flex', justifyContent:'space-around'}}>
              <span className={`organisation-selector ${isOrg ? 'active' : ''}`} onClick={()=> setIsOrg(true)}><HiOutlineOfficeBuilding/> Organisation</span>
              <span className={`organisation-selector ${isOrg ? '' : 'active'}`} onClick={()=> setIsOrg(false)}><BsFillPersonFill/> Individual</span>
            </div>
            <input
              placeholder={!isOrg ? 'Name' : 'Organization Name'}
              name="name"
              className=""
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="error">{formik.errors.name}</p>
            ) : null}
            <input
              placeholder={!isOrg ? 'Username' : 'Organization Id'}
              name="username"
              className=""
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="error">{formik.errors.username}</p>
            ) : null}
            <input
              placeholder="Email address"
              name="email"
              className=""
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="error">{formik.errors.email}</p>
            ) : null}
            <input
              placeholder="Password"
              name="password"
              className=""
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : null}
          </div>
          {isOrg && (<textarea
              placeholder='Organization Description'
              name="description"
              style={{height: '200px'}}
              type="textarea"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            >
              </textarea>
           )}
          {error && <p className="error">{error}</p>}
          <div>
            <button className="submitbtn" type="submit" disabled={isLoading || !formik.isValid}>
              Sign up now
            </button>
          </div>
          <div>
            Have an account?{' '}
            <Link className="bold" to="/login">
              Log In
            </Link>
          </div>
        </form>
      </div>
      <div className='imgcontainer'>
        <img width='400px' style={{padding: '50px'}} src= {isOrg ?'/assets/signup.png' : '/assets/whyinfo.png'}/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  register: state.register,
});

export default compose(withRouter, connect(mapStateToProps, { registerUserWithEmail }))(Register);
