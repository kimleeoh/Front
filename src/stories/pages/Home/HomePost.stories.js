import React from 'react';
import HomePost from '../components/HomePost';

export default {
    title: 'Components/HomePost',
    component: HomePost,
};

const Template = (args) => <HomePost {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Sample Post',
    description: 'This is a description for the sample post.',
    imageUrl: 'https://via.placeholder.com/300x200',
};
