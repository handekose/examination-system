import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const TeacherPrivateRoute = ({ component: Component, ...rest }) => {

    const accessToken = localStorage.getItem('accessToken');
    const userType = localStorage.getItem('userType');

    return (
        <Route
            {...rest}
            render={props =>
                accessToken && userType ?
                    (

                        userType === "teacher" ? <Component {...props} /> :
                            <Redirect
                                to={{
                                    pathname: "/" + userType + "/dashboard",
                                    state: { from: props.location }
                                }}
                            />

                    ) :
                    (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}

export default TeacherPrivateRoute