import TipsDetailPage from "./TipsDetailPage";
import { MemoryRouter } from "react-router-dom";

const meta = {
    component: TipsDetailPage,
    title: "Pages/TipsDetailPage",
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
