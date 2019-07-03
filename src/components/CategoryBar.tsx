import * as React from "react";
import { Box, Text, Flex } from "rebass";
import Spacer from "./Spacer";
import { Button } from "antd";

const PageComponentWrapper: React.SFC<{}> = ({ children }) => (
  <Flex my={3}>
    <Text fontSize={22} fontWeight={300}>
      STATISTICS
    </Text>
    <Spacer />
    <Button size="large" type="primary">
      NEW
    </Button>
  </Flex>
);
export default PageComponentWrapper;
