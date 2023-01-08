import React from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';

import { addMessage } from '../../store/actions/messageActions';
import { addSolution } from '../../store/actions/solutionActions';
import { messageFormSchema } from './validation';

import './styles.css';

const MessageForm = ({ addMessage, addSolution, message: { messages }, setAddMessage, isSolution, messageId, auth: { me } }) => {
  const formik = useFormik({
    initialValues: {
      text: '',
      ...(!isSolution && {
        incentive: 0,
        category: 'other',
      }),
    },
    validationSchema: messageFormSchema,
    onSubmit: (values, { resetForm }) => {
      isSolution ? addSolution({ solution: values.text, message: messageId, organisation: messages.find(e => e.id === messageId)?.user?.id, user: me.id }) : addMessage({ text: values.text, incentive: values.incentive, category: values.category });
      resetForm();
      setAddMessage(false);
    },
  });
  
  // console.log(formik.values);
  const isSubmiting = messages.some((m) => m.id === 0);

  return (
    <div className="message-form">
      <h2>{!isSolution ? "Write your Issue" : "Share your solution"}</h2>
      <form onSubmit={formik.handleSubmit}>
        <p>Describe your problem in brief</p>
        <textarea
          name="text"
          cols="30"
          rows="10"
          placeholder={!isSolution ? "Write your problem, what kind of help are you expecting etc" : "Share your solution"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.text}
          disabled={isSubmiting}
        />
        {
          !isSolution && (
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
          )
        }

        {formik.touched.text && formik.errors.text ? (
          <p className="error">{formik.errors.text}</p>
        ) : null}
        <div style={{ display: 'flex', justifyContent: 'center' }}>

          <input type="submit" className="submitbtn" style={{ width: "50%", alignSelf: 'center' }} value={!isSolution ? "Add Issue" : "Share solution"} disabled={isSubmiting} />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
  auth: state.auth,
});

export default connect(mapStateToProps, { addMessage, addSolution })(MessageForm);
