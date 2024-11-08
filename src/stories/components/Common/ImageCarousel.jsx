import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CarouselTemp from "../../components/Common/CarouselTemp";

const ImageCarousel = ({ images, width = "380px", height = "380px", autoPlay = false, showBullets = true, showFraction = true }) => {
    const [isOverlayOpen, setOverlayOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!images || images.length === 0) return null;
    const showControls = images.length >= 2;

    const handleImageClick = (index) => {
        setSelectedIndex(index);
        setOverlayOpen(true);
    };

    const closeOverlay = () => {
        setOverlayOpen(false);
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setSelectedIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = (e) => {
        e.stopPropagation();
        setSelectedIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <>
            <CarouselWrapper>
                <CarouselTemp
                    width={width}
                    height={height}
                    autoPlay={autoPlay}
                    showBullets={showControls}
                    showFraction={showControls}
                    showArrows={showControls}
                >
                    {images.map((image, index) => (
                        <StyledImage
                            key={index}
                            src={image}
                            draggable="false"
                            width={width}
                            height={height}
                            onClick={() => handleImageClick(index)}
                        />
                    ))}
                </CarouselTemp>
            </CarouselWrapper>

            {isOverlayOpen && (
                <Overlay onClick={closeOverlay}>
                    <OverlayImageWrapper>
                        {selectedIndex > 0 && (
                            <LeftButton onClick={prevSlide}>
                                <svg
                                    width="24"
                                    height="16"
                                    viewBox="0 0 15 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ transform: "rotate(90deg)" }}
                                >
                                    <path
                                        d="M13.75 1.854L7.5 8.104L1.25 1.854"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </LeftButton>
                        )}

                        <OverlayImage src={images[selectedIndex]} alt="Expanded view" />

                        {selectedIndex < images.length - 1 && (
                            <RightButton onClick={nextSlide}>
                                <svg
                                    width="24"
                                    height="16"
                                    viewBox="0 0 15 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ transform: "rotate(270deg)" }}
                                >
                                    <path
                                        d="M13.75 1.854L7.5 8.104L1.25 1.854"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </RightButton>
                        )}
                    </OverlayImageWrapper>
                </Overlay>
            )}
        </>
    );
};

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    autoPlay: PropTypes.bool,
    showBullets: PropTypes.bool,
    showFraction: PropTypes.bool,
};

const CarouselWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
    flex-shrink: 0;
    cursor: pointer;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const OverlayImageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OverlayImage = styled.img`
    max-width: 90%;
    max-height: 90%;
    border-radius: 8px;
`;

const Button = styled.button`
    position: absolute;
    background: none;
    border: none;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    color: white;
    width: 40px;
    height: 100%;

    &:focus {
        outline: none;
    }

    svg path {
        stroke: white;
    }
`;

const LeftButton = styled(Button)`
    left: 10px;
`;

const RightButton = styled(Button)`
    right: 10px;
`;

export default ImageCarousel;
