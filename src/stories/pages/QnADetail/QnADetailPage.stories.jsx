import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import QnAdetailPage from './QnADetailPage';

const meta = {
  component: QnAdetailPage,
  title: 'Pages/QnADetail',
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