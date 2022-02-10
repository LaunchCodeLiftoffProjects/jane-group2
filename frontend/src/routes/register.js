import React from 'react';
import { authService } from '../services/auth';
import {
    Link,
    useNavigate
} from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import '../App.css';

export default function Register() {
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center">
            <div className="card border-dark border-3 p-0 w-25 mt-5">
                <h1 className="card-header border-dark border-3 display-3 m-0" id="form-header">Register</h1>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .required('Email is required.')
                            .email('Must be a valid email.'),
                        username: Yup.string()
                            .required('Username is required.')
                            .min(4, 'Username is too short, should be 4 characters minimum.'),
                        password: Yup.string()
                            .required('Password is required.')
                            .min(4, 'Password is too short, should be 4 characters minimum.'),
                        verifyPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
                    })}
                    onSubmit={({ email, username, password, verifyPassword }, { setStatus, setSubmitting }) => {
                        setStatus();

                        console.log('user: ' + username);
                        console.log('pass: ' + password);

                        authService.register(email, username, password, verifyPassword).then(
                            _ => {
                                navigate('/login', { replace: true });
                            },
                            failure => {
                                setSubmitting(false);
                                setStatus(failure);
                            }
                        );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form className="card-body">

                            <div className="form-auth-group text-start px-5">
                                <label className="lead" htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-auth-group text-start px-5">
                                <label className="lead" htmlFor="username">Username</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-auth-group text-start px-5">
                                <label className="lead" htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-auth-group text-start px-5">
                                <label className="lead" htmlFor="verifyPassword">Verify Password</label>
                                <Field name="verifyPassword" type="password" className={'form-control' + (errors.verifyPassword && touched.verifyPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="verifyPassword" component="div" className="invalid-feedback" />
                            </div>

                            <div className="form-auth-group">
                                <button type="submit" className="btn btn-dark btn-lg" disabled={isSubmitting}>Submit</button>
                            </div>

                            <div className="form-auth-group">
                                {status &&
                                    <div className={'alert alert-danger'}>{status}</div>
                                }
                            </div>

                        </Form>
                    )}
                />
                <div className="card-footer border-dark border-3">
                    <p className="mb-0">Already have an account? <Link to="/login">Login here!</Link></p>
                    <Link to="/">Back to home page</Link>
                </div>

            </div>
        </div>
    );
}