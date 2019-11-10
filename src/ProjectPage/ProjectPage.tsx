import React, { FunctionComponent } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import ProjectStatistics from './ProjectStatistics';
import Experiments, { EXPERIMENTS_LIST_FRAGMENT } from './ExperimentsList';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ProjectPage as IProjectPage, ProjectPageVariables } from './__generated__/ProjectPage';
import ExperimentsList from './ExperimentsList';
import NavBar, { NAVBAR_FRAGMENT } from '../components/NavBar';
import { projectsLink } from '../components/utils';
const PROJECT_PAGE = gql`
    query ProjectPage($projectId: GuidGraphType!) {
        me {
            project(projectId: $projectId) {
                id
                name
                ...ExperimentsList
            }
            ...NavBar
            id
        }
    }
    ${EXPERIMENTS_LIST_FRAGMENT}
    ${NAVBAR_FRAGMENT}
`;

interface Props {
    projectId: string;
}

const ProjectPage: FunctionComponent<Props> = ({ projectId }) => {
    const { loading, data, error } = useQuery<IProjectPage, ProjectPageVariables>(PROJECT_PAGE, {
        variables: { projectId },
    });
    if (!data) return null;
    if (!data.me || !data.me.project) return null;
    return (
        <>
            <NavBar
                path={[projectsLink, { label: data.me.project.name, link: `/project/${projectId}` }]}
                {...data.me}
            />
            <PageContentWrapper>
                <Text fontSize={48}>{data.me.project.name}</Text>
                <CategoryBar title="statistics" />
                <Flex flexWrap="wrap" mx={-2}>
                    <Card p={2} width={[1, 1, 1, 1 / 2, 1 / 2]}>
                        <ProjectStatistics />
                    </Card>
                    <Card p={2} width={[1, 1, 1, 1 / 2, 1 / 2]}></Card>
                </Flex>
                <CategoryBar title="experiments" addButtonLink={`/project/${projectId}/experiments/new`} />
                <Flex flexWrap="wrap" mx={-2}>
                    <ExperimentsList {...data.me.project} loading={loading} projectId={projectId} />
                </Flex>
                <CategoryBar title="events" addButtonLink={`/project/${projectId}/events/new`} />
            </PageContentWrapper>
        </>
    );
};
export default ProjectPage;
