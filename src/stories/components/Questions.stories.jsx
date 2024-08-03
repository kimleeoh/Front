import Questions from './Questions';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: Questions,
  title: 'Components/Questions',
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