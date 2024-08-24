import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SubjectList = ({ select, subject, eliminate, onDelete, disableLink }) => {
    const content = (
        <Wrapper>
            <SubjectTitle>
                {select && (
                    <img
                        src="/Icons/Select.svg"
                        alt="Select"
                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                    />
                )}
                <span style={{ marginLeft: '10px' }}>{subject}</span>
                {eliminate && (
                    <img
                        src="/Icons/Delete.svg"
                        alt="Delete"
                        style={{ marginLeft: 'auto', marginRight: '5px', cursor: 'pointer' }}
                        onClick={onDelete} // Call delete function on click
                    />
                )}
            </SubjectTitle>
        </Wrapper>
    );

    return disableLink ? content : <StyledLink to={`/board/${subject}`}>{content}</StyledLink>;
}

export default SubjectList;

SubjectList.propTypes = {
    select: PropTypes.bool,
    subject: PropTypes.string,
    eliminate: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    disableLink: PropTypes.bool,
};

SubjectList.defaultProps = {
    select: false,
    subject: 'Subject',
    eliminate: false,
    disableLink: false,
};

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;
  
const Wrapper = styled.div`
    width: 370px;
    height: 40px;
    display: flex;
    align-items: center;
    border: none;
    border-bottom: 1px solid #F1F2F4;
    padding: 5px;

    transition: all 0.2s ease;
    &:active {
        background-color: #F1F2F4;
        transition: all 0.2s ease;
        scale: 0.98;
        border-radius: 0px;
    }
`;

const SubjectTitle = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #434B60;
    width: 100%;
`;