import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path="/"
                        render={props => <MainLayout {...props} />}
                    />
                </Switch>
            </Router>
        );
    }
}
