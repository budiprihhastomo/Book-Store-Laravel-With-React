import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

export default () => {
    return (
        <Router>
            <Switch>
                <Route path="/" render={props => <MainLayout {...props} />} />
            </Switch>
        </Router>
    );
};
