import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import TextInput from '../../components/Common/TextInput';
import TextArea from '../../components/Common/TextArea';
import SelectBoard from '../../components/Common/SelectBoard';
import ImageUploader from '../../components/Common/ImageUploader2';
import Button from '../../components/Button'
import ChipFilter from '../../components/Common/ChipFilter';
import useWindowSize from '../../components/Common/WindowSize';

const initialUserData = [
    {
        id: 1,
        name: '이예진',
        major: '글로벌미디어학부',
        point: 1020,
    }
];

const PostQuestionPage = () => {
    const [formValues, setFormValues] = useState({
        title: '',
        board: [],
        tags: [],
        content: '',
        images: [],
        time: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [showValidationMessages, setShowValidationMessages] = useState(false);

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const { title, board, tags, content } = formValues;
        const isValid = title.trim() !== '' && 
                        board.length > 0 && 
                        tags.length > 0 &&
                        content.trim() !== '';
        setIsFormValid(isValid);
        console.log(formValues);
    }, [formValues]);

    const handleInputChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const now = new Date().toISOString();

        const user = userData[0] || {};
        const updatedFormValues = { 
            ...formValues, 
            name: user.name, 
            major: user.major, 
            profileImg: user.profileImg, 
            time: now 
        };

        const { title, board, tags, content } = formValues;
        const isFormValid = title.trim() !== '' && board.length > 0 && tags.length > 0 && content.trim() !== '';

        if (isFormValid) {
            // Add your API call here to send updatedFormValues to the backend.
            console.log(updatedFormValues);
        } else {
            setShowValidationMessages(true);
        }
    };

    const renderValidationMessages = () => {
        const { title, board, tags, content } = formValues;

        if (title.trim() === '') {
            return <ValidationMessage> 제목을 입력해 주세요.</ValidationMessage>;
        }
        if (board.length === 0) {
            return <ValidationMessage> 게시판을 선택해 주세요.</ValidationMessage>;
        }
        if (tags.length === 0) {
            return <ValidationMessage> 카테고리를 선택해 주세요.</ValidationMessage>;
        }
        if (content.trim() === '') {
            return <ValidationMessage>내용을 입력해 주세요.</ValidationMessage>;
        }
    
        return null;
    };

    const {width: windowSize} = useWindowSize();

    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleCategorySelect = (options) => {
        setSelectedCategory(options);
        console.log("게시판 선택: ", selectedCategory);
    }

    return (
        <Wrapper>
            <Header showIcon={false} text="글 작성하기" backButton={true} searchButton={false}/>
            <TextInput 
                height={'30px'} 
                fontSize={'15px'} 
                placeholder={'제목 입력'}  
                onChange={(value) => handleInputChange('title', value)}
            />
            <SelectBoard 
                onChange={(value) => handleInputChange('board', value)}
                onCategorySelect={handleCategorySelect}
            />
            <ChipFilter onFilterChange={(value) => handleInputChange('tags', value)} />
            <TextArea 
                height={'300px'} 
                fontSize={'15px'} 
                placeholder={"답변 시 타인에 대한 비방 및 허위 사실 유포에 대한 책임은 답변자에게 있습니다. \n\n서비스 운영 정책에 따라주세요."} 
                onChange={(value) => handleInputChange('content', value)}
            />
            <ImageUploader onChange={(value) => handleInputChange('images', value)}/>
            <StyledDiv maxWidth={windowSize}>
                <span>일정 포인트를 자동으로 지급해줘요.</span>
            </StyledDiv>
            <Button 
                label={'등록하기'} 
                style={{marginTop: '15px'}} 
                onClick={handleFormSubmit}
            />
            {showValidationMessages && renderValidationMessages()}
        </Wrapper>
    )
}

export default PostQuestionPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
`;

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border: none;
    border-radius: 15px;
    color: #434B60;
    background-color: #F0F2F4;

    margin-top: 10px;

     width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
`

const ValidationMessage = styled.div`
    color: #D00303;
    font-size: 12px;
    margin-top: 5px;
`;