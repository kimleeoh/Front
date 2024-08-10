import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import QnAboard from './QnABoard';

const meta = {
  component: QnAboard,
  title: 'Pages/QnABoard',
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