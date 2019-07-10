import React, { FunctionComponent } from 'react';
import { Box, Text, Flex } from 'rebass';
import Spacer from './Spacer';
import { Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
    title: string;
    addButtonLink?: string;
}

const CategoryNameText = styled(Text)`
    text-transform: uppercase;
`;

const PageComponentWrapper: FunctionComponent<Props> = ({ title, addButtonLink }) => (
    <Flex my={3}>
        <CategoryNameText fontSize={22} fontWeight={300}>
            {title}
        </CategoryNameText>
        <Spacer />
        {addButtonLink && (
            <Link to={addButtonLink}>
                <Button size="large" type="primary">
                    NEW
                </Button>
            </Link>
        )}
    </Flex>
);
export default PageComponentWrapper;
