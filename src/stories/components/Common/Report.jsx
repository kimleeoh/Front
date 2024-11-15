import React from "react";
import BaseAxios from "../../../axioses/BaseAxios";

const Report = ({ _id }) => {
    console.log(`Reported post with ID: ${_id}`);
    alert(`Post with ID: ${_id} has been reported.`);
    BaseAxios.post("/api/l/warn", {
        warnWhy: 0, // 신고 사유에 따라 달라짐
    }).then(function (response) {
        console.log(response);
    });
};

export default Report;
