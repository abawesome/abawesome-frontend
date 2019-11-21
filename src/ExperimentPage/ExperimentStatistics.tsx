import React, { FunctionComponent } from 'react';
import { Row, Col, Statistic } from 'antd';
import gql from 'graphql-tag';
export const PROJECT_STATISTICS_FRAGMENT = gql`
    fragment ProjectStatistics on ExperimentType {
        events {
            id
            name
            results {
                count
                id
                variantId
            }
        }
    }
`;

const ExperimentStatistics: FunctionComponent<{}> = () => {
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Statistic title="Experiment Run" value={'todo'} precision={0} />
            </Col>
        </Row>
    );
};

export default ExperimentStatistics;
