import React, { FunctionComponent } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { EXPERIMENT_CARD_FRAGMENT } from '../ProjectPage/ExperimentCard';
import { ExperimentPage as IExperimentPage, ExperimentPageVariables } from './__generated__/ExperimentPage';
import ProjectStatistics from '../ProjectPage/ProjectStatistics';
import EventsList from '../ProjectPage/EventsList';
const EXPERIMENT_PAGE = gql`
    query ExperimentPage($projectId: String!, $experimentId: String!) {
        me {
            project(projectId: $projectId) {
                experiment(experimentId: $experimentId) {
                    id
                    name
                }
                id
            }
            id
        }
    }
`;

const ExperimentPage: FunctionComponent<ExperimentPageVariables> = ({ projectId, experimentId }) => {
    const { loading, data, error } = useQuery<IExperimentPage, ExperimentPageVariables>(EXPERIMENT_PAGE, {
        variables: { projectId, experimentId },
    });
    if (!data) return null;
    if (!data.me || !data.me.project || !data.me.project.experiment) return null;
    const { name } = data.me.project.experiment;
    return (
        <PageContentWrapper>
            <Text fontSize={48}>{name}</Text>
            <CategoryBar title="variants" />
            <CategoryBar title="statistics" />
            <Flex flexWrap="wrap" mx={-2}>
                <Card p={2} width={[1, 1, 1, 1 / 2, 1 / 2]}>
                    <ProjectStatistics />
                </Card>
                <Card p={2} width={[1, 1, 1, 1 / 2, 1 / 2]}></Card>
            </Flex>
            <CategoryBar title="related events" onAddButtonClick={() => null} />
            <Flex flexWrap="wrap" mx={-2}></Flex>
        </PageContentWrapper>
    );
};
export default ExperimentPage;
