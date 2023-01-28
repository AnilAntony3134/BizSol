import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { addMessage } from '../../store/actions/messageActions';
import { addSolution } from '../../store/actions/solutionActions';
import { solutionFormSchema } from './validation';
import './styles.css';
import { Button,  Input, Spacer, Textarea } from '@nextui-org/react';
import toast, { Toaster } from 'react-hot-toast';

const SolutionForm = ({ addMessage, addSolution, message: { messages }, setAddMessage, isSolution, messageId, auth: { me }, setTab }) => {
  const notify = () => toast.success('Successfully Posted Your Answer');
  const formik = useFormik({
    initialValues: {
      title: '',
      text: '',
    },
    validationSchema: solutionFormSchema,
    onSubmit: (values, { resetForm }) => {
      addSolution({title: values.title, solution: values.text, message: messageId, organisation: messages.find(e => e.id === messageId)?.user?.id, user: me.id });
      notify()
      resetForm();
      setAddMessage(false);
      setTab(1);
    },
  });

  const [page, setPage] = useState(1);

  const isSubmiting = messages.some((m) => m.id === 0);

  return (
    <div className="solution-form">
      <h2>Share your solution</h2>
      <Toaster/>
      <form onSubmit={formik.handleSubmit}>
        <>
          <Spacer y={2} />
          <Input
            clearable
            labelPlaceholder='Solution Title'
            type='text'
            name="title"
            bordered
            fullWidth
            color="primary"
            // size="lg"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            style={{ marginBottom: '25px', marginTop: '1rem' }}
          />
          <Spacer y={1} />
        </>
        <Textarea
          name="text"
          minRows={30}
          maxRows={60}
          fullWidth
          bordered
          label="Describe your solution in brief (Supports Markdown)"
          placeholder={!isSolution ? "Write your problem, what kind of help are you expecting etc Supports Markdown" : "Share your solution"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.text}
          disabled={isSubmiting}
        />
        {formik.touched.text && formik.errors.text ? (
          <p className="error">{formik.errors.text}</p>
        ) : null}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button type='submit' auto disabled={isSubmiting}>
              Submit
            </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.message,
  auth: state.auth,
});

export default connect(mapStateToProps, { addMessage, addSolution })(SolutionForm);
