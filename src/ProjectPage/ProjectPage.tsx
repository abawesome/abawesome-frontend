import React, { FunctionComponent } from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Text, Flex, Box } from 'rebass';
import CategoryBar from '../components/CategoryBar';
import Card from '../components/Card';
import Experiments, { EXPERIMENTS_LIST_FRAGMENT } from './ExperimentsList';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { ProjectPage as IProjectPage } from './__generated__/ProjectPage';
import ExperimentsList from './ExperimentsList';
import NavBar, { NAVBAR_FRAGMENT } from '../components/NavBar';
import { projectsLink } from '../components/utils';
const PROJECT_PAGE = gql`
    query ProjectPage($projectId: String!) {
        me {
            project(projectId: $projectId) {
                id
                name
                description
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
    const { loading, data, error } = useQuery<IProjectPage>(PROJECT_PAGE, {
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

                {data.me.project.description && <Text fontSize={24}>{data.me.project.description}</Text>}
                <Box mt={2}>
                    <Text fontSize={10}>{data.me.project.id}</Text>
                </Box>

                <CategoryBar title="experiments" addButtonLink={`/project/${projectId}/experiments/new`} />
                <Flex flexWrap="wrap" mx={-2}>
                    <ExperimentsList {...data.me.project} loading={loading} projectId={projectId} />
                </Flex>
            </PageContentWrapper>
        </>
    );
};
export default ProjectPage;
