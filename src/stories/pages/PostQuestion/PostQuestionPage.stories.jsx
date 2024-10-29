import React from "react";
import { MemoryRouter } from "react-router-dom";
import PostQuestionPage from "./PostQuestionPage";

const meta = {
    component: PostQuestionPage,
    title: "Pages/PostQuestionPage",
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;

export const Default = {
    args: {},
};
