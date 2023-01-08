import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useFormik } from 'formik';
import { deleteMessage, editMessage, clearMessageError } from '../../store/actions/messageActions';
import { messageFormSchema } from './validation';
import './styles.css';
import MessageForm from '../MessageForm/MessageForm';
import Solutionlist from '../Solutions/Solutionlist';


const Message = ({ message, auth, deleteMessage, editMessage, clearMessageError }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSolution, setOpenSolution] = useState(false);


  const handleDelete = (e, id) => {
    e.preventDefault();
    if (!isEdit) {
      deleteMessage(id);
    }
  };

  const handleClickEdit = (e) => {
    e.preventDefault();
    formik.setFieldValue('text', message.text);
    formik.setFieldValue('incentive', message.incentive);
    formik.setFieldValue('category', message.category);
    setIsEdit((oldIsEdit) => !oldIsEdit);
  };

  const handleClose = () => setOpenModal(false)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      text: '',
      id: message.id,
      incentive: 0,
      category: ''
    },
    validationSchema: messageFormSchema,
    onSubmit: (values, { resetForm }) => {
      editMessage(values.id, { text: values.text, incentive: values.incentive, category: values.category });
      setIsEdit(false);
      // resetForm();
    },
  });

  // dont reset form if there is an error
  useEffect(() => {
    if (!message.error && !message.isLoading) formik.resetForm();
  }, [message.error, message.isLoading]);

  // keep edit open if there is an error
  useEffect(() => {
    if (message.error) setIsEdit(true);
  }, [message.error]);

  return (
    <div className={message.isLoading ? 'message loader' : 'message'}>

      <form onSubmit={formik.handleSubmit}>
        {isEdit ? (
          <>
            <textarea
              name="text"
              rows="3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
              disabled={message.isLoading}
            />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <p>Incentive (₹)</p>
                <input
                  type='number'
                  name="incentive"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.number}
                  style={{ marginBottom: '25px' }}
                />
              </div>
              <div>
                <p>category</p>
                <select
                  style={{ padding: '10px', width: '200px' }}
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="select">Select</option>
                  <option label="technical" value="technical">Technical</option>
                  <option label="management" value="management">Management</option>
                  <option label="writing" value="writing">Writing</option>
                  <option label="creativethinking" value="creativethinking">Creative thinking</option>
                  <option label="supplychain" value="supplychain">Supply chain</option>
                  <option label="resources" value="resources">Resources</option>
                  <option label="networking" value="networking">Networking</option>
                  <option label="other" value="other">Other</option>
                </select>
              </div>
            </div>
            <input type="hidden" name="id" />
            {(formik.touched.text && formik.errors.text) || message.error ? (
              <p className="error">{formik.errors.text || message.error}</p>
            ) : null}

          </>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h2 style={{maxWidth: '70%'}}>{message.text.substring(0, 100)}</h2>
              <p>{message.incentive ? `₹ ${message.incentive}` : 'undisclosed'}</p>
            </div>
            <p>{message.category}</p>
          </>
        )}
        <div className="message-header">
          <Link to={`/${message.user.username}`}>
            {/* <img src={message.user.avatar} className="avatar" /> */}
          </Link>
          <div>
            <Link to={`/${message.user.username}`} className="name" style={{ textDecoration: "none", color: "#4040d4" }}>
              {message.user.name}
            </Link>
            <span className="time text-light">{moment(message.createdAt).fromNow()}</span>
          </div>
        </div>
        {
          !auth.me.organisation?.flag && (
            <>
              <button onClick={() => { setOpenModal(!openModal) }} type="button" className="btn" style={{ backgroundColor: '#4040d4', color: 'white', cursor: 'pointer' }}>
                Give Solution
              </button>
            </>
          )
        }
        {auth.isAuthenticated && (auth.me.id === message.user.id || auth.me.role === 'ADMIN') && (
          <>
            {!isEdit ? (
              <>
                <button onClick={() => setOpenSolution(!openSolution)} type="button" className="btn" style={{ backgroundColor: 'green', color: 'white', cursor: 'pointer' }}>
                  Submissions 
                </button>
                <button onClick={handleClickEdit} type="button" className="btn" style={{ backgroundColor: '#4040d4', color: 'white', cursor: 'pointer' }}>
                  Edit
                </button>
                <button onClick={(e) => handleDelete(e, message.id)} type="button" className="btn" style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>
                  Delete
                </button>
              </>
            ) : (
              <>
                <button type="submit" className="btn" disabled={message.isLoading}>
                  Submit
                </button>
                <button
                  onClick={() => {
                    setIsEdit((oldIsEdit) => !oldIsEdit);
                    clearMessageError(message.id);
                  }}
                  type="button"
                  className="btn"
                >
                  Cancel
                </button>

              </>
            )}
          </>
        )}

        { }
      </form>

      {
        openModal && (
          <MessageForm setAddMessage={setOpenModal} isSolution={true} messageId={message.id} />
        )
      }

      {
        openSolution && (
          <Solutionlist orgSolution={message.id}/>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteMessage, editMessage, clearMessageError })(Message);
