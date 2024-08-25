import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HomePost from './HomePost';
import PropTypes from 'prop-types';

const HomeCarousel = ({ posts }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            {posts.map((post, index) => (
                <HomePost
                    key={index}
                    title={post.title}
                    description={post.description}
                    imageUrl={post.imageUrl}
                />
            ))}
        </Slider>
    );
};

HomeCarousel.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default HomeCarousel;
