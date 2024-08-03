import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: NavBar,
  title: 'Components/NavBar',
  tags: ['autodocs'],
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