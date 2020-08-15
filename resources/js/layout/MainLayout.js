import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

import Login from "../page/Login";
import Register from "../page/Register";
import Logout from "../page/Logout";
import BooksManagement from "../page/BooksManagement";
import AuthorsManagement from "../page/AuthorsManagement";
import ForgetPassword from "../page/ForgetPassword";
import ResetPassword from "../page/ResetPassword";

const Dashboard = () => (
    <div className="mt-5">
        <div className="card">
            <div className="card-header bg-transparent">Dashboard</div>
            <div className="card-body">No Content</div>
        </div>
    </div>
);

export default class MainLayout extends Component {
    render() {
        return (
            <>
                <Header {...this.props} />
                <div className="container">
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/reset" component={ResetPassword} />
                    {(JSON.parse(localStorage.getItem("authorization")) || {})
                        .isLoggedIn ? (
                        <>
                            <Route path="/books" component={BooksManagement} />
                            <Route
                                path="/authors"
                                component={AuthorsManagement}
                            />
                            <Redirect to="/" />
                        </>
                    ) : (
                        <Redirect to="/" />
                    )}
                </div>
                <Login />
                <Register />
                <ForgetPassword />
                <Logout />
            </>
        );
    }
}
