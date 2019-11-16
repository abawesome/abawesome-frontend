import React, { FunctionComponent } from 'react';
import { Row, Col, Statistic } from 'antd';

const ProjectStatistics: FunctionComponent<{}> = () => {
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Statistic title="Active Users" value={12} />
            </Col>
            <Col span={12}>
                <Statistic title="Experiment Run" value={3223} precision={0} />
            </Col>
        </Row>
    );
};

export default ProjectStatistics;
