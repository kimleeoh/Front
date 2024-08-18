import MyBoard from './MyBoard';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: MyBoard,
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