/* eslint-disable @typescript-eslint/camelcase */
import React, { FunctionComponent } from 'react';
import { Row, Col, Statistic } from 'antd';
import gql from 'graphql-tag';
import {
    ExperimentStatistics as IExperimentStatistics,
    ExperimentStatistics_events_results,
} from './__generated__/ExperimentStatistics';
export const EXPERIMENT_STATISTICS_FRAGMENT = gql`
    fragment ExperimentStatistics on ExperimentType {
        usersTested
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

const ExperimentStatistics: FunctionComponent<IExperimentStatistics> = ({ events, usersTested }) => {
    const displayedCountResults = (
        events.find(e => e.name === 'AUTO__VariantDisplayed') || {
            results: [] as ExperimentStatistics_events_results[],
        }
    ).results;
    const displayedCount = displayedCountResults.reduce((a, r) => a + r.count, 0);
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Statistic title="Experiment Run" value={`${displayedCount} times`} precision={0} />
            </Col>
            <Col span={12}>
                <Statistic title="Unique visits from" value={`${usersTested} users`} precision={0} />
            </Col>
        </Row>
    );
};

export default ExperimentStatistics;
