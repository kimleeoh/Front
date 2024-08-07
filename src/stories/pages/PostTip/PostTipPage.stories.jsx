import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PostTipPage from './PostTipPage';

const meta = {
  component: PostTipPage,
  title: 'Pages/PostTipPage',
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