import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tool from './Tool';

const TipsDetail = ({ name, major, title, subject, content, time, read, img }) => {
    const images = Array.isArray(img) ? img : img ? [img] : [];

    return (
        <OutWrapper>
            <Wrapper>
                <span style={{ marginBottom: '15px', fontSize: '15px' }}>{subject}</span>
                <Title>{title}</Title>
                <MetaContainer>
                    <span> {time}분 전 | {major} {name} | 조회수 {read} </span>
                </MetaContainer>
                <Content>{content}</Content>

                {images.length > 0 && (
                    <ImageContainer>
                        {/*여러 개 이미지 보이게 하기*/}
                        {/* {images.map((image, index) => (
                            <Image key={index} src={image} />
                        ))} */}

                        {/*이미지 하나만 보이게 하기*/}
                        <Image src={images[0]} />
                    </ImageContainer>
                )}

                {/* Download section for multiple images */}
                {images.length > 0 && (
                    <DownloadContainer>
                        {images.map((image, index) => (
                            <FileContainer key={index}>
                                <FileName>{`Image ${index + 1}`}</FileName>
                                <DownloadLink href={image} download={`image${index + 1}`}>
                                    <img src="/Icons/Download.svg" alt="Download icon"/>
                                </DownloadLink>
                            </FileContainer>
                        ))}
                    </DownloadContainer>
                )}

                <Tool like={10} report={true} />
            </Wrapper>
        </OutWrapper>
    );
}

export default TipsDetail;

TipsDetail.propTypes = {
    name: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    read: PropTypes.number.isRequired,
    img: PropTypes.arrayOf(PropTypes.string),
};

TipsDetail.defaultProps = {
    name: '이름',
    major: '전공',
    title: '제목',
    subject: '과목',
    content: '내용',
    time: 0,
    read: 0,
    img: null,
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 380px;
    padding: 20px 10px;
    border-bottom: 1px solid #F1F2F4;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;

const Content = styled.div`
    font-size: 16px;
    margin-top: 20px;
`;

const MetaContainer = styled.div`
    display: flex;
    margin-top: auto;
    font-size: 10px;
`;

const OutWrapper = styled.div`
    width: 400px;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
`;

const Image = styled.img`
    width: 100%; /* Make image take up full container width */
    height: auto; /* Adjust height automatically */
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
`;

const DownloadContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    border: 1px solid #D9D9D9;
    padding: 10px 10px;
    gap: 10px; /* Add space between each file item */
`;

const FileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FileName = styled.span`
    color: #737373;
    font-size: 14px;
`;

const DownloadLink = styled.a`
    font-size: 14px;
    color: #007BFF;
    margin-left: auto;
    display: flex;
    align-items: center;
`;
