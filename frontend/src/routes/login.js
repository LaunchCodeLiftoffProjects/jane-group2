import React, {
    useState
} from 'react';
import { Container } from 'react-bootstrap';
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

    console.log('coming to login page from: ' + from);

    return (
        <div>
            <Container>
                <h1>Login</h1>
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
                        <Form>
                            <div className="form-auth-group">
                                <label htmlFor="username">Username</label>
                                <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name="username" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-auth-group">
                                <label htmlFor="password">Password</label>
                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-auth-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                />
                <p>Don't already have an account? <Link to="/register">Register here!</Link></p>
                <Link to="/">Back to home page</Link>
            </Container>
        </div>


    );
}