import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HomePost = ({ title, description, imageUrl }) => {
    return (
        <PostContainer>
            <Image src={imageUrl} alt={title} />
            <Title>{title}</Title>
            <Description>{description}</Description>
        </PostContainer>
    );
};

HomePost.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export default HomePost;

const PostContainer = styled.div`
    width: 300px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: white;
    text-align: center;
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
`;

const Title = styled.h2`
    font-size: 20px;
    margin: 10px 0;
    color: #333;
`;

const Description = styled.p`
    font-size: 16px;
    color: #666;
`;
