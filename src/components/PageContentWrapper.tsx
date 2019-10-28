import React, { FunctionComponent } from 'react';
import { Box } from 'rebass';

const PageComponentWrapper: FunctionComponent = ({ children }) => (
    <Box py={3} mx={[80, 100, 100, 200, 200]}>
        {children}
    </Box>
);
export default PageComponentWrapper;
