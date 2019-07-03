import * as React from "react";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import PageContentWrapper from "./components/PageContentWrapper";
import { Text, Flex } from "rebass";
import CategoryBar from "./components/CategoryBar";
import Card from "./components/Card";
import { Row, Col, Statistic } from "antd";
export default () => (
  <>
    <ThemeProvider theme={theme}>
      <>
        <NavBar />
        <PageContentWrapper>
          <Text fontSize={48}>My Awesome Project</Text>
          <CategoryBar />
          <Flex>
            <Card mx={3}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Active Users" value={112893} />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Account Balance (CNY)"
                    value={112893}
                    precision={2}
                  />
                </Col>
              </Row>
            </Card>
            <Card>stuff</Card>
            <Card mx={3}>stuff</Card>
            <Card>stuff</Card>
          </Flex>
        </PageContentWrapper>
      </>
    </ThemeProvider>
  </>
);
