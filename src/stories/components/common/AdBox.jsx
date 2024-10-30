import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useWindowSize from "./WindowSize";

const OutWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    margin: 0 auto;
    border-bottom: 1px solid #acb2bb;
`;

// Google Ads 광고 코드 스타일링
const GoogleAd = styled.ins`
    display: block;
    width: 100%;
    height: auto;
`;

const StyledAnchor = styled.a`
    text-decoration: none;
    color: black;
    display: block;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;
    padding: 20px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:active {
        background-color: #f1f7fd;
        transition: all 0.2s ease;
        scale: 0.98;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
`;

const TextWrapper = styled.div`
    align-items: flex-start;
    max-width: ${(props) => (props.hasImage ? "80%" : "100%")};
    overflow: hidden;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #434b60;
    margin-bottom: 10px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const Content = styled.div`
    font-size: 16px;
    font-weight: regular;
    color: #434b60;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const MetaContainer = styled.div`
    color: #434b60;
    display: flex;
    align-items: center;
    align-content: center;
    margin-top: auto;
    font-size: 10px;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-bottom: auto;
`;

const Image = styled.img`
    width: 70px;
    height: 70px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
`;

const AdBox = ({ _id, title, content, img, link }) => {
    const { width: windowSize } = useWindowSize();

    useEffect(() => {
        // Google Ads 스크립트를 동적으로 추가
        const script = document.createElement("script");
        script.src =
            "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;
        script.setAttribute("data-ad-client", "ca-pub-8432259902229548");
        script.crossOrigin = "anonymous";
        document.body.appendChild(script);

        // 광고 초기화
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);

    return (
        <OutWrapper maxWidth={windowSize}>
            <StyledAnchor href={link} target="_blank" rel="noopener noreferrer">
                <Wrapper>
                    <ContentWrapper>
                        <TextWrapper hasImage={Boolean(img)}>
                            <Title>{title}</Title>
                            <Content>{content}</Content>
                        </TextWrapper>

                        {img && (
                            <ImageContainer>
                                <Image src={img} alt={title} />
                            </ImageContainer>
                        )}
                    </ContentWrapper>

                    <MetaContainer>광고</MetaContainer>

                    {/* Google AdSense 광고 영역 */}
                    <GoogleAd
                        className="adsbygoogle"
                        data-ad-client="ca-pub-8432259902229548"
                        data-ad-slot="XXXXXX" // 광고 슬롯 ID
                        data-ad-format="auto"
                    />
                </Wrapper>
            </StyledAnchor>
        </OutWrapper>
    );
};

export default AdBox;

AdBox.propTypes = {
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.string,
    link: PropTypes.string.isRequired,
};

AdBox.defaultProps = {
    title: "제목",
    content: "내용",
    img: null,
    link: "#",
};
