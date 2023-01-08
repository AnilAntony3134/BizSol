import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useFormik } from 'formik';
import Modal from '@material-ui/core/Modal';

import { deleteSolution, editSolution, clearSolutionError } from '../../store/actions/solutionActions';

import './styles.css';

const Solution = ({ solution, auth, deleteSolution, editSolution, clearSolutionError, openSolmodel }) => {
    console.log(solution, 'heheye')
    const [isEdit, setIsEdit] = useState(false);

    const handleDelete = (e, id) => {
        e.preventDefault();
        if (!isEdit) {
            deleteSolution(id);
        }
    };

    const handleClickEdit = (e) => {
        e.preventDefault();
        formik.setFieldValue('solution', solution.solution);
        setIsEdit((oldIsEdit) => !oldIsEdit);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            solution: '',
        },
        onSubmit: (values, { resetForm }) => {
            editSolution(values.id, { solution: values.text, message: solution.message, organisation: solution.organisation, user: solution.user });
            setIsEdit(false);
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
        <div className={solution.isLoading ? 'solution loader' : 'solution'}>

            <form onSubmit={formik.handleSubmit}>
                {isEdit ? (
                    <>
                        <textarea
                            name="text"
                            rows="3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.text}
                            disabled={solution.isLoading}
                        />
                        <input type="hidden" name="id" />
                        {(formik.touched.text && formik.errors.text) || solution.error ? (
                            <p className="error">{formik.errors.text || solution.error}</p>
                        ) : null}

                    </>
                ) : (
                    <>
                        <h2>{solution.solution.substring(0, 100)}</h2>
                        <p>{solution.category}</p>
                    </>
                )}
                <div className="solution-header">
                    <Link to={`/${solution.user.username}`}>
                        {/* <img src={solution.user.avatar} className="avatar" /> */}
                    </Link>
                    <div>
                        <Link to={`/${solution.user.username}`} className="name" style={{ textDecoration: "none", color: "#4040d4" }}>
                            {solution.user.name}
                        </Link>
                        <span className="time text-light">{moment(solution.createdAt).fromNow()}</span>
                    </div>
                </div>
                {auth.isAuthenticated && (auth.me.id === solution.user.id || auth.me.role === 'ADMIN') && (
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
                                <button type="submit" className="btn" disabled={solution.isLoading}>
                                    Submit
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEdit((oldIsEdit) => !oldIsEdit);
                                        clearSolutionError(solution.id);
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
            </form>
        </div>

    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { deleteSolution, editSolution, clearSolutionError })(Solution);
