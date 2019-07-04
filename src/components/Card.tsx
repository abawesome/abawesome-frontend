import React from 'react';
import { Card as RebassCard, CardProps, BoxProps, Box } from 'rebass';
import styled from 'styled-components';
const MyCard = styled(RebassCard)`
    background: #ffffff;
    box-shadow: 0px 0px 70px rgba(0, 0, 0, 0.04), 0px 0px 30px rgba(0, 0, 0, 0.04);
    border-radius: 15px;
`;
const Card: React.SFC<BoxProps> = props => {
    return (
        <Box {...{ ...props, ref: undefined }}>
            <MyCard px={2} py={2}>
                {props.children}
            </MyCard>
        </Box>
    );
};

export default Card;
