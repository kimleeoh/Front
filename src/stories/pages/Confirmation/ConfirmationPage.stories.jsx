import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ConfirmationPage from './ConfirmationPage';

const meta = {
  component: ConfirmationPage,
  title: 'Pages/ConfirmationPage',
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