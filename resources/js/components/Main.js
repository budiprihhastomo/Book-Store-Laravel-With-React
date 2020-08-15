import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import App from "./App";

const AppWrapper = () => (
    <RecoilRoot>
        <App />
    </RecoilRoot>
);

ReactDOM.render(<AppWrapper />, document.getElementById("app"));
