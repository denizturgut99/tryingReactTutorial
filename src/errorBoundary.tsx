// mostly code from react.js.org/docs/error-boundaries.html

import React, { ErrorInfo } from 'react';
import { Link, Redirect } from '@reach/router';

class ErrorBoundary extends React.Component {
    public state = { hasError: false, redirect: false };

    // gets called whenever there is an error
    public static getDerivedStateFromError() {
        return { hasError: true };
    }
    public componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary caught an error', error, info);
    }
    // this will run when it receives new state or new props
    public componentDidUpdate() {
        if (this.state.hasError) {
            setTimeout(() => this.setState({ redirect: true }), 5000);
            //setTimeout(() => navigate('/'), 5000);
        }
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect to="/"></Redirect>;
        }
        if (this.state.hasError) {
            return (
                <h1>
                    There was en error with this listing.
                    <Link to="/">Click here</Link> to go back to the home page or wait five seconds
                </h1>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
