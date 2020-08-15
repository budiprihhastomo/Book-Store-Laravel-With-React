import React from "react";
import AsyncSelect from "react-select/async";
import Axios from "axios";
import { API_SERVER } from "../constant/values";

export default props => {
    const loadOptions = (name, cb) => {
        Axios.get(`${API_SERVER}/author/find`, { params: { name } }).then(
            ({ data }) => {
                const remap = data.data.reduce((s, v) => {
                    s = [
                        ...s,
                        {
                            value: v.id,
                            label: `${v.first_name} ${v.middle_name} ${v.last_name}`
                        }
                    ];
                    return s;
                }, []);
                cb(remap);
            }
        );
    };

    return (
        <AsyncSelect
            loadOptions={loadOptions}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={props.onChange}
            value={props.value}
        />
    );
};
