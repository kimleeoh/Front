import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

const meta = {
    component: Header,
    title: "Components/Header",
    tags: ["autodocs"],
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
