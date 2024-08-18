import Mypage from './Mypage';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: Mypage,
  title: 'Pages/Mypage',
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
  args: {}
};