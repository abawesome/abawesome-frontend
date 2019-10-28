import React, { FunctionComponent } from 'react';
import { Row, Col, Statistic } from 'antd';

const ProjectStatistics: FunctionComponent<{}> = () => {
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Statistic title="Active Users" value={112893} />
            </Col>
            <Col span={12}>
                <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
            </Col>
        </Row>
    );
};

export default ProjectStatistics;
