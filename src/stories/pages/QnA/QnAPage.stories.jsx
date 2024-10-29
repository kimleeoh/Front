import React from "react";
import { MemoryRouter } from "react-router-dom";
import QnAPage from "./QnAPage";

const meta = {
    component: QnAPage,
    title: "Pages/QnA",
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
