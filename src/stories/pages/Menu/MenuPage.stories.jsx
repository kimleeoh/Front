import MenuPage from './MenuPage';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: MenuPage,
  title: 'Pages/MenuPage',
  
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