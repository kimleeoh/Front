import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  const [tabWidths, setTabWidths] = useState([]);
  const tabRefs = useRef([]);

  useEffect(() => {
    // Calculate tab widths when tabs change
    const widths = tabRefs.current.map(tab => tab.offsetWidth);
    setTabWidths(widths);
  }, [tabs]);

  const handleTabClick = (tab, index) => {
    onTabChange(tab);
  };

  return (
    <TabWrapper>
      <TabContainer>
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            ref={el => tabRefs.current[index] = el}
            active={activeTab === tab}
            onClick={() => handleTabClick(tab, index)}
          >
            {tab}
          </Tab>
        ))}
      </TabContainer>
      <Indicator
        activeTab={activeTab}
        tabs={tabs}
        tabWidths={tabWidths}
      />
    </TabWrapper>
  );
};

const TabWrapper = styled.div`
  display: flex;
  width: 380px;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
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
  color: ${props => props.active ? '#434B60' : '#ACB2BB'};
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
`;

const Indicator = ({ activeTab, tabs, tabWidths }) => {
  const index = tabs.indexOf(activeTab);
  const totalWidth = tabWidths.slice(0, index).reduce((sum, width) => sum + width, 0);
  const currentTabWidth = tabWidths[index];
  
  return (
    <IndicatorWrapper
      style={{
        transform: `translateX(${totalWidth}px)`,
        width: currentTabWidth
      }}
    />
  );
};

const IndicatorWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: #434B60;
  transition: transform 0.3s ease, width 0.3s ease;
`;

export default TabNavigation;
