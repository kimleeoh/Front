import React from "react";
import { MemoryRouter } from "react-router-dom";
import BoardHome from "./BoardHome";

const meta = {
    component: BoardHome,
    title: "Pages/Board",
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;

export const Default = {};
