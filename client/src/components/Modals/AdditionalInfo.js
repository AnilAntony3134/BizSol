import { Button, Checkbox, Input, Modal, Spacer, Textarea } from '@nextui-org/react';
import { Field, FieldArray, Form, useFormik } from 'formik';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { updateUserPreferences } from '../../store/actions/usersActions';
const PreferencesModal = ({ updateUserPreferences, auth: { me }, closeHandler, setDisplayForm, displayForm, isEdit }) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            education: '',
            workExperience: '',
            twitter: '',
            linkedIn: '',
            other: '',
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values)
            updateUserPreferences(me.id, {preferences: me.preferences, additionalInfo: values});
            setDisplayForm({...displayForm, form2: false})
            resetForm()
            closeHandler()
        },
    });

    return (
        <div style={{ height: '100%' }}>
            <Modal.Header>
                <h1>Select your preferred Fields</h1>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <Textarea
                        clearable
                        minRows={20}
                        maxRows={30}
                        fullWidth
                        label="Describe your education in brief (Supports Markdown)"
                        name='education'
                        onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        value={formik.values.education}
                    // disabled={message.isLoading}
                    />
                    <Spacer y={2}/>
                    <Textarea
                        clearable
                        minRows={20}
                        maxRows={30}
                        name="workExperience"
                        fullWidth
                        label="Describe your work experience in brief (Supports Markdown)"
                        onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        value={formik.values.workExperience}
                    // disabled={message.isLoading}
                    />
                    <Spacer y={1}/>
                    <Input 
                    name="twitter"
                    fullWidth
                    label="Twitter"
                    clearable
                    value={formik.values.twitter}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <Spacer y={1}/>

                    <Input 
                    name="linkedIn"
                    fullWidth
                    label="linkedIn"
                    clearable
                    value={formik.values.linkedIn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <Spacer y={1}/>

                    <Input 
                    name="other"
                    fullWidth
                    label="Other Portfolios"
                    clearable
                    value={formik.values.other}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    <Spacer y={1}/>


                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button type='submit'>Submit</Button>

                    </div>
                </form>

            </Modal.Body>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { updateUserPreferences })(PreferencesModal);
