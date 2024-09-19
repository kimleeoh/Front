import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import TextArea from '../../components/Common/TextArea';
import useWindowSize from '../../components/Common/WindowSize';

const User = ({post_id, name, level, major, profileImg, limit}) => {
    const [isAnswered, setIsAnswered] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        level: '',
        major: '',
        profileImg: '',
        content: '',
        time: '',
    });

    const handleAnswerSubmit = () => {
        setIsAnswered(true);
    };

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const { content } = formValues;
        const isValid = content.trim() !== '';
        setIsFormValid(isValid);
    }, [formValues]);

    const handleInputChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const now = new Date().toISOString();

    // Update 'time' first then proceed with form submission
    setFormValues((prevFormValues) => {
        const updatedFormValues = { ...prevFormValues, name: name, level: level, major: major, profileImg: profileImg, time: now, post_id: post_id };
        
        if (isFormValid) {
            // Add your API call here to send updatedFormValues to the backend.
            console.log(updatedFormValues);
        }

            return updatedFormValues;
        });
    };

    const {width: windowSize} = useWindowSize();

    if (isAnswered) {
        return (
            <OutWrapper maxWidth={windowSize}>
                <Wrapper>
                    <SubWrapper>
                        <ProfileImg src={profileImg} />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | A 등급</LevelGrade>
                            <MajorName>{major} {name}</MajorName>
                        </ProfileContainer>
                        <Button 
                            fontSize={'10px'}
                            width={'80px'} 
                            height={'30px'} 
                            label={'답변등록'} 
                            style={{marginLeft: 'auto'}} 
                            onClick={handleFormSubmit}
                        />
                    </SubWrapper>
                    <TextAreaWrapper>
                        <TextArea 
                            width={'330px'} 
                            height={'100px'} 
                            fontSize={'15px'} 
                            backgroundColor={'#F0F2F4'} 
                            placeholder={"답변 시 타인에 대한 비방 및 허위 사실 유포에 대한 책임은 답변자에게 있습니다. \n\n서비스 운영 정책에 따라주세요."} 
                            onChange={(value) => handleInputChange('content', value)}
                        />
                    </TextAreaWrapper>
                    <ImageUploader onChange={(value) => handleInputChange('images', value)} />
                </Wrapper>
            </OutWrapper>
        );
    }

    if (limit === 0) {
        return (
            <OutWrapper maxWidth={windowSize}>
                <Wrapper>
                    <SubWrapper>
                        <ProfileImg src={profileImg} />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | A 등급</LevelGrade>
                            <MajorName>{major} {name}<span style={{color: '#3182F7'}}>님은 답변 등록이 가능합니다.</span></MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                    <Button 
                        fontSize={'10px'} 
                        width={'80px'} 
                        height={'30px'} 
                        label={'답변등록'} 
                        style={{marginLeft: 'auto', marginTop: '5px'}} 
                        onClick={handleAnswerSubmit} 
                    />
                </Wrapper>
            </OutWrapper>
        )
    }

    return (
        <OutWrapper maxWidth={windowSize}>
            <Wrapper>
                {limit === null ? (
                    <SubWrapper>
                        <ProfileImg src={profileImg} />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | 미정</LevelGrade>
                            <MajorName><span style={{color: '#ACB2BB'}}>성적 입력 후 답변이 가능합니다.</span></MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                ) : limit >= 2 ? (
                    <SubWrapper>
                        <ProfileImg src={profileImg} />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | A 등급</LevelGrade>
                            <MajorName>
                                {major} {name}
                                <span style={{color: '#3182F7'}}>님은 답변 등록이 가능합니다.</span>
                            </MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                ) : (
                    <SubWrapper>
                        <ProfileImg src={profileImg} />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | A 등급</LevelGrade>
                            <MajorName>{major} {name}<span style={{color: '#ACB2BB'}}>님은 답변 등록이 불가능합니다.</span></MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                )}
                {limit === null ? (
                    <Button fontSize={'10px'} width={'80px'} height={'30px'} label={'답변등록'} disabled={true} style={{marginLeft: 'auto', marginTop: '5px'}}></Button>
                ) : limit >= 2 ? (
                    <Button fontSize={'10px'} width={'80px'} height={'30px'} label={'답변등록'} style={{marginLeft: 'auto', marginTop: '5px'}} onClick={handleAnswerSubmit}></Button>
                ) : (
                    <Button fontSize={'10px'} width={'80px'} height={'30px'} label={'답변등록'} disabled={true} style={{marginLeft: 'auto', marginTop: '5px'}}></Button>
                )}
            </Wrapper>
        </OutWrapper>
    );
}

export default User;

User.propTypes = {
    post_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    major: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
};

User.defaultProps = {
    post_id: 0,
    name: '이름',
    level: 1,
    major: '전공',
    profileImg: '/Icons/profile.svg'
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px 15px;

    margin-top: 15px;

    border-radius: 10px;
    background-color: #F0F2F4;
`;

const SubWrapper = styled.div`
    display: flex;
    align-items: center;
`

const ProfileContainer = styled.div`
    margin-left: 10px;
`

const ProfileImg = styled.img`
    width: 29px;
    height: 29px;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
`

const LevelGrade = styled.div`
    display: flex;
    align-items: center;
    font-size: 8px;
`
const MajorName = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    flex-wrap: wrap;
`

const OutWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
`

const TextAreaWrapper = styled.div`
    padding: 0px 10px;
`