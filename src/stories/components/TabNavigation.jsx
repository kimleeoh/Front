import React from 'react';
import styled from 'styled-components';

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <TabWrapper>
      <TabContainer>
        <Tab active={activeTab === 'QnA'} onClick={() => onTabChange('QnA')}>
          QnA
        </Tab>
        <Tab active={activeTab === 'Tips'} onClick={() => onTabChange('Tips')}>
          Tips
        </Tab>
      </TabContainer>
    </TabWrapper>
  );
};

const TabWrapper = styled.div`
  display: flex;
  width: 380px;
  border-bottom: 1px solid #e0e0e0;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#007bff' : '#000'};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #007bff;
    transform: scaleX(${props => props.active ? 1 : 0});
    transition: transform 0.3s ease;
  }
`;

export default TabNavigation;