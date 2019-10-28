import React, { FunctionComponent } from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';
import useDimensions from 'react-use-dimensions';

interface Props {
    items: { item: JSX.Element }[];
}

const FlexWrap = styled(Flex)`
    flex-wrap: wrap;
`;

const defaultWidth = 300;

const ExpandableList: FunctionComponent<Props> = ({ items }) => {
    const [ref, { x, y, width }] = useDimensions();
    const gridCount = Math.max(1, Math.floor(width / defaultWidth));
    return (
        <FlexWrap ref={ref} width={1}>
            {items.map(item => (
                <Box width={1 / gridCount}>{item.item}</Box>
            ))}
        </FlexWrap>
    );
};

export default ExpandableList;
