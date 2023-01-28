import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, useFormik } from 'formik';
import { addMessage, editMessage } from '../../store/actions/messageActions';
import { updateUserPreferences } from '../../store/actions/usersActions';
import { addSolution } from '../../store/actions/solutionActions';
import { messageFormSchema } from './validation';
import './styles.css';
import { Button, Checkbox, Input, Modal, Radio, Row, Spacer, Text, Textarea } from '@nextui-org/react';
import { Categories } from '../../constants';

const MessageForm = ({ addMessage, message: { messages }, isSolution, auth: { me }, updateUserPreferences, closeHandler, isEdit }) => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectPublic, setselectedPublic] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: '',
      text: '',
      incentive: 0,
      category: [],
      difficulty: '',
      isPublic: true,
    },
    validationSchema: messageFormSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('is this getting triggered')
      isEdit ? editMessage({ title: values.title, text: values.text, difficulty: selectedDifficulty, public: selectPublic, incentive: values.incentive, category: selected }) : addMessage({ title: values.title, text: values.text, difficulty: selectedDifficulty, public: selectPublic, incentive: values.incentive, category: selected });
      updateUserPreferences(me.id, { name: me.name, username: me.username, avatarpath: me.avatarpath, preferences: me.preferences, additionalInfo: me.additionalInfo, slots: parseInt(me.slots)-1});
      resetForm();
      closeHandler();
    },
  });
  
  console.log('yeyeyey', me.slots-1)
  // console.log(typeof(me.slots),'slslsls')
  const isSubmiting = messages.some((m) => m.id === 0);

  return (
    <div className="message-form">
      {/* <h2>{!isSolution ? "Write your Issue" : "Share your solution"}</h2> */}
      <form onSubmit={formik.handleSubmit}>
        {
          page === 1 && (
            <>
              <h2>Write your Issue</h2>
              <Spacer y={2} />
              <Input
                clearable
                labelPlaceholder='Title'
                type='text'
                name="title"
                bordered
                fullWidth
                color="primary"
                size="lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                style={{ marginBottom: '25px', marginTop: '1rem' }}
              />
              <Spacer y={1} />
              <Textarea
                name="text"
                minRows={20}
                maxRows={30}
                fullWidth
                label="Describe the requirement in brief (Supports Markdown)"
                placeholder={!isSolution ? "Write your problem, what kind of help are you expecting etc Supports Markdown" : "Share your solution"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.text}
                disabled={isSubmiting}
              />
            </>
          )
        }

        {
          page === 2 && (
            <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>

              <Spacer y={2} />
              <Input
                clearable
                label='Incentive (₹)'
                type='number'
                name="incentive"
                bordered
                fullWidth
                color="primary"
                size="lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.incentive}
                helperText={(new Intl.NumberFormat('en-us', {
                  style: 'currency',
                  currency: 'INR',
                })).format(formik.values.incentive)}
                style={{ marginBottom: '25px', marginTop: '1rem' }}
              />
              <Spacer y={3} />
              <Row>
                {/* <Spacer y={1}/> */}
                <Radio.Group label="Difficulty Of the problem" orientation="horizontal" value={selectedDifficulty} onChange={setSelectedDifficulty}>
                  <Radio value="easy" description="For Anyone Interested">
                    Easy
                  </Radio>
                  <Radio value="medium" description="People from the field">
                    Medium
                  </Radio>
                  <Radio value="hard" description="Field Experts">
                    Hard
                  </Radio>
                </Radio.Group>
              </Row>
              <Spacer y={2} />
              <Row>
                <Radio.Group label="Should Answers be public" orientation="horizontal" value={selectPublic} onChange={setselectedPublic}>
                  <Radio value={false}>
                    no
                  </Radio>
                  <Radio value={true}>
                    Yes
                  </Radio>
                </Radio.Group>
              </Row>
              <Spacer y={2} />
            </div>
          )
        }

        {
          page === 3 && (
            <>
              <Checkbox.Group
                label="Fields"
                color="secondary"
                value={selected}
                onChange={setSelected}
              >
                {Categories.map(e => (
                  <Checkbox key={e.id} value={e.value} onChange={() => formik.values.category = selected}>{e.name}</Checkbox>
                ))}
              </Checkbox.Group>
            </>
          )
        }

        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto flat color="warning" onPress={() => setPage(page - 1)} disabled={page === 1}>
            Back
          </Button>

          <Button auto onClick={() => {
            setPage(page + 1)
          }
          } css={{ display: page === 3 ? 'none' : 'block' }}>
            Next
          </Button>


          <Button type='submit' auto color="success" css={{ display: page !== 3 ? 'none' : 'block' }}>
            Submit
          </Button>

        </Modal.Footer>

        {formik.touched.text && formik.errors.text ? (
          <p className="error">{formik.errors.text}</p>
        ) : null}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* <input type="submit" className="submitbtn" style={{ width: "50%", alignSelf: 'center' }} value={!isSolution ? "Add Issue" : "Share solution"} disabled={isSubmiting} /> */}
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
  auth: state.auth,
});

export default connect(mapStateToProps, { addMessage, addSolution, updateUserPreferences })(MessageForm);
