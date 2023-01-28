import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '@material-ui/core/Modal';

import { deleteSolution, editSolution, clearSolutionError } from '../../store/actions/solutionActions';
import './styles.css';
import { Avatar, Button, Grid, Input, Spacer, Text, Textarea } from '@nextui-org/react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const Solution = ({ solution, auth, user, deleteSolution, editSolution, clearSolutionError, shortlist, winnerList }) => {
    const notify = () => toast('Here is your toast.');
    const [isEdit, setIsEdit] = useState(false);
    const [readMore, setReadmore] = useState(false);
    const handleDelete = (e, id) => {
        e.preventDefault();
        if (!window.confirm('Are you sure to delete?')) return;
        if (!isEdit) {
            deleteSolution(id);
            window.location.reload();
        }
    };

    const handleClickEdit = (e) => {
        e.preventDefault();
        formik.setFieldValue('title', solution.title);
        formik.setFieldValue('text', solution.solution);
        setIsEdit((oldIsEdit) => !oldIsEdit);
    };

    const handleShortlist = (e) => {
        e.preventDefault();
        if (!window.confirm(`Confirm ${solution.shortlisted ? 'remove shortlist' : 'shortlist'}?`)) return;
        const { id } = solution
        editSolution(solution.id, { title: solution.title, solution: solution.solution, message: solution.message, organisation: solution.organisation, user: solution.user.id, shortlisted: !solution.shortlisted, selected: solution.selected });
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: solution.id,
            title: solution.title,
            text: solution.solution,
        },
        onSubmit: (values, { resetForm }) => {
            editSolution(values.id, { title: values.title, solution: values.text, message: solution.message, organisation: solution.organisation, user: solution.user.id });
            setIsEdit(false);
            notify()
            // resetForm();
        },
    });

    // dont reset form if there is an error
    useEffect(() => {
        if (!solution.error && !solution.isLoading) formik.resetForm();
    }, [solution.error, solution.isLoading]);

    // keep edit open if there is an error
    useEffect(() => {
        if (solution.error) setIsEdit(true);
    }, [solution.error]);

    return (
        <div className={solution.isLoading ? 'solution loader' : 'solution'} style={{ borderBottom: '1px solid black', paddingBottom: '40px' }}>

            <form onSubmit={formik.handleSubmit}>
                {isEdit ? (
                    <>
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
                            fullWidth
                            bordered
                            name="text"
                            minRows={30}
                            maxRows={60}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.text}
                            disabled={solution.isLoading}
                        />
                        <input type="hidden" name="id" />
                        {(formik.touched.text && formik.errors.text) || solution.error ? (
                            <p className="error">{formik.errors.text || solution.error}</p>
                        ) : null}
                        <Spacer y={1}/>

                    </>
                ) : (
                    <>
                        <h2>{solution.title}</h2>
                        {
                            !shortlist && (
                                <>
                                    <ReactMarkdown>{readMore ? solution.solution : solution.solution.substring(0, 100)}</ReactMarkdown>
                                    <span onClick={() => setReadmore(prev => !prev)} style={{cursor: 'pointer'}}>{readMore ? 'Showless' : 'Read More'}</span>
                                </>
                            )
                        }

                        <p>{solution.category}</p>
                    </>
                )}
                <div style={{ display: 'flex', marginTop: '-25px', justifyContent: 'flex-start' }}>
                    <Grid css={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            size='md'
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            color="primary"
                            bordered
                            squared
                        />
                    </Grid>
                    <Grid>
                        <p color='primary' size='$xl' weight="bold" style={{
                            color: 'var(--main)', fontWeight: '600', fontSize: '1.2rem', marginLeft: '10px', padding: '0'
                        }}>{solution.user?.name}</p>
                        <p color='primary' style={{ marginLeft: '10px', padding: '0', marginTop: '-15px' }}>{moment(solution.createdAt).fromNow()}</p>
                    </Grid>
                </div>
                {auth.isAuthenticated && (auth.me.id === solution.user.id || auth.me.role === 'ADMIN') && !winnerList && !solution.selected && (
                    <>
                        {!isEdit ? (
                            <>
                                <button onClick={handleClickEdit} type="button" className="btn" style={{ backgroundColor: '#4040d4', color: 'white', cursor: 'pointer' }}>
                                    Edit
                                </button>
                                <button onClick={(e) => handleDelete(e, solution.id)} type="button" className="btn" style={{ backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>
                                    Delete
                                </button>
                            </>
                        ) : (
                            <>
                                <button type="submit" className="btn" disabled={solution.isLoading} style={{ backgroundColor: '#4040d4', color: 'white', cursor: 'pointer' }}>
                                    Submit
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEdit((oldIsEdit) => !oldIsEdit);
                                        clearSolutionError(solution.id);
                                    }}
                                    type="button"
                                    className="btn"
                                    style={{ backgroundColor: 'orange', color: 'white', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                            </>
                        )}


                    </>
                )}
                {
                    auth?.me.organisation?.flag && !winnerList && (
                        <button className="btn" disabled={solution.isLoading} onClick={(e) => handleShortlist(e)} style={{ backgroundColor: '#4040d4', color: 'white', cursor: 'pointer' }}>
                            {solution.shortlisted ? 'Deshorlist' : 'Shortlist'}
                        </button>
                    )
                }


            </form>
        </div>

    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
});

export default connect(mapStateToProps, { deleteSolution, editSolution, clearSolutionError })(Solution);
