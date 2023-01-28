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
import { Badge, Button, Checkbox, Input, Modal, Radio, Row, Spacer, Text, Textarea } from '@nextui-org/react';
import { Categories } from '../../constants';
import ReactMarkdown from 'react-markdown'


const Message = ({ message, auth, deleteMessage, editMessage, clearMessageError }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openSolution, setOpenSolution] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectPublic, setselectedPublic] = useState(true);

  const handleDelete = (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (!window.confirm("Are you sure you want to delete?")) return;
    if (!isEdit) {
      deleteMessage(id);
    }
  };

  const handleClickEdit = (e) => {
    e.preventDefault();
    formik.setFieldValue('title', message.title);
    formik.setFieldValue('text', message.text);
    formik.setFieldValue('incentive', message.incentive);
    setSelected(message.category);
    setSelectedDifficulty(message.difficulty);
    setselectedPublic(message.public);
    setIsEdit((oldIsEdit) => !oldIsEdit);
  };

  const handleClose = () => setOpenModal(false)
  const closeHandler = () => setIsEdit(false);


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
      editMessage(values.id, { title: values.title, text: values.text, incentive: values.incentive, category: selected, public: selectPublic, difficulty: selectedDifficulty });
      closeHandler();
      setPage(1);
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

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={isEdit}
        onClose={closeHandler}
        width="40vw"
        css={{ padding: '20px 40px' }}
      >
        <form onSubmit={formik.handleSubmit}>
          <>
            <Modal.Header>
              <Text id="modal-title" size={18}>
                <span>Edit</span>
                <Text b size={18} style={{ color: 'var(--text' }}>
                  Thread
                </Text>
              </Text>
            </Modal.Header>
            <Spacer y={1} />
            <h2 style={{ textAlign: 'left', marginBottom: '10px' }}>Modify your Thread</h2>
            <Spacer y={1} />

            {
              page === 1 && (
                <>
                  <Spacer y={1} />

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
                    clearable
                    minRows={20}
                    maxRows={30}
                    name="text"
                    fullWidth
                    label="Describe the requirement in brief (Supports Markdown)"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.text}
                  // disabled={message.isLoading}
                  />
                  <input type="hidden" name="id" />
                  {(formik.touched.text && formik.errors.text) || message.error ? (
                    <p className="error">{formik.errors.text || message.error}</p>
                  ) : null}
                </>

              )}

            {
              page === 2 && (
                <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', textAlign: 'left' }}>

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
                  <Row justify="start">
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
                  <Row justify="start">
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
                  <input type="hidden" name="id" />
                  {(formik.touched.text && formik.errors.text) || message.error ? (
                    <p className="error">{formik.errors.text || message.error}</p>
                  ) : null}
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


              <Button type='submit' auto color="success" disabled={message.isLoading} css={{ display: page !== 3 ? 'none' : 'block' }}>
                Submit
              </Button>

            </Modal.Footer>

          </>
        </form>
      </Modal>


      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ maxWidth: '70%' }}>{message?.title?.substring(0, 100)}</h2>
          <h3>{message.incentive ? `₹ ${message.incentive}` : 'undisclosed'}</h3>
        </div>
        <ReactMarkdown>
          {`${message.text.substring(0, 150)} .....`}
        </ReactMarkdown>
        {/* <Spacer y={1}/> */}
        {
          message?.category?.map(e => (
            <Badge size='sm' color='primary' variant="flat" style={{ border: '0', cursor: 'pointer', margin: '10px 10px 10px 0px', padding: '8px' }}>{e}</Badge>
          ))
        }
      </>

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
      <>
        <Link to={`/message/${message.id}`}>
          <div className="btn" style={{ backgroundColor: '#4040d4', color: 'white', cursor: 'pointer' }}>
            {auth.me.organisation.flag ? 'Preview' : 'Give Solution'}
          </div>
        </Link>
      </>
      {auth.isAuthenticated && (auth.me.id === message.user.id || auth.me.role === 'ADMIN') && (
        <>
          {!isEdit && (
            <>
              <button onClick={handleClickEdit} type="button" className="btn" style={{ backgroundColor: '#4040d4', color: 'white', cursor: 'pointer' }}>
                Edit
              </button>
              <button onClick={(e) => handleDelete(e, message.id)} type="button" className="btn" style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>
                Delete
              </button>
            </>
          )
          }
        </>
      )}

      {
        openModal && (
          <MessageForm setAddMessage={setOpenModal} isSolution={true} messageId={message.id} />
        )
      }

      {
        openSolution && (
          <Solutionlist orgSolution={message.id} />
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteMessage, editMessage, clearMessageError })(Message);
