import SubjectList from './SubjectList';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: SubjectList,
  title: 'Components/SubjectList',
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
  args: {
    onDelete: () => {}
  }
};