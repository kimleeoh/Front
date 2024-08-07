import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CategorySelector = ({ categories, onSelect }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedSubcategory(null);
        onSelect(category, null);
    };

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
        onSelect(selectedCategory, subcategory);
    };

    return (
        <Wrapper>
            <CategoryList>
                {categories.map(category => (
                    <CategoryItem
                        key={category.name}
                        active={category === selectedCategory}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category.name}
                    </CategoryItem>
                ))}
            </CategoryList>
            {selectedCategory && (
                <SubcategoryList>
                    {selectedCategory.subcategories.map(subcategory => (
                        <SubcategoryItem
                            key={subcategory}
                            active={subcategory === selectedSubcategory}
                            onClick={() => handleSubcategoryClick(subcategory)}
                        >
                            {subcategory}
                        </SubcategoryItem>
                    ))}
                </SubcategoryList>
            )}
        </Wrapper>
    );
};

CategorySelector.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        subcategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default CategorySelector;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CategoryList = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const CategoryItem = styled.div`
    margin: 5px;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid #ACB2BB;
    background-color: ${props => (props.active ? '#ACB2BB' : 'transparent')};
    color: ${props => (props.active ? 'white' : '#ACB2BB')};
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #ACB2BB;
        color: white;
    }
`;

const SubcategoryList = styled.div`
    display: flex;
`;

const SubcategoryItem = styled.div`
    margin: 5px;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid #ACB2BB;
    background-color: ${props => (props.active ? '#ACB2BB' : 'transparent')};
    color: ${props => (props.active ? 'white' : '#ACB2BB')};
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #ACB2BB;
        color: white;
    }
`;
