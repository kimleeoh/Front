import React from "react";
import styled from "styled-components";

const CategoryPath = ({ categories }) => {
    return (
        <CategoryPathContainer>
            {categories.map((category, index) => (
                <React.Fragment key={index}>
                    <CategoryItem isLast={index === categories.length - 1}>
                        {category}
                    </CategoryItem>
                    {index < categories.length - 1 && (
                        <Separator>&gt;</Separator>
                    )}
                </React.Fragment>
            ))}
        </CategoryPathContainer>
    );
};

export default CategoryPath;

const CategoryPathContainer = styled.div`
    font-size: 12px;
    color: #333;
    margin-top: 10px;
    margin-bottom: 15px;
`;

const CategoryItem = styled.span`
    font-weight: ${(props) => (props.isLast ? "bold" : "normal")};
`;

const Separator = styled.span`
    margin: 0 5px;
    color: #666;
`;
