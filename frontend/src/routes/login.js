import React from 'react';
import { authService } from '../services/auth';
import {
    Link,
    useNavigate,
    useLocation,
} from "react-router-dom";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import '../App.css';

export default function Login() {

    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    return (
        <div className="d-flex justify-content-center">
            <div className="card border-3 border-dark p-0 w-25 mt-5">
                <h1 className="card-header border-dark border-3 display-3 m-0" id="form-header">Login</h1>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required('Username is required'),
                        password: Yup.string().required('Password is required'),
                    })}
                    onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                        setStatus();

                        authService.login(username, password).then(
                            _ => {
                                navigate(from, { replace: true }); // Send them back to the page they tried to visit when they were redirected to the login page.
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
                                <label className="lead" htmlFor="username">Username</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-auth-group text-start px-5">
                                <label className="lead" htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-auth-group">
                                <button type="submit" className="btn btn-dark btn-lg" disabled={isSubmitting}>Submit</button>
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                />

                <div className="card-footer border-dark border-3">
                    <p className="mb-0">Don't already have an account? <Link to="/register">Register</Link></p>
                    <Link to="/">Back to home page</Link>
                </div>
            </div>
        </div>


    );
}