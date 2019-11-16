import React from 'react';
import { Card as RebassCard, CardProps, BoxProps, Box } from 'rebass';
import styled from 'styled-components';
const MyCard = styled(RebassCard)`
    background: #ffffff;
    box-shadow: 0px 0px 70px rgba(0, 0, 0, 0.04), 0px 0px 30px rgba(0, 0, 0, 0.04);
    border-radius: 15px;
`;
const Card: React.SFC<BoxProps & { cardProps?: CardProps }> = props => {
    return (
        <Box {...{ ...props, ref: undefined }}>
            <MyCard p={2} {...props.cardProps} ref={undefined}>
                {props.children}
            </MyCard>
        </Box>
    );
};

export default Card;
