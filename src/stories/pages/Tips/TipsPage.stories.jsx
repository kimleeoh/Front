import TipsPage from "./TipsPage";
import { MemoryRouter } from "react-router-dom";

const meta = {
    component: TipsPage,
    title: "Pages/Tips",
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
