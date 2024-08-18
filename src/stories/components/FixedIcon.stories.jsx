import FixedIcon from './FixedIcon';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: FixedIcon,
  title: 'Components/FixedIcon',
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

export const Default = {
  args: {}
};