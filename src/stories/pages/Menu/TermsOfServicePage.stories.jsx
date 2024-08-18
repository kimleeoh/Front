import TermsOfServicePage from './TermsOfServicePage';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  component: TermsOfServicePage,
  title: 'Pages/termsOfService',
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