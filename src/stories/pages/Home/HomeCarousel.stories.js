import React from 'react';
import HomeCarousel from '../components/HomeCarousel';

export default {
    title: 'Components/HomeCarousel',
    component: HomeCarousel,
};

const Template = (args) => <HomeCarousel {...args} />;

export const Default = Template.bind({});
Default.args = {
    posts: [
        {
            title: 'Post 1',
            description: 'Description for post 1',
            imageUrl: 'https://via.placeholder.com/300x200',
        },
        {
            title: 'Post 2',
            description: 'Description for post 2',
            imageUrl: 'https://via.placeholder.com/300x200',
        },
        {
            title: 'Post 3',
            description: 'Description for post 3',
            imageUrl: 'https://via.placeholder.com/300x200',
        },
    ],
};
