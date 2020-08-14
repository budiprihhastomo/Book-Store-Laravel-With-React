import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "../components/Header";

import Login from "../page/Login";
import Register from "../page/Register";
import Logout from "../page/Logout";
import BooksManagement from "../page/BooksManagement";
import AuthorsManagement from "../page/AuthorsManagement";

export default class MainLayout extends Component {
    render() {
        return (
            <>
                <Header {...this.props} />
                <div className="container">
                    {!(JSON.parse(localStorage.getItem("authorization")) || {})
                        .isLoggedIn ? (
                        <div className="mt-5">
                            <div className="card">
                                <div className="card-header bg-transparent">
                                    Dashboard
                                </div>
                                <div className="card-body">No Content</div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Route path="/books" component={BooksManagement} />
                            <Route
                                path="/authors"
                                component={AuthorsManagement}
                            />
                        </>
                    )}
                </div>
                <Login />
                <Register />
                <Logout />
            </>
        );
    }
}
