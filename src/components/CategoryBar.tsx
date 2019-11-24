import React, { FunctionComponent } from 'react';
import { Box, Text, Flex } from 'rebass';
import Spacer from './Spacer';
import { Button } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
    title: string;
    addButtonLink?: string;
    addButtonHook?: any;
}

const CategoryNameText = styled(Text)`
    text-transform: uppercase;
`;

const PageComponentWrapper: FunctionComponent<Props> = ({ title, addButtonLink, addButtonHook }) => (
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
        {addButtonHook && (
            <Button onClick={() => addButtonHook()} size="large" type="primary">
                NEW
            </Button>
        )}
    </Flex>
);
export default PageComponentWrapper;
