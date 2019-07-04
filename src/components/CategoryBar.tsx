import * as React from 'react';
import { Box, Text, Flex } from 'rebass';
import Spacer from './Spacer';
import { Button } from 'antd';
import styled from 'styled-components';

interface Props {
    title: string;
    onAddButtonClick?: () => void;
}

const CategoryNameText = styled(Text)`
    text-transform: uppercase;
`;

const PageComponentWrapper: React.SFC<Props> = ({ title, onAddButtonClick }) => (
    <Flex my={3}>
        <CategoryNameText fontSize={22} fontWeight={300}>
            {title}
        </CategoryNameText>
        <Spacer />
        {onAddButtonClick && (
            <Button size="large" type="primary" onClick={onAddButtonClick}>
                NEW
            </Button>
        )}
    </Flex>
);
export default PageComponentWrapper;
