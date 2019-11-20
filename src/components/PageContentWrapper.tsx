import React, { FunctionComponent } from 'react';
import { Box } from 'rebass';

const PageComponentWrapper: FunctionComponent<{ thin?: boolean }> = ({ children, thin = false }) => (
    <Box py={3} mx={thin ? [80, 100, 100, 200, 300] : [80, 100, 100, 200, 200]}>
        {children}
    </Box>
);
export default PageComponentWrapper;
