import React, { FunctionComponent } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import ProjectStatistics from './ProjectStatistics';
import Experiments, { EXPERIMENTS_LIST_FRAGMENT } from './ExperimentsList';
import Events, { EVENTS_LIST_FRAGMENT } from './EventsList';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ProjectPage as IProjectPage, ProjectPageVariables } from './__generated__/ProjectPage';
import ExperimentsList from './ExperimentsList';
import EventsList from './EventsList';
const PROJECT_PAGE = gql`
    query ProjectPage($projectId: String!) {
        me {
            project(projectId: $projectId) {
                id
                name
                ...ExperimentsList
                ...EventsList
            }
            id
        }
    }
    ${EXPERIMENTS_LIST_FRAGMENT}
    ${EVENTS_LIST_FRAGMENT}
`;

interface Props {
    projectId: string;
    selectedItem?: { type: 'experiment' | 'event' | 'form'; id: string };
}

const ProjectPage: FunctionComponent<Props> = ({ projectId, selectedItem }) => {
    const { loading, data, error } = useQuery<IProjectPage, ProjectPageVariables>(PROJECT_PAGE, {
        variables: { projectId },
    });
    if (!data) return null;
    if (!data.me || !data.me.project) return null;
    return (
        <PageContentWrapper>
            <Text fontSize={48}>{data.me.project.name}</Text>
            <CategoryBar title="statistics" />
            <Flex flexWrap="wrap" mx={-2}>
                <Card p={2} width={[1, 1, 1, 1 / 2, 1 / 2]}>
                    <ProjectStatistics />
                </Card>
                <Card p={2} width={[1, 1, 1, 1 / 2, 1 / 2]}></Card>
            </Flex>
            <CategoryBar title="experiments" onAddButtonClick={() => null} />
            <Flex flexWrap="wrap" mx={-2}>
                <ExperimentsList
                    {...data.me.project}
                    loading={loading}
                    expandedCardId={selectedItem && selectedItem.type === 'experiment' ? selectedItem.id : undefined}
                />
            </Flex>
            <CategoryBar title="events" onAddButtonClick={() => null} />
            <Flex flexWrap="wrap" mx={-2}>
                <EventsList {...data.me.project} />
            </Flex>
        </PageContentWrapper>
    );
};
export default ProjectPage;
